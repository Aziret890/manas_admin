import React, { useEffect, useState } from "react";
import { getStorage, ref, deleteObject,listAll } from "firebase/storage";

// Initialize Firebase app with your project configuration
function News() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(1);
    pageTokenExample();
  }, []);

  function pageTokenExample() {
    const storage = getStorage();
    const listRef = ref(storage, "images");

    listAll(listRef)
      .then((res) => {
        const imageRefs = res.items.map((itemRef) => itemRef.fullPath);
        setImages(imageRefs);
        console.log(imageRefs); // Optionally, log the image references
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(2);


// Create a reference to the file to delete
const desertRef = ref(storage, `images/${images[2]}`);

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
}).catch((error) => {
    console.log(error);
  // Uh-oh, an error occurred!
});
  }

  return (
    <div key="news">
      News
      <ul>
        {images.map((image, index) => {
          const img = image.split('/')[1];
          return (
            <li key={index}>
              {JSON.stringify(img)}
              <img
                style={{
                  maxWidth: 200,
                }}
                src={`https://firebasestorage.googleapis.com/v0/b/manasadmin-8a816.appspot.com/o/images%2F${img}?alt=media&token=29c7ea3a-e013-4ad5-a07e-5de3e22baf12`}
                alt=""
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default News;
