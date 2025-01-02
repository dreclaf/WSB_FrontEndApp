import React, { useEffect, useState } from 'react';
import { fetchBreeds, fetchBreedImageAPI} from './breeds.js';
import "./style.css";


function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(""); // Track selected breed
  const [imageUrl, setImageUrl] = useState(""); // Track image URL

  const fetchBreedImage = async () => {
    if (selectedBreed) {
      try {
        const breedImage = await fetchBreedImageAPI(selectedBreed);
        setImageUrl(breedImage); 
      } catch (error) {
        console.error("Error fetching breed image:", error);
      }
    }
  };

  useEffect(() => {
    const getBreeds = async () => {
      const breedList = await fetchBreeds();
      setBreeds(breedList);
    };

    getBreeds();
  }, []);

  return (
    <div className="container">
      <h1>Dog Breeds</h1>
      <select
        value={selectedBreed}
        onChange={(e) => setSelectedBreed(e.target.value)}
      >
          <option value="">Select a breed</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>

      <button onClick={fetchBreedImage} style={{ marginLeft: "10px" }}>
        Get Image
      </button>

      {selectedBreed && imageUrl && (
        <div style={{ position: "relative", display: "inline-block" }}>
        <img src={imageUrl} alt={`A ${selectedBreed}`} style={{ maxWidth: "300px" }} />
        <button className="buttonGallerySave">
          Save to gallery
        </button>
      </div>
      )}
    </div>
  );
}

export default App;
