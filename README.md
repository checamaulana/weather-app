# ☀️ Neumorphic Weather App

<div align="center">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.0.15-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## 🌤️ Overview

A beautiful, intuitive weather application featuring soft neumorphic UI design. Get real-time weather data for any city worldwide with a seamless user experience.

## ✨ Feature

- **Elegant Neumorphic Design**: Soft shadows and subtle depth effects create a modern, tactile UI
- **Real-time Weather Data**: Powered by OpenWeatherMap API
- **Intelligent Search**: Type-ahead city suggestions as you type
- **5-day Forecast**: Plan ahead with a detailed 5-day weather outlook
- **Responsive Layout**: Perfect viewing on any device size
- **Dynamic Weather Icons**: Visually intuitive representation of weather conditions
- **Location Precision**: Uses coordinates for pin-point weather accuracy

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/checamaulana/weather-app.git
   cd weather-app
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Create `.env` file in the root directory with your OpenWeatherMap API key:

   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Technologies

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6 for lightning-fast development
- **Styling**: Tailwind CSS 4 for utility-first styling
- **API**: OpenWeatherMap for weather data
- **State Management**: React Hooks for clean, functional state management
- **Deployment**: Ready for deployment on Vercel, Netlify, or GitHub Pages

## 📱 UI/UX Features

### Neumorphic Design Elements

- Soft, extruded components with subtle shadows
- Inset input fields with tactile feedback
- Interactive buttons with satisfying pressed states

### Weather Display

- Current temperature and conditions
- Humidity and wind speed metrics
- 5-day forecast with dynamic weather icons

### Search Experience

- Smart city suggestions as you type
- Geographic disambiguation for cities with the same name
- Remembers your previous searches

## 🧩 Project Structure

```
weather-app/
├── src/
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles with Tailwind
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # TypeScript declarations
├── public/               # Static assets
├── .env                  # Environment variables (API keys)
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for their comprehensive weather API
- [React](https://reactjs.org/) for their excellent UI library
- [Vite](https://vitejs.dev/) for the lightning-fast development experience
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">
  <p>Made with ☀️ by <a href="https://github.com/checamaulana">Checa Maulana</a></p>
  <p>If you found this project helpful, consider giving it a ⭐!</p>
</div>
