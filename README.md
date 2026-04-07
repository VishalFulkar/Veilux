# Veilux — Luxury E-Commerce Storefront

Veilux is a high-end, minimalist e-commerce application designed with a focus on editorial aesthetics and premium user experience. Inspired by luxury fashion templates, it features smooth animations, user-specific data isolation, and a clean ivory-and-charcoal visual language.

![Veilux Preview](https://github.com/VishalFulkar/Veilux/raw/main/src/assets/hero-preview.png) *(Note: Add your actual screenshot path here)*

## ✨ Features

- **Luxury Aesthetic**: Sophisticated Ivory (`#F6F4F2`) and Charcoal (`#2C2C2C`) palette with Maroon accents.
- **Dynamic Navigation**: Category-based filtering (Men, Women, Accessories) with smooth-scroll integration.
- **Firebase Authentication**: Secure user accounts with personalized profiles.
- **Intelligent Cart Merging**: Items added as a guest are automatically merged into your account upon login.
- **User Isolation**: Private cart and order history stored securely per user UID.
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop with a custom mobile drawer.
- **Visual Star Ratings**: Real-time feedback using a custom star icon system for all products.
- **Performance**: Built with Vite 6 and Tailwind CSS v4 for lightning-fast load times.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend/Auth**: [Firebase](https://firebase.google.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [FakeStoreAPI](https://fakestoreapi.com/) (Product Data)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VishalFulkar/Veilux.git
   cd Veilux
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `src/components`: Reusable UI components (Navbar, ProductGrid, etc.)
- `src/pages`: Main application views (Homepage, Login, Cart, etc.)
- `src/redux`: Redux slices and store configuration
- `src/config`: Firebase and API setup
- `src/index.css`: Global styles using Tailwind v4 @theme

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Designed with ❤️ by [Vishal Fulkar](https://github.com/VishalFulkar)
