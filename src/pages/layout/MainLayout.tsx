import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import Footer from "../../components/layout/Footer";
import { Outlet } from "react-router-dom";
import AudioPlay from "../../components/base/AudioPlay";
import { useAudioContext } from "../../services/contexts/AudioContext";

function MainLayout() {
  const { audioSrc } = useAudioContext();

  const isAudioAvailable = audioSrc && typeof audioSrc === 'string' && audioSrc.trim() !== '';

  return (
    <div className="flex flex-col min-h-screen font-squada">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1 bg-bg-outlet text-gray-300 flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          {/* Show audio component if available  */}
          <div className={`w-full ${isAudioAvailable ? 'block' : 'hidden'}`}>
            <AudioPlay />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
