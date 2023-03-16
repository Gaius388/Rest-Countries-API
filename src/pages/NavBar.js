import React, { useState, useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode("dark");
    } else {
      setDarkMode("light");
    }
  }, []);
  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const handleDarkModeSwitch = () => {
    setDarkMode(darkMode === "dark" ? "light" : "dark");
  };

  
  return (
    <main className="text-lightTextColor dark:bg-darkColor dark:text-darkTextColor font-nunito">
      <header className="h-[4.5rem] border dark:border-lightTextColor shadow-md px-5 sm:px-10 flex gap-2 items-center justify-between text-sm sm:text-lg">
        <h2 className="font-bold">Where in the world?</h2>
        <div
          className="flex gap-2 items-center font-semibold cursor-pointer"
          onClick={handleDarkModeSwitch}
        >
          {darkMode === "dark" ? <BsSun /> : <BsMoon />}
          {darkMode === "dark" ? (
            <span>Light mode</span>
          ) : (
            <span>Dark mode</span>
          )}
        </div>
      </header>
    </main>
  );
};

export default NavBar;
