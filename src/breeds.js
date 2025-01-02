export async function fetchBreeds() {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();

      return Object.keys(data.message);
    } catch (error) {
      throw new Error(error.message);
    }
  }

export async function fetchBreedImageAPI(breed){
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
    
      return data.message // URL of the image
    } catch (error) {
      throw new Error(error.message);
    } 
  }

