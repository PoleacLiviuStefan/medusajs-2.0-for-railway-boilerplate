'use client'
import React, { useEffect, useState } from "react";

const Modal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Cheia pentru localStorage unde se stochează timpul ultimei activități
  const LAST_ACTIVITY_KEY = "lastActivityTime";

  useEffect(() => {
    const checkLastActivity = () => {
      const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
      const currentTime = Date.now();

      // Dacă nu există timp salvat sau au trecut 30 de minute (1800000 ms)
      if (!lastActivity || currentTime - parseInt(lastActivity, 10) > 1800000) {
        setIsModalVisible(true);
      } else {
        setIsModalVisible(false);
      }

      // Actualizează timpul ultimei activități
      localStorage.setItem(LAST_ACTIVITY_KEY, currentTime.toString());
    };

    // Verifică activitatea la fiecare navigare
    checkLastActivity();

    // Ascultă evenimente de navigare și actualizează timpul activității
    const handleActivity = () => {
      localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
    };
  }, []);

  return (
    <>
      {isModalVisible && (
        <div className="fixed flex justify-center items-center z-50 bg-black bg-opacity-[70%] top-0 left-0 w-full h-full">
          <div className="relative bg-black font-montSerrat z-50 w-[320px] h-[400px] lg:w-[500px] lg:h-[600px] flex flex-col items-center justify-center px-[16px] shadow-xl">
            <span
              className="absolute top-2 right-2 text-white text-[24px] cursor-pointer"
              onClick={() => setIsModalVisible(false)}
            >
              X
            </span>
            <p className="text-white text-center">
              Acesta este un mesaj important!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
