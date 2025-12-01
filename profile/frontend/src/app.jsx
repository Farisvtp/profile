import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./app.css";
import HomePage from './HomePage';
import EventsPage from './pages/EventsPage';
import FilmPRPage from './pages/FilmPRPage';
import AdvertisementPage from './pages/AdvertisementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/film-pr" element={<FilmPRPage />} />
        <Route path="/advertisement" element={<AdvertisementPage />} />
      </Routes>
    </Router>
  );
}

export default App;