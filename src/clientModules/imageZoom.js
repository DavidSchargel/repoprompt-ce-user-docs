// Native modal dialogs supply focus containment, Escape, and background inertness.
// The image itself is the trigger: no visible button or label is added to articles.
let observer;
let dialog;

function openImage(image) {
  if (dialog?.open) return;
  const description = image.alt.trim();
  const modal = document.createElement('dialog');
  dialog = modal;
  modal.className = 'image-zoom-dialog';
  modal.setAttribute('aria-label', 'Enlarged image');

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'image-zoom-close';
  close.setAttribute('aria-label', 'Close enlarged image');
  close.textContent = '×';
  close.addEventListener('click', () => modal.close());

  const enlarged = document.createElement('img');
  enlarged.alt = description;
  enlarged.src = image.getAttribute('data-zoom-src') || image.currentSrc || image.src;
  if (!image.hasAttribute('data-zoom-src') && image.srcset) {
    enlarged.srcset = image.srcset;
    enlarged.sizes = '90vw';
  }
  modal.append(close, enlarged);
  modal.addEventListener('click', (event) => {
    const bounds = modal.getBoundingClientRect();
    if (event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)) modal.close();
  });
  modal.addEventListener('close', () => {
    modal.remove();
    if (dialog === modal) {
      dialog = undefined;
      if (image.isConnected) image.focus({preventScroll: true});
    }
  }, {once: true});
  document.body.append(modal);
  modal.showModal();
  close.focus({preventScroll: true});
}

function enhanceImages() {
  for (const image of document.querySelectorAll('.markdown img')) {
    // Preserve linked images, decoration, and explicitly authored controls.
    if (!image.alt?.trim() || image.closest('a, button, [aria-hidden="true"]') || image.hasAttribute('role') ||
      image.hasAttribute('data-accessible-zoom') || image.hasAttribute('tabindex')) continue;
    image.setAttribute('data-accessible-zoom', '');
    image.setAttribute('role', 'button');
    image.setAttribute('tabindex', '0');
    image.setAttribute('aria-haspopup', 'dialog');
    image.setAttribute('aria-label', `Enlarge image: ${image.alt.trim()}`);
    image.addEventListener('click', () => openImage(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!event.repeat) openImage(image);
      }
    });
  }
}

export function onRouteDidUpdate() {
  if (typeof document === 'undefined') return;
  if (dialog?.open) dialog.close();
  enhanceImages();
  if (!observer) {
    observer = new MutationObserver(enhanceImages);
    observer.observe(document.body, {subtree: true, childList: true});
  }
}
