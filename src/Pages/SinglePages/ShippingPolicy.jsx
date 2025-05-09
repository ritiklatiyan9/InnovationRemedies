// src/Pages/SinglePages/ShippingPolicy.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

function ShippingPolicy() {
  const siteName = "Innovation Remedies";
  const canonicalUrl = "https://www.innovationremedies.com/shipping-policy";

  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Shipping Policy | ${siteName}`}</title>
        <meta name="description" content={`Details about shipping, delivery times, and costs for orders from ${siteName}.`} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`Shipping Policy | ${siteName}`} />
        <meta property="og:description" content={`Details about shipping, delivery times, and costs for orders from ${siteName}.`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-lg max-w-3xl mx-auto">
          <h1>Shipping Policy</h1>
          <p>Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <p>Thank you for visiting and shopping at Innovation Remedies. The following are the terms and conditions that constitute our Shipping Policy.</p>

          <h2>Domestic Shipping Policy (India)</h2>

          <h3>Shipment Processing Time</h3>
          <p>All orders are processed within <strong>0-1 business days</strong>. Orders are not shipped or delivered on weekends or holidays.</p>
          <p>If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in the shipment of your order, we will contact you via email or telephone.</p>

          <h3>Shipping Rates & Delivery Estimates</h3>
          <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
          <ul>
            <li>
              <strong>Standard Shipping:</strong>
              <ul>
                <li>Estimated delivery time: <strong>3-7 business days</strong></li>
                <li>Shipping cost: ₹50.00 (This is an example. State your actual or typical cost, or mention if it varies and is calculated at checkout. If free over a certain amount, mention that too.)</li>
              </ul>
            </li>
            {/* You can add more shipping options like Express Shipping if you offer them */}
            {/*
            <li>
              <strong>Express Shipping:</strong>
              <ul>
                <li>Estimated delivery time: 1-3 business days</li>
                <li>Shipping cost: ₹150.00 (Example)</li>
              </ul>
            </li>
            */}
          </ul>
          <p>Delivery delays can occasionally occur, especially to remote locations or due to unforeseen circumstances.</p>

          <h3>Shipment to P.O. Boxes or APO/FPO Addresses</h3>
          <p>Innovation Remedies ships to addresses within India. We currently do not ship to P.O. boxes or APO/FPO addresses without prior confirmation. Please contact us if this is your requirement.</p>

          <h3>Shipment Confirmation & Order Tracking</h3>
          <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>

          <h3>Customs, Duties, and Taxes</h3>
          <p>Innovation Remedies is not responsible for any customs and taxes applied to your order if shipping internationally (currently we primarily ship within India). All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.) for international shipments.</p>
          <p>For domestic orders within India, prices are inclusive of applicable GST unless stated otherwise.</p>

          <h3>Damages</h3>
          <p>Innovation Remedies is not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim.</p>
          <p>Please save all packaging materials and damaged goods before filing a claim. It is also advisable to take photos of the damaged packaging and product.</p>

          <h2>International Shipping Policy</h2>
          <p>We currently primarily focus on shipping within India. For international shipping inquiries, please contact us directly at <a href="mailto:info@innovationremedies.com">info@innovationremedies.com</a> before placing an order.</p>

          <h2>Contact Us</h2>
          <p>If you have any questions about this Shipping Policy, please contact us:</p>
          <ul>
            <li>By email: <a href="mailto:info@innovationremedies.com">info@innovationremedies.com</a></li>
            <li>By phone number: +91-9057246900 (Replace with your actual number)</li>
          </ul>
           <p><em>Please Note: This policy is subject to change without prior notice. Please review it periodically.</em></p>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default ShippingPolicy;