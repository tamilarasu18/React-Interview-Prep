'use client';

import { useEffect } from 'react';

/*
 * Registers /sw.js after load, so fetching the worker never competes with the
 * page's own resources.
 *
 * Production only: in `next dev` the worker would cache modules that the dev
 * server is still rebuilding, which shows up as changes that refuse to appear.
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Offline support is a bonus; a failed registration must never
        // take the page down with it.
      });
    };

    if (document.readyState === 'complete') {
      register();
      return;
    }

    window.addEventListener('load', register);
    return () => window.removeEventListener('load', register);
  }, []);

  return null;
}
