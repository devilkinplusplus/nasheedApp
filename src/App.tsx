import React from "react";
import "./App.css";
import MainLayout from "./pages/layout/MainLayout";
import { Route, Routes } from "react-router-dom";
import StarterPage from "./pages/layout/StarterPage";
import Login from "./components/auth/Login";
import AuthLayout from "./pages/auth/AuthLayout";
import Register from "./components/auth/Register";
import NotFound from "./components/error/NotFound";
import Nasheed from "./pages/nasheeds/Nasheed";
import Details from "./pages/base/Details";
import Sunnahs from "./pages/sunnahs/Sunnahs";
import Surah from "./pages/surah/Surah";
import PlayList from "./components/base/PlayList";
import PrayerTime from "./components/prayerTimes/PrayerTime";
import { AudioProvider } from "./services/contexts/AudioContext";
import { SurahProvider } from "./services/contexts/SurahContext";
import OneItemDetails from "./components/hadiths/OneItemDetails";
import HadithOption from './components/hadiths/HadithOption';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AudioProvider>
      <SurahProvider>
        <Routes>
          <Route path="" element={<MainLayout />}>
            <Route index={true} element={<StarterPage />} />
            <Route path="surahs" element={<Surah />} />
            <Route path="nasheeds" element={<Nasheed />} />
            <Route path="surahs/:id" element={<Details />} />
            <Route path="hadith" element={<HadithOption />} />
            <Route path="hadith/:bookName" element={<OneItemDetails />} />
            <Route path="sunnahs" element={<Sunnahs />} />
            <Route path="playlists" element={<PlayList />} />
            <Route path="prayerTimes" element={<PrayerTime />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index={true} element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </SurahProvider>
    </AudioProvider>
  );
}

export default App;
