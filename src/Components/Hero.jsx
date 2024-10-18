import React from "react";
import logo from "../assets/logo.svg";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col animate-fade-in">
      <nav className="flex justify-between items-center w-full mb-3 pt-3">
        <img
          src={logo}
          alt="image_gen_logo"
          className="w-28 object-contain animate-spin-slow"
        />
        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/billosaye", "_blank")
          }
          className="github_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Stunning Visuals with <br className="max-md:hidden" />
        <span className="linkedin_gradient"> AI Image Generator</span>
      </h1>
      <h2 className="desc mb-4">
        Unleash your creativity by generating unique, high-quality images
        effortlessly with our advanced AI tool.
      </h2>
    </header>
  );
};

export default Hero;
