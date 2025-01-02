import React, { useEffect, useState } from 'react';
import { fetchBreeds, fetchBreedImageAPI} from './breeds.js';
import {saveToGallery, deleteFromGallery} from './gallery.js';
import "./style.css";


function App() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(""); // Track selected breed
  const [imageUrl, setImageUrl] = useState(""); // Track image URL
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const storedGallery = JSON.parse(localStorage.getItem('gallery')) || [];
    setGallery(storedGallery);
  }, []);

  useEffect(() => {
    const getBreeds = async () => {
      const breedList = await fetchBreeds();
      setBreeds(breedList);
    };

    getBreeds();
  }, []);

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

  return (
    <div className="container">
      <div className="breeds">

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

        <button onClick={() => {fetchBreedImage()}}>
          Get Image
        </button>


        {selectedBreed && imageUrl && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img src={imageUrl} className='image' />
          <button className="buttonGallerySave" onClick={() => {saveToGallery(imageUrl, gallery, setGallery)}}>
            Save to gallery
          </button>
        </div>
        )}

      </div>

      <div className="gallery">
        <h3>Gallery</h3>
        <div>
          {gallery.map((imageUrl, index) => (
            <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
            <img
              key={index}
              src={imageUrl}
              alt={`Gallery Image ${index}`}
              className='galleryImage'
            />

            <button className="buttonGalleryDelete" onClick={() => {deleteFromGallery(imageUrl, gallery, setGallery)}}>
              X
            </button>
          </div>
          ))}
        </div>
      </div>


    </div>
  );
}

export default App;
