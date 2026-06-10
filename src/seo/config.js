export const SITE_URL = 'https://derpfest.org'
export const SITE_NAME = 'DerpFest'

export const DEFAULT_SEO = {
  title: 'DerpFest | Feature Rich Android Custom ROM',
  description:
    'Combining newest security patches, original features and wide device support, DerpFest is a product created to make your life easier and breathe some fresh air into the Android Custom ROM scene.',
  image: `${SITE_URL}/img/og-image.png`,
}

export const ROUTE_SEO = {
  '/': {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
  },
  '/build': {
    title: 'Build DerpFest | Compile from Source',
    description:
      'Learn how to build DerpFest from source for your Android device. Prerequisites, repo sync, and build instructions for maintainers and contributors.',
  },
  '/credit': {
    title: 'Credits | DerpFest',
    description:
      'Meet the contributors and projects that help make DerpFest possible. Credits for developers, designers, and the wider Android community.',
  },
  '/devices': {
    title: 'Download DerpFest | Supported Devices',
    description:
      'Download official DerpFest builds for your Android device. Browse supported phones and tablets, search by codename, and get the latest ROM releases.',
  },
  '/faq': {
    title: 'FAQ | DerpFest',
    description:
      'Frequently asked questions about DerpFest custom ROM: GApps, maintainership, unofficial builds, and community support.',
  },
  '/screenshots': {
    title: 'Screenshots | DerpFest',
    description:
      'Preview DerpFest UI and features with official screenshots. See Game Space, QS customizations, Material You theming, and more.',
  },
  '/team': {
    title: 'Team | DerpFest',
    description:
      'Meet the DerpFest team — founders, developers, and device maintainers behind the project.',
  },
  '/tou': {
    title: 'Terms of Use | DerpFest',
    description: 'DerpFest website terms of use and policies.',
  },
}

export const FAQ_SCHEMA = [
  {
    question: 'Why DerpFest includes GApps by default?',
    answer:
      'Built-in GApps is the cleanest way to install them. You can check for missing privapp permissions, avoid installer mistakes, and skip a step during installation.',
  },
  {
    question: 'Will there be a Non-GApps version?',
    answer: 'No.',
  },
  {
    question: 'How can I apply for official maintainership for my device?',
    answer:
      'Contact us on our Telegram group. Our team will verify your device tree and other requirements and then, if they decide to, they will add you.',
  },
  {
    question: 'Where can I find XDA Template for the DerpFest ROM I made?',
    answer:
      'Get the XDA thread template from the DerpFest GitHub manifest repository.',
  },
]

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  sameAs: [
    'https://github.com/DerpFest-AOSP',
    'https://t.me/DerpFestAOSP',
  ],
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: DEFAULT_SEO.description,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/devices?s={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}
