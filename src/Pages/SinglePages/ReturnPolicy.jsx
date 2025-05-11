import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

function ReturnPolicy() {
  const siteName = "Innovation Remedies";
  const canonicalUrl = "https://www.innovationremedies.com/return-policy";

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Return Policy | ${siteName}`}</title>
        <meta
          name="description"
          content={`Understand the return and exchange policy for products purchased from ${siteName}.`}
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`Return Policy | ${siteName}`} />
        <meta
          property="og:description"
          content={`Understand the return and exchange policy for products purchased from ${siteName}.`}
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-lg max-w-3xl mx-auto">
          <h1>Return & Exchange Policy</h1>
          <p>
            Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p>
            At Innovation Remedies, we strive to ensure your satisfaction with our products. If you are not entirely satisfied with your purchase, we’re here to help.
          </p>
          {/* Additional content can be added here */}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default ReturnPolicy;