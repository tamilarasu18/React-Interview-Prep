'use client';

import { useCallback, useEffect, useState } from 'react';

/*
 * Chrome and Edge fire `beforeinstallprompt` when the PWA criteria are met and
 * the app is not already installed. It is not in lib.dom yet.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'riq-install-dismissed';

/*
 * Safari and Firefox never fire the event, so nothing renders there rather
 * than showing install instructions the browser cannot act on.
 */
export default function InstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (localStorage.getItem(DISMISSED_KEY)) return;

    // Already installed and launched from the home screen.
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const onBeforeInstallPrompt = (event: Event) => {
      // Suppress the browser's own mini-infobar so this banner is the only ask.
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => setInstallEvent(null);

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!installEvent) return;

    await installEvent.prompt();
    await installEvent.userChoice;

    // The event can only be prompted once, whatever the user chose.
    setInstallEvent(null);
  }, [installEvent]);

  const dismiss = useCallback(() => {
    localStorage.setItem(DISMISSED_KEY, '1');
    setInstallEvent(null);
  }, []);

  if (!installEvent) return null;

  return (
    <div className="no-print fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-50">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-start gap-3">
        <svg className="h-8 w-8 shrink-0 text-primary-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="2.1" />
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <ellipse cx="12" cy="12" rx="10" ry="4.2" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
          </g>
        </svg>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900">Install the app</p>
          <p className="text-sm text-gray-600 mt-0.5">
            Revise offline, straight from your home screen.
          </p>

          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={install}
              className="px-3 py-1.5 bg-primary-600 text-white rounded-md text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              Install
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="px-3 py-1.5 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss install prompt"
          className="shrink-0 text-gray-400 hover:text-gray-600 p-1 -m-1"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
