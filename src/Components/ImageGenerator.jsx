import React, { useState, useRef } from "react";
import "./ImageGenerator.css"; 
import default_Image from "../assets/default_image.svg"; 
import axios from "axios"; // Importing Axios for making API requests


const ImageGenerator = () => {
  // Using React's useState to manage the image URL, loading state, and error messages
  const [imageURL, setImageURL] = useState(default_Image); // Initial state set to the default image
  const [loading, setLoading] = useState(false); // State to indicate if the image generation is in progress
  const [errorMessage, setErrorMessage] = useState(""); // State to store any error messages

  // useRef to reference the input field for image description
  const inputRef = useRef(null); 

  // Function to handle the image generation process
  const generateImage = async () => {
    const description = inputRef.current.value; // Getting the input description from the text field

    // If no description is provided, show an error message
    if (description.trim() === "") {
      setErrorMessage("Please enter an image description.");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages
    setLoading(true); // Set loading to true while the API request is in progress

    try {
      // Options for the API request, including headers and data
      const options = {
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/texttoimage2", // API endpoint
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY, // API key stored in the .env file
          "x-rapidapi-host": "open-ai21.p.rapidapi.com",
          "Content-Type": "application/json", // Specify that the request body is JSON
        },
        data: {
          text: description, // Sending the description as part of the request payload
        },
      };

      // Sending the API request using Axios
      const response = await axios.request(options);
      console.log(response.data); // Logging the entire response data for debugging

      // If the response contains the generated image URL, update the state
      if (response.data && response.data.generated_image) {
        setImageURL(response.data.generated_image); // Set the generated image URL
      } else {
        throw new Error("Image URL not found in the response"); // Error if image URL is missing
      }
    } catch (error) {
      console.error("Error generating image:", error); // Log the error for debugging
      setErrorMessage("Failed to generate image. Please try again."); // Show an error message to the user
    }

    setLoading(false); // Set loading to false once the API request is complete
  };

  return (
    <div className="ai-image-generator">
      <div className="header">         
        <div className="img-loading">
          <div className="image">
            {loading ? (
              <p>Loading...</p> // Display "Loading..." text while the image is being generated
            ) : (
              <img src={imageURL} alt="Generated" /> // Display the generated image or the default image
            )}
          </div>
          <div className="search-box">
            <input
              type="text"
              ref={inputRef} // Input field for entering the image description
              className="search-input"
              placeholder="Enter image description" // Placeholder text in the input field
            />
            <div className="generate-btn" onClick={generateImage}>
              Generate {/* Button to trigger image generation */}
            </div>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message if any */}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator; 






