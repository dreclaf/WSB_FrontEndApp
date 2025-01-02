import React, { useEffect, useState } from 'react';
import { fetchBreeds, fetchBreedImageAPI } from './breeds.js';
import { saveToGallery, deleteFromGallery } from './gallery.js';
import "./style.css";


function App() {
  const [breeds, setBreeds] = useState([]); // Track the breeds list
  const [selectedBreed, setSelectedBreed] = useState(""); // Track the Breed
  const [imageUrl, setImageUrl] = useState(""); // Track the image URL
  const [gallery, setGallery] = useState([]); // Track the gallery state

  useEffect(() => {
    /*  
      Load the Gallery from LocalStorage.
    */
    const storedGallery = JSON.parse(localStorage.getItem('gallery')) || [];
    setGallery(storedGallery);
  }, []);

  useEffect(() => {
    /*  
      Get the Breed List.
    */
    const getBreeds = async () => {
      const breedList = await fetchBreeds();
      setBreeds(breedList);
    };

    getBreeds();
  }, []);

  const fetchBreedImage = async () => {
    /*  
      Fetch the breed image using the API request in fetchBreedImageAPI function.
    */
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
    <div id="container">
      <div id="containerBreeds">

        <h1 id="containerBreedsH1">Dog Breeds</h1>
        <select id="containerBreedsSelect"
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

        <button id="containerBreedsButtonGetImage" onClick={() => { fetchBreedImage() }}>
          Get Image
        </button>


        {selectedBreed && imageUrl && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <img src={imageUrl} className='containerBreedsImage' />
            <button className="containerBreedsButtonGallerySave" onClick={() => { saveToGallery(imageUrl, gallery, setGallery) }}>
              Save to gallery
            </button>
          </div>
        )}

      </div>

      <div id="gallery">
        <h3 id="galleryH3">Gallery</h3>
        <div>
          {gallery.map((imageUrl, index) => (
            <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
              <img
                key={index}
                src={imageUrl}
                alt={`Gallery Image ${index}`}
                className='galleryImage'
              />

              <button id="galleryButtonDeleteImage" onClick={() => { deleteFromGallery(imageUrl, gallery, setGallery) }}>
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
