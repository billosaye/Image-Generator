import React, { useState, useRef } from "react";
import "./ImageGenerator.css";
import default_Image from "../assets/default_image.svg";
import axios from "axios";

const ImageGenerator = () => {
  const [imageURL, setImageURL] = useState(default_Image);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  const generateImage = async () => {
    const description = inputRef.current.value;

    if (description.trim() === "") {
      setErrorMessage("Please enter an image description.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const options = {
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/texttoimage2",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          "x-rapidapi-host": "open-ai21.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          text: description,
        },
      };

      const response = await axios.request(options);
      console.log(response.data); // Log the entire response data

      // Check if the response contains the image URL
      if (response.data && response.data.generated_image) {
        setImageURL(response.data.generated_image);
      } else {
        throw new Error("Image URL not found in the response");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      setErrorMessage("Failed to generate image. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI IMAGE <span>GENERATOR</span>
        <div className="img-loading">
          <div className="image">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <img src={imageURL} alt="Generated" />
            )}
          </div>
          <div className="search-box">
            <input
              type="text"
              ref={inputRef}
              className="search-input"
              placeholder="Enter image description"
            />
            <div className="generate-btn" onClick={generateImage}>
              Generate
            </div>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;