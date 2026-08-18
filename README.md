# Food Delivery Mobile Application

A modern, mobile-first food delivery application built with Vanilla JS, CSS3, Vite, and Capacitor. This project includes features like restaurant listing, menu browsing, mock user authentication, a shopping cart, and order tracking.

## Features

- **Authentication**: Mock login/logout with a welcoming modal interface.
- **Restaurant Listing**: Browse popular restaurants with categories and dynamic filtering.
- **Menu Management**: View detailed menus with images, descriptions, and prices.
- **Shopping Cart**: A sleek cart drawer allowing users to add/remove items and calculate total prices.
- **Order Tracking**: Track active orders and view past delivered orders.
- **Responsive UI**: Built with a mobile-first approach, using dark mode by default, glassmorphism, micro-animations, and fluid transitions.

## Tech Stack

- **Core**: HTML5, Vanilla JavaScript, CSS3
- **Build Tool**: Vite (fast module bundler)
- **Mobile Wrapper**: Capacitor (cross-platform Native Runtime)

## Prerequisites

To build and run this app locally, ensure you have the following installed:
- Node.js (v18 or higher recommended)
- Android Studio (if you wish to build the Android APK locally)

## Local Development Setup

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   This will start the local Vite server. You can view the app in your browser (preferably in mobile view).

## Building the APK

To generate an Android APK file using Capacitor:

1. **Build the Web Assets**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Add Android Platform** (first time only)
   \`\`\`bash
   npx cap add android
   \`\`\`

3. **Sync the Web Assets to Android**
   \`\`\`bash
   npx cap sync android
   \`\`\`

4. **Open in Android Studio**
   \`\`\`bash
   npx cap open android
   \`\`\`
   From Android Studio, you can build the APK by navigating to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

## Project Structure

- `index.html`: Main HTML app shell containing views, modals, and the cart drawer.
- `style.css`: Comprehensive design system with CSS variables, responsive typography, and animations.
- `main.js`: Vanilla JavaScript logic handling DOM manipulation, state management, and mock data.
- `capacitor.config.json`: Configuration file for the Capacitor runtime.

## License
MIT License.
