'use client';

import { useEffect } from 'react';

/**
 * NavigationHandler
 * 1. Resets scroll to top and clears any section hash on page reload/refresh,
 *    redirecting the user directly to the landing page (Hero).
 * 2. Sets history.scrollRestoration = 'manual' so browsers don't restore past scroll.
 * 3. Intercepts hash navigation (About, Services, Products, Care Packages, FAQ, Contact)
 *    to scroll smoothly while keeping the URL clean at the landing page ('/').
 */
export function NavigationHandler() {
  useEffect(() => {
    // 1. Prevent browser from restoring previous scroll position on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 2. Clear any section hash (#about, #services, #products, #packages, #faq, #contact)
    // and reset scroll to the landing page top immediately
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

    // 3. On page refresh / before unload, ensure URL hash is wiped and scroll is reset
    const handleBeforeUnload = () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 4. Intercept clicks on in-page hash links (#about, #services, #products, #packages, #faq, #contact, #hero)
    const handleHashLinkClick = (e: MouseEvent) => {
      const targetAnchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!targetAnchor) return;

      const href = targetAnchor.getAttribute('href');
      if (!href || href === '#') return;

      e.preventDefault();

      if (href === '#hero' || href === '#top') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        return;
      }

      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Keep the address bar clean at '/' so refreshing will always open the landing page
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    document.addEventListener('click', handleHashLinkClick);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, []);

  return null;
}

