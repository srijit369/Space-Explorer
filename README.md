# Space Explorer – 

Welcome to **Space Explorer**, a web portal designed for space enthusiasts to interactively explore the cosmos using real-time data from NASA and other open APIs. This README provides setup instructions, highlights key features, and lists dependencies required to run the project.

## 🚀 Overview

**Space Explorer** is a visually immersive, user-friendly website that allows users to:
- View NASA's Astronomy Picture of the Day (APOD)
- Explore Mars Rover Photos (by rover, camera, and Martian sol)
- Track the International Space Station (ISS) in real time
- Learn about planets via the Planet Explorer
- Fetch real-time satellite images of major cities
- Browse EPIC Earth imagery
- Monitor Near Earth Objects (NEOs)
- Stay updated with space weather reports
- Read the latest space news

The site features a gradient, space-themed UI, bold headlines, high-quality visuals, and a clean, easy-to-navigate layout for an engaging user experience.

## ✨ Features

- **Astronomy Picture of the Day**: Displays NASA’s daily APOD with image and description.
- **Mars Rover Photos**: Lets users select rover, camera, and sol to view Mars images.
- **ISS Tracker**: Shows the real-time location of the International Space Station on a map, updating every few seconds.
- **Planet Explorer**: Provides detailed data about planets (mass, moons, etc.).
- **Satellite City Images**: Fetches and displays satellite imagery of selected cities.
- **EPIC Earth Imagery**: Browses Earth images from NASA’s EPIC camera.
- **Near Earth Objects**: Monitors and displays data about asteroids and NEOs.
- **Space Weather**: Shows current space weather conditions.
- **Space News**: Aggregates the latest news and discoveries from space agencies.
- **Real-Time Alerts**: Uses the Notify API to push important space updates to users[3].

## 🛠️ Setup Instructions

### 1. **Clone or Download the Repository**
Download the project files or clone the repository to your local machine.

### 2. **Obtain NASA API Key**
Register at [NASA’s API portal](https://api.nasa.gov/) to get a free API key. This is required for accessing most NASA data endpoints[2][3].

### 3. **Configure API Keys**
Add your NASA API key to the project’s configuration file or directly in the JavaScript code where API requests are made.

### 4. **Install Dependencies**
This project is built with **HTML, CSS, and JavaScript** and does **not require a Node.js backend** or package manager by default[2][3].  
If you wish to extend it or use build tools, install Node.js and run:
```bash
npm install
```

### 5. **Run Locally**
Simply open `index.html` in your browser.  
For API calls to work locally (due to CORS), you may need to use a simple HTTP server:
```bash

# Or using Node.js (if installed)
npx serve .
```

### 6. **Deploy (Optional)**
You can deploy the site to Netlify, Vercel, GitHub Pages, or any static hosting provider.

## 📦 Dependencies

- **HTML5** and **CSS3** (for structure and styling)
- **JavaScript** (for dynamic content and API integration)
- **Google Fonts: Poppins** (for typography)
- **NASA Open APIs** (APOD, Mars Rover, EPIC, NEO, etc.)
- **Notify API** (for real-time alerts)
- **Map library** (e.g., Leaflet.js or Google Maps API for ISS tracking, if implemented)
- **Fetch API** (for HTTP requests in JavaScript)

## 💡 Customization & Extensibility

- **API Keys**: Store securely and avoid exposing them in public repositories.
- **Feature Expansion**: Add voice-based search, 3D planetary models, dark mode, or additional news sources as desired[3].
- **Mobile Optimization**: The UI is responsive, but further improvements can be made for mobile-first experience.

## 📝 Credits

- Bootstamp 
- Inspired by NASA’s open data and APIs.
- UI/UX design influenced by modern, immersive space-themed web practices.

## 📚 Learning & Support

- Basic knowledge of HTML, CSS, and JavaScript is recommended.
- For troubleshooting, check API documentation for rate limits and response formats.
- For design or feature suggestions, contributions are welcome!
=
