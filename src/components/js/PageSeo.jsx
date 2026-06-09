import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DEFAULT_SEO,
  FAQ_SCHEMA,
  ORGANIZATION_SCHEMA,
  ROUTE_SEO,
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

function getRouteSeo(pathname) {
  if (ROUTE_SEO[pathname]) return ROUTE_SEO[pathname]

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
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:site_name', 'DerpFest')

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
  }, [pathname])

  return null
}
