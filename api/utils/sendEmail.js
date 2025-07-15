const nodemailer = require('nodemailer');

// Format date to dd/mm/yyyy
const formatDate = (input) => {
  if (!input) return 'Not specified';
  const date = new Date(input);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Generate styled HTML table for product list
const generateProductHTML = (products) => {
  return `
    <table border="0" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 14px;">
      <thead style="background-color: #f8f8f8;">
        <tr style="border-bottom: 2px solid #ddd; text-align: left;">
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(p => `
          <tr style="border-bottom: 1px solid #eee;">
            <td>${p.name}</td>
            <td>${p.quantity}</td>
            <td>₹${p.price}</td>
            <td>₹${(p.quantity * p.price).toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
};

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD
  }
});


// ✅ Email to Customer – Order Confirmation
exports.sendEmailToCustomer = async (order) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: order.customerEmail,
    subject: '🛒 Order Confirmation – Chandana Rice Stores',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2e7d32;">Hello ${order.customerName},</h2>
        <p>Thank you for placing your order with <strong>Chandana Rice Stores</strong>! 🎉</p>

        <h3 style="margin-top: 20px;">📦 Order Summary</h3>
        <p><b>Delivery Address:</b> ${order.address}</p>
        <p><b>Preferred Delivery Date:</b> ${formatDate(order.preferredDate)}</p>
        <p><b>Payment Method:</b> ${order.paymentMethod}</p>
        <p><b>Total Amount:</b> ₹${order.total.toFixed(2)}</p>

        <h4 style="margin-top: 20px;">🛍️ Items Ordered:</h4>
        ${generateProductHTML(order.products)}

        <p>If you have any questions, feel free to reply to this email.</p>

        <p style="font-size: 14px; color: #777;">– Team Chandana Rice Stores</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};


// ✅ Email to Admin – New Order Notification
exports.sendEmailToAdmin = async (order) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: process.env.ADMIN_EMAIL,
    subject: '📥 New Order Received – Chandana Rice Stores',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #d32f2f;">🚨 New Order Alert!</h2>

        <h3>🧍 Customer Details</h3>
        <p><b>Name:</b> ${order.customerName}</p>
        <p><b>Phone:</b> ${order.phone}</p>
        <p><b>Email:</b> ${order.customerEmail}</p>
        <p><b>Address:</b> ${order.address}</p>
        <p><b>Preferred Delivery Date:</b> ${formatDate(order.preferredDate)}</p>
        <p><b>Payment Method:</b> ${order.paymentMethod}</p>
        <p><b>Total:</b> ₹${order.total.toFixed(2)}</p>

        <h4 style="margin-top: 20px;">🛍️ Ordered Items:</h4>
        ${generateProductHTML(order.products)}

        <p style="margin-top: 20px; font-size: 13px; color: #777;">Check your admin dashboard for further action.</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};


// ✅ Email to Customer – After Delivery
exports.sendDeliveryEmail = async (order) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: order.customerEmail,
    subject: '🎉 Your Order Has Arrived! – Thank You from Chandana Rice Stores',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #2e7d32;">Hello ${order.customerName},</h2>
        <p style="font-size: 16px;">We’re thrilled to let you know that your order has been <strong>successfully delivered</strong>!</p>
        <p>We hope everything was perfect and you enjoyed shopping with us 😊.</p>

        <h4 style="margin-top: 20px;">What's Next?</h4>
        <ul style="line-height: 1.6;">
          <li>🌟 If you loved our service, we’d be incredibly grateful if you could <a href="https://g.co/kgs/TqZyc1W" target="_blank">leave us a review</a>.</li>
          <li>🛒 Need anything else? We’re always here to serve you again with quality and care.</li>
        </ul>

        <p style="margin-top: 20px;">Thanks again for choosing <strong>Chandana Rice Stores</strong>.<br>
        We look forward to seeing you again soon!</p>

        <p style="font-size: 14px; color: #777;">– Team Chandana Rice Stores</p>
      </div>
    `
  };
  await transporter.sendMail(mailOptions);
};
