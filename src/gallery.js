export function saveToGallery(imageUrl, setGallery){
    /*
        Function that saves non-duplicated image URL to the localStorage variable called "gallery".
        The State of setGallery is updated to provide live view of the images in the gallery.
    */
    const storedArray = JSON.parse(localStorage.getItem("gallery")) || [];

    if (!storedArray.includes(imageUrl)) {
      storedArray.push(imageUrl);
  
      localStorage.setItem("gallery", JSON.stringify(storedArray)); // Update localStorage
      setGallery(storedArray); // Update the state
    } 
};
export function deleteFromGallery(imageUrl, gallery, setGallery){
    /*
        Function that deletes image URL from the gallery.
        The State of setGallery is updated to provide live view of the images in the gallery.
    */
    const updatedGallery = gallery.filter((url) => url !== imageUrl);
    setGallery(updatedGallery); // Update state
    localStorage.setItem('gallery', JSON.stringify(updatedGallery)); // Update localStorage
};