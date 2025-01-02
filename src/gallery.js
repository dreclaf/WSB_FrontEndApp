export function saveToGallery(imageUrl, gallery, setGallery){
    
    const storedArray = JSON.parse(localStorage.getItem("gallery")) || [];

    if (!storedArray.includes(imageUrl)) {
      storedArray.push(imageUrl);
  
      localStorage.setItem("gallery", JSON.stringify(storedArray)); // Update localStorage
      setGallery(storedArray); // Update the state
      console.log("Value added:", imageUrl);
    } else {
      console.log("Value already exists:", imageUrl);
    }
};
export function deleteFromGallery(imageUrl, gallery, setGallery){
    const updatedGallery = gallery.filter((url) => url !== imageUrl);
    setGallery(updatedGallery); // Update state
    localStorage.setItem('gallery', JSON.stringify(updatedGallery)); // Update localStorage
    console.log("Value deleted:", imageUrl);
};