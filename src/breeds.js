export async function fetchBreeds() {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      if (!response.ok) {
        throw new Error('${response.status}');
      }
      const data = await response.json();

      return Object.keys(data.message);
    } catch (error) {
      throw new Error(error.message);
    }
  }


