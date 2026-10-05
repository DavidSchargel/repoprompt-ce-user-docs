import React, {useEffect, useRef} from 'react';
import OriginalNavbarMobileSidebar from '@theme-original/Navbar/MobileSidebar';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NavbarMobileSidebar(props) {
  const {shown, toggle} = useNavbarMobileSidebar();
  const {pathname} = useLocation();
  const homeUrl = useBaseUrl('/');
  const shownRef = useRef(shown);
  const pathnameRef = useRef(pathname);
  shownRef.current = shown;
  pathnameRef.current = pathname;

  useEffect(() => {
    if (!shown || (pathname !== homeUrl && pathname !== homeUrl.replace(/\/$/, ''))) return undefined;
    const sidebar = document.querySelector('.navbar-sidebar');
    const trigger = document.querySelector('.navbar__toggle');
    if (!sidebar) return undefined;

    const previousAttributes = ['role', 'aria-modal', 'aria-label', 'tabindex'].map((name) => [name, sidebar.getAttribute(name)]);
    sidebar.setAttribute('role', 'dialog');
    sidebar.setAttribute('aria-modal', 'true');
    sidebar.setAttribute('aria-label', 'Main navigation');
    sidebar.setAttribute('tabindex', '-1');

    const background = [...document.querySelectorAll('.navbar__inner, .main-wrapper, footer')]
      .filter((element) => !sidebar.contains(element) && !element.contains(sidebar));
    const previousInert = background.map((element) => [element, element.inert]);
    background.forEach((element) => { element.inert = true; });

    const focusFirst = () => {
      if (!sidebar.contains(document.activeElement)) {
        (sidebar.querySelector('.navbar-sidebar__close') || sidebar).focus({preventScroll: true});
      }
    };
    const frame = requestAnimationFrame(focusFirst);
    sidebar.addEventListener('transitionend', focusFirst);

    let followingLink = false;
    const onSidebarClick = (event) => {
      const link = event.target?.closest?.('a[href]');
      if (link && link.href !== document.location.href && (!link.target || link.target === '_self') &&
        !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        followingLink = true;
      }
    };
    sidebar.addEventListener('click', onSidebarClick);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        toggle();
      } else if (event.key === 'Tab') {
        const controls = [...sidebar.querySelectorAll('a[href], button, input, select, textarea, [tabindex]')]
          .filter((element) => element.tabIndex >= 0 && !element.disabled && !element.closest('[inert]') &&
            element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden');
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first) {
          event.preventDefault();
          sidebar.focus();
        } else if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      sidebar.removeEventListener('transitionend', focusFirst);
      sidebar.removeEventListener('click', onSidebarClick);
      document.removeEventListener('keydown', onKeyDown);
      previousInert.forEach(([element, inert]) => { element.inert = inert; });
      previousAttributes.forEach(([name, value]) => {
        if (value === null) sidebar.removeAttribute(name);
        else sidebar.setAttribute(name, value);
      });
      if (!shownRef.current && pathnameRef.current === pathname && !followingLink &&
        trigger?.isConnected && getComputedStyle(trigger).display !== 'none') {
        trigger.focus({preventScroll: true});
      }
    };
  }, [shown, toggle, pathname, homeUrl]);

  return <OriginalNavbarMobileSidebar {...props} />;
}
