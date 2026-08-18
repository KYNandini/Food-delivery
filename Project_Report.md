# Project Report: Food Delivery Application

## 1. Introduction

This report documents the design, implementation, and functionalities of the Food Delivery Mobile Application. The project aims to provide users with a seamless and intuitive mobile-first experience to browse restaurants, view menus, add items to a shopping cart, and track their orders.

## 2. Objectives

The primary objectives of the project were:
- To develop a responsive mobile food ordering application.
- To implement core features including user authentication, restaurant listing, menu management, shopping cart, and order tracking.
- To provide a modern, dynamic user interface using modern design trends (e.g., dark mode, glassmorphism).
- To package the web application into an Android executable (.apk) format.

## 3. Technology Stack

- **Frontend Core:** HTML5, CSS3, Vanilla JavaScript
- **Development Server & Bundler:** Vite
- **Mobile Containerization:** Capacitor JS (to wrap web assets into an Android native shell)
- **Typography & Iconography:** Google Fonts (Outfit) and Material Icons Round

By choosing standard web technologies, the app achieves a high level of performance and maintains a small bundle size, while Vite ensures an extremely fast development cycle.

## 4. Key Features Implemented

### 4.1 User Authentication (Mock)
A glassmorphism-styled modal prompts the user for login upon app initialization if no user session is found. Data is simulated and stored locally using the browser's `localStorage` to mock persistent sessions.

### 4.2 Restaurant Listing & Filtering
The home view presents a scrollable list of food categories and popular restaurants. Users can dynamically filter the restaurant list by clicking on category chips. Each restaurant card displays a thumbnail, rating, delivery time, and price tier.

### 4.3 Menu Management
Upon selecting a restaurant, a detailed view opens featuring a hero banner and a list of menu items. Each item includes a description, price, thumbnail, and an interactive "add to cart" button.

### 4.4 Shopping Cart
A side-drawer interface acts as the shopping cart. It aggregates added items, calculates the subtotal, allows for quantity adjustments (increment/decrement), and displays a total price dynamically. 

### 4.5 Order Tracking
Upon completing a checkout, the cart items are processed into a new order. The "Orders" view displays active (preparing) and past (delivered) orders with status indicators, total amounts, and timestamps.

### 4.6 Responsive UI
The app utilizes CSS Flexbox, CSS Grid, and relative units to adapt fluidly to various mobile screen sizes. Smooth CSS transitions and keyframe animations provide instant tactile feedback to the user, enhancing the overall experience.

## 5. Build and Deployment Process

The conversion from a web app to a mobile app was achieved via **Capacitor**. 
1. The web assets are built using Vite (`npm run build`).
2. Capacitor is configured to point to the output `dist/` folder.
3. The android platform is synchronized (`npx cap sync android`).
4. Android Studio is used to compile the final `.apk` file.

## 6. Conclusion
The Food Delivery Application successfully meets all project requirements. The use of Vanilla JS and modern CSS allowed for complete control over the application's look and feel while remaining performant. The Capacitor integration seamlessly bridges the gap between web and native mobile environments.
