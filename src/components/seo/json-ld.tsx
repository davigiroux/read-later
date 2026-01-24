// JSON-LD structured data components for SEO
// Note: Using dangerouslySetInnerHTML is safe here because all data is hardcoded
// and not derived from user input

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LaterStack',
    url: 'https://laterstack.io',
    logo: 'https://laterstack.io/logo-icon.png',
    sameAs: ['https://twitter.com/devgiroux'],
    founder: {
      '@type': 'Person',
      name: 'Davi Giroux',
      url: 'https://devgiroux.com',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function WebApplicationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'LaterStack',
    url: 'https://laterstack.io',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'AI-powered reading queue that scores articles based on your goals and tells you exactly what to read next.',
    featureList: [
      'AI-powered article ranking',
      'Reading time estimates',
      'Personal goal alignment',
      'Smart relevance scoring',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
