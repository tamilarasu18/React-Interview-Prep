/**
 * Application version information — single source of truth for the app.
 *
 * When releasing:
 * 1. Update CHANGELOG.md
 * 2. Update package.json
 * 3. Update data/meta.json
 * 4. Update these constants
 */

export const APP_VERSION = '1.0.0';
export const APP_VERSION_DATE = '2026-08-06';
export const APP_VERSION_NAME = 'Initial release';

export const getVersionString = () => `Version ${APP_VERSION}`;

export const getVersionDate = () =>
  new Date(APP_VERSION_DATE).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
