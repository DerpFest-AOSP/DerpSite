const ALEXANDER = {
  name: 'Alexander Brunswig',
  avatar: 'https://github.com/NurKeinNeid.png?size=128',
  href: '/team#alexanderbrunswig',
  github: 'https://github.com/NurKeinNeid',
}

export const blogPosts = [
  {
    slug: '2026-09-19-mid-september',
    title: 'Mid-September source update',
    excerpt:
      'September 2026 security patches, scene-container follow-through, more blur, rewritten color pickers, a gradient dual-shade QS status chip, HD and Wi-Fi standard icons, Pixel exclusives from Fundamental OS, a redesigned recovery, and a lockscreen clock that writes the time in words.',
    date: '2026-09-19',
    readMinutes: 10,
    cover: '/img/5267227113499075516.jpg',
    coverAlt: 'DerpFest lock screen with a text clock reading It’s Two Fifty Three',
    coverPair: [
      {
        src: '/img/5260283710454572854.jpg',
        alt: 'AOSP theme picker Clock sheet with the text clock selected, previewing It’s Seventeen Nineteen',
      },
      {
        src: '/img/5267227113499075516.jpg',
        alt: 'DerpFest lock screen with a text clock reading It’s Two Fifty Three',
      },
    ],
    tags: ['Android 17', 'Security', 'Source'],
    author: ALEXANDER,
  },
  {
    slug: '2026-09-07-android-17',
    title: 'DerpFest Android 17 source is here',
    excerpt:
      'The Android 17 tree is public. QPR2 color options on QPR0, native theming and wallpaper work, a finished QS layout editor, rebuilt style pickers, Qualcomm BoostFramework, and Smartspacer in DerpFest Launcher — ported from uwuAOSP’s Launcher3 integration.',
    date: '2026-09-07',
    readMinutes: 10,
    cover: '/img/5257988497111458123.jpg',
    coverAlt: 'DerpFest Android 17 color styles Neutral, Soft, Bright, and Bold',
    coverPair: [
      {
        src: '/img/5257988497111458122.jpg',
        alt: 'DerpFest Android 17 hue slider with a live lock screen and Quick Settings preview',
      },
      {
        src: '/img/5257988497111458123.jpg',
        alt: 'DerpFest Android 17 color styles Neutral, Soft, Bright, and Bold',
      },
    ],
    tags: ['Android 17', 'Theming', 'Source'],
    author: ALEXANDER,
  },
]

export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getSortedPosts() {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function formatPostDate(iso, style = 'short') {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
