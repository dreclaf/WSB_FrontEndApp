import React, { useEffect, useState } from 'react';
import { fetchBreeds } from './breeds';

function App() {
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const getBreeds = async () => {
      const breedList = await fetchBreeds();
      setBreeds(breedList);
    };

    getBreeds();
  }, []);

  return (
    <div>
      <h1>Dog Breeds</h1>
        <select>
          <option value="">Select a breed</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>
              {breed}
            </option>
          ))}
        </select>
    </div>
  );
}

export default App;
