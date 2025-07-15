import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Chandana Rice Stores</h1>
      <p className="tagline">QUALITY RICE FOR QUALITY LIFE</p>

      <section className="company-overview">
        <h2>Our Story</h2>
        <p>
            Discover the secret to delicious, wholesome meals with our premium rice selection!🍚
            Experience the Difference:Taste the superior quality of our handpicked rice varieties.
            Elevate your cooking with grains that cook to perfection every time. 🌿 Natural Goodness : Non-GMO, 
            pesticide-free rice for your family's health and well-being. Sustainably sourced from eco-friendly 
            farms for a greener planet. 💰 Savings Alert : Unbeatable prices on all your favorite rice varieties.
            Special discounts for loyal customers and bulk orders.Easy Ordering:Convenient online ordering with 
            secure payment options.Fast and reliable delivery to your doorstep.
        </p>
        <p>
        
        Chandana Rice Industries is the foremost Rice Mill in Miryalaguda with our retail
        store in Chandanagar (Chandana Rice Stores). We pride ourselves on providing top‑quality rice -
        from single polish to premium HMT and Lachkari Kolam - so you can enjoy the
        best on every plate.
        </p>
        <p>
          Visit us at Door No. 1‑33 PSR Complex (beside Sridevi Theatre), Chandanagar,
          Hyderabad, or call us at <a href="tel:+917671879837">+91 76718 79837</a> for
          deliveries and enquiries.
        </p>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Fast &amp; Secure Delivery</li>
          <li>Wide Variety: Sona Masoori, HMT, Jaisriram Kolam, and more</li>
          <li>State‑of‑the‑Art Milling Equipment</li>
          <li>Exceptional Customer Service</li>
          <li>Serving the Chandanagar community since 2020</li>
        </ul>
      </section>

      <section className="store-samples">
        <h2>Store Highlights</h2>
        <div className="product-sample">
          <div className="card">
            <h3>Chandana Premium HMT Rice</h3>
            <p>₹1,600.00 / 26 kg bag</p>
          </div>
          <div className="card">
            <h3>Jaisriram Lachkari Kolam</h3>
            <p>₹1,700.00 / 26 kg bag</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
