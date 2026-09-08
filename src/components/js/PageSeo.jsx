import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPostBySlug, getSortedPosts } from '../../data/blog'
import {
  DEFAULT_SEO,
  FAQ_SCHEMA,
  ORGANIZATION_SCHEMA,
  ROUTE_SEO,
  SITE_NAME,
  SITE_URL,
  WEBSITE_SCHEMA,
} from '../../seo/config'

function upsertMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function removeJsonLd(id) {
  document.getElementById(id)?.remove()
}

function getBlogPostFromPath(pathname) {
  const match = pathname.match(/^\/blog\/([^/]+)$/)
  if (!match) return null
  return getPostBySlug(match[1]) || null
}

function getRouteSeo(pathname) {
  if (ROUTE_SEO[pathname]) return ROUTE_SEO[pathname]

  const post = getBlogPostFromPath(pathname)
  if (post) {
    return {
      title: `${post.title} | DerpFest Blog`,
      description: post.excerpt,
      image: `${SITE_URL}${post.cover}`,
      type: 'article',
      publishedTime: post.date,
    }
  }

  return {
    title: 'Page Not Found | DerpFest',
    description: DEFAULT_SEO.description,
    noindex: true,
  }
}

export default function PageSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getRouteSeo(pathname)
    const canonicalPath = pathname === '/' ? '/' : pathname
    const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`
    const image = seo.image || DEFAULT_SEO.image

    document.title = seo.title

    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'robots', seo.noindex ? 'noindex, nofollow' : 'index, follow')

    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:type', seo.type || 'website')
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', 'DerpFest')
    if (seo.publishedTime) {
      upsertMeta('property', 'article:published_time', seo.publishedTime)
    } else {
      document.querySelector('meta[property="article:published_time"]')?.remove()
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)
    upsertMeta('name', 'twitter:image', image)

    upsertLink('canonical', canonicalUrl)

    if (pathname === '/') {
      upsertJsonLd('seo-organization', ORGANIZATION_SCHEMA)
      upsertJsonLd('seo-website', WEBSITE_SCHEMA)
    } else {
      removeJsonLd('seo-organization')
      removeJsonLd('seo-website')
    }

    if (pathname === '/faq') {
      upsertJsonLd('seo-faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_SCHEMA.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      })
    } else {
      removeJsonLd('seo-faq')
    }

    if (pathname === '/blog') {
      upsertJsonLd('seo-blog', {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: `${SITE_NAME} Blog`,
        url: `${SITE_URL}/blog`,
        description: ROUTE_SEO['/blog'].description,
        publisher: ORGANIZATION_SCHEMA,
        blogPost: getSortedPosts().map((post) => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          url: `${SITE_URL}/blog/${post.slug}`,
          image: `${SITE_URL}${post.cover}`,
        })),
      })
    } else {
      removeJsonLd('seo-blog')
    }

    const post = getBlogPostFromPath(pathname)
    if (post) {
      upsertJsonLd('seo-article', {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        image: `${SITE_URL}${post.cover}`,
        url: canonicalUrl,
        author: post.author
          ? {
              '@type': 'Person',
              name: post.author.name,
              url: post.author.github || post.author.href,
              image: post.author.avatar,
            }
          : {
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
            },
        publisher: ORGANIZATION_SCHEMA,
        mainEntityOfPage: canonicalUrl,
      })
    } else {
      removeJsonLd('seo-article')
    }
  }, [pathname])

  return null
}
