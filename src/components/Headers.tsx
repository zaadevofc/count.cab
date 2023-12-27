import Head from 'next/head';
import { SITE_DESCRIPTION, SITE_DOMAIN, SITE_IMAGE, SITE_TITLE, SITE_URL } from '~/consts';

const Headers = () => {
  console.log();

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="generator" content={'zaadevofc'} />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff" />

      <link rel="canonical" href={SITE_URL} />

      <title>{SITE_TITLE}</title>
      <meta name="title" content={SITE_TITLE} />
      <meta name="description" content={SITE_DESCRIPTION} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:title" content={SITE_TITLE} />
      <meta property="og:description" content={SITE_DESCRIPTION} />
      <meta property="og:image" content={SITE_IMAGE} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={SITE_DOMAIN} />
      <meta property="twitter:url" content={SITE_URL} />
      <meta property="twitter:title" content={SITE_TITLE} />
      <meta property="twitter:description" content={SITE_DESCRIPTION} />
      <meta property="twitter:image" content={SITE_IMAGE} />
    </Head>
  )
}

export default Headers