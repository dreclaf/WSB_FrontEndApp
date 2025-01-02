export async function fetchBreeds() {
    /*  
      Function responsible for fetching all breeds from dog.ceo API.
      Results are provided as the array of Keys from JSON response.
    */
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
    /*  
      Function that requests image of the specified breed from the breed list.
      Results are provided as the direct URL string.
    */
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

