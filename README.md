# 🛍️ Skino - Premium E-Commerce Store

![Skino Banner](/public/logo.png)

A modern, feature-rich e-commerce platform built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

- 🎨 Modern UI/UX with Tailwind CSS
- 📱 Fully Responsive Design
- 🛒 Advanced Shopping Cart
- 💳 Razorpay Payment Integration
- 🔐 Secure Authentication
- 🏪 Product Management
- 💖 Wishlist Functionality
- 🔍 Dynamic Search
- 📦 Real-time Order Tracking

## 🚀 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **State Management:** Redux Toolkit
- **Payment:** Razorpay
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion

## 🛠️ Installation Steps

1. Clone the repository
```bash
git clone https://github.com/Technogeekpro/skino-v2.git
```

2. Change the working directory
```bash
cd skino-v2
```

3. Install dependencies
```bash
npm install
```

4. Create a `.env.local` file in root and add your variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
```

5. Run the app
```bash
npm run dev
```

🌟 You are all set! Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🌐 Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`

## 🏗️ Project Structure

```
skino-v2/
├── src/
│   ├── app/
│   │   ├── checkout/
│   │   ├── product/
│   │   └── page.tsx
│   ├── components/
│   │   ├── cart/
│   │   ├── layout/
│   │   ├── product/
│   │   └── ui/
│   ├── lib/
│   ├── models/
│   ├── providers/
│   ├── redux/
│   └── services/
├── public/
├── styles/
└── package.json
```

## 🌟 Features in Detail

### 🛍️ Shopping Experience
- Intuitive product browsing
- Advanced filtering and sorting
- Real-time search functionality
- Detailed product pages

### 🛒 Cart Management
- Add/Remove items
- Update quantities
- Save for later
- Price calculations

### 💳 Checkout Process
- Multiple payment options
- Address management
- Order summary
- Payment status tracking

### 📱 Mobile Responsive
- Optimized for all devices
- Touch-friendly interface
- Mobile-first approach

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/Technogeekpro/skino-v2](https://github.com/Technogeekpro/skino-v2)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.io)
- [Razorpay](https://razorpay.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
