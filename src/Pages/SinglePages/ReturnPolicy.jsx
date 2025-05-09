// src/Pages/SinglePages/ReturnPolicy.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

function ReturnPolicy() {
  const siteName = "Innovation Remedies";
  const canonicalUrl = "https://www.innovationremedies.com/return-policy";

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Return Policy | ${siteName}`}</title>
        <meta name="description" content={`Understand the return and exchange policy for products purchased from ${siteName}.`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`Return Policy | ${siteName}`} />
        <meta property="og:description" content={`Understand the return and exchange policy for products purchased from ${siteName}.`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-lg max-w-3xl mx-auto">
          <h1>Return & Exchange Policy</h1>
          <p>Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>At Innovation Remedies, we strive to ensure your satisfaction with our products. If you are not entirely satisfied with your purchase, we're here to help.</p>

          <h2>Returns</h2>
          <p>
            You have <strong>30 calendar days</strong> to return an item from the date you received it.
          </p>
          <p>To be eligible for a return, your item must be:</p>
          <ul>
            <li>Unused and in the same condition that you received it.</li>
            <li>In its original packaging.</li>
            <li>Accompanied by a receipt or proof of purchase.</li>
          </ul>
          <p>Certain types of items are exempt from being returned, such as perishable goods, custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.</p>

          <h2>Refunds</h2>
          <p>Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.</p>
          <p>If your return is approved, we will initiate a refund to your original method of payment. You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>
          <p>Shipping costs are non-refundable. If you receive a refund, the cost of return shipping (if applicable and paid by us initially) may be deducted from your refund.</p>

          <h2>Exchanges</h2>
          <p>We only replace items if they are defective or damaged upon arrival. If you need to exchange it for the same item, send us an email at <a href="mailto:info@innovationremedies.com">info@innovationremedies.com</a> and send your item to our business address (provided upon request for return).</p>

          <h2>Shipping Returns</h2>
          <p>You will be responsible for paying for your own shipping costs for returning your item unless the return is due to our error (e.g., you received a defective or incorrect item). Shipping costs are non-refundable.</p>
          <p>If you are shipping an item over ₹5000, you should consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.</p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions on how to return your item to us, contact us:
          </p>
          <ul>
            <li>By email: <a href="mailto:info@innovationremedies.com">info@innovationremedies.com</a></li>
            <li>By phone number: +91-9057246900 (Replace with your actual number)</li>
            {/* Add your physical address or link to contact page */}
          </ul>
          <p><em>Please Note: This policy is subject to change without prior notice. Please review it periodically.</em></p>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default ReturnPolicy;