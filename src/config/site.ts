export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'React Interview Questions',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  tagline: 'Built to be memorized, not just read.',
  description:
    'React interview questions with a one-line answer, a memory hook and a full explanation for every question. Covers hooks, rendering, performance, state management, Server Components and more.',
  author: {
    name: process.env.NEXT_PUBLIC_AUTHOR_NAME ?? 'React Interview Questions',
    linkedin: process.env.NEXT_PUBLIC_AUTHOR_LINKEDIN ?? '',
    github: process.env.NEXT_PUBLIC_AUTHOR_GITHUB ?? '',
    bmcUsername: process.env.NEXT_PUBLIC_BMC_USERNAME ?? '',
  },
  repoUrl: process.env.NEXT_PUBLIC_REPO_URL ?? '',
  analytics: {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '',
  },
  verification: {
    googleSiteVerification:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
  },
};
