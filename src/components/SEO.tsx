import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  type?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://appcatalyst.org';

export default function SEO({ title, description, keywords, path, type = 'website', noindex }: SEOProps) {
  const url = `${BASE_URL}${path}`;
  const fullTitle = path === '/'
    ? 'AppCatalyst - Affordable App Development for Startups | Chase Kellis'
    : `${title} | AppCatalyst - Chase Kellis`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${BASE_URL}/profile.png`} />
      <meta property="og:site_name" content="AppCatalyst" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}/profile.png`} />
    </Helmet>
  );
}
