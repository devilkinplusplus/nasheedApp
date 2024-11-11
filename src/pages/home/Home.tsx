import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Content from "./Content";

const Home: React.FC = () => {
  const navlink = useNavigate();
  const [text, setText] = useState("");
  const messages = ["Welcome to Nasheed App", "Rest your ears", "Stay Blessed"];
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = 100; // Adjust typing speed
  const erasingSpeed = 50; // Adjust erasing speed
  const delayBetweenMessages = 1500; // Delay before switching to the next message

  useEffect(() => {
    const currentMessage = messages[messageIndex];

    // Typing effect
    if (charIndex < currentMessage.length) {
      const typingTimeout = setTimeout(() => {
        setText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(typingTimeout);
    }

    // Delay and start erasing after full message is displayed
    if (charIndex === currentMessage.length) {
      const erasingTimeout = setTimeout(() => {
        setCharIndex(0);
        setMessageIndex((prev) => (prev + 1) % messages.length); // Loop through messages
        setText(""); // Clear text to start typing the next message
      }, delayBetweenMessages);
      return () => clearTimeout(erasingTimeout);
    }
  }, [charIndex, messageIndex]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-black-bg to-gray-900 text-gray-300 text-center p-6">
      <div className="h-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 uppercase">{text}</h1>
      </div>
      <Content />
      {/* Navigation buttons */}
      <div className="flex flex-col sm:flex-row justify-evenly gap-4 sm:gap-6 p-4 w-full">
        <button onClick={() => navlink("/nasheeds")} className="bg-green-600 hover:bg-green-700 transition duration-300 text-white py-3 px-8 rounded-lg shadow-lg w-full sm:w-auto mb-3 sm:mb-0">
          Listen Nasheeds
        </button>

        <button onClick={() => navlink("/surahs")} className="bg-green-600 hover:bg-green-700 transition duration-300 text-white py-3 px-8 rounded-lg shadow-lg w-full sm:w-auto mb-3 sm:mb-0">
          Explore Surahs
        </button>

        <button onClick={() => navlink("/hadith")} className="bg-green-600 hover:bg-green-700 transition duration-300 text-white py-3 px-8 rounded-lg shadow-lg w-full sm:w-auto mb-3 sm:mb-0">
          Read Hadiths
        </button>

        <button onClick={() => navlink("/sunnahs")} className="bg-green-600 hover:bg-green-700 transition duration-300 text-white py-3 px-8 rounded-lg shadow-lg w-full sm:w-auto mb-3 sm:mb-0">
          Follow Sunnahs
        </button>
      </div>
    </div>
  );
};

export default Home;
