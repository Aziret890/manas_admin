// import React, { useEffect, useId, useState } from "react";
// import {
//   getStorage,
//   ref,
//   deleteObject,
//   listAll,
//   getDownloadURL,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { doc, getDoc, getDocs, collection } from "firebase/firestore";
// import { db } from "../../fireBase/fireBase";
// import { set } from "firebase/database";
// import { setDoc } from "firebase/firestore";
// import { Button, Flex, Input } from "antd";
// import ReactQuill from "react-quill";
// import parse from "node-html-parser";
// import { useQuill } from "react-quilljs";
// import DOMPurify from "dompurify";

// // Initialize Firebase app with your project configuration
// function News() {
//   // async function getNews() {
//   //   console.log(1);
//   //   try {
//   //     console.log(2);
//   //     const ref = collection(db, "users");
//   //     const snapShot = await getDocs(ref);
//   //     const dataUsers = snapShot.docs.map((doc) => doc.data());
//   //     console.log(dataUsers);
//   //     setImages(dataUsers);
//   //   } catch (error) {
//   //     console.log("e", error);
//   //   }
//   // }
//   // useEffect(() => {
//   //   getNews();
//   // }, []);
//   // // function create(values: Record<TypeParametres, string | number>) {
//   // //   await setDoc(doc(db, "news", Date.now().toString()), values);
//   // }
//   // useEffect(() => {
//   //   const desertRef = ref(storage, `proud/`);

//   //   // Delete the file
//   //   deleteObject(desertRef)
//   //     .then(() => {
//   //       // File deleted successfully
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //       // Uh-oh, an error occurred!
//   //     });
//   // }, []);
//   const [images, setImages] = useState([]);
//   const [file, setFile] = useState(null);
//   const [value, setValue] = useState(null);
//   const [imageURL, setImageURL] = useState("");
//   const [inputValue, setInputValue] = useState("");

//   const storage = getStorage();

//   function pageTokenExample() {
//     const storage = getStorage();
//     const listRef = ref(storage, "images");
//     listAll(listRef)
//       .then((res) => {
//         const imageRefs = res.items.map((itemRef) => itemRef.fullPath);
//         setImages(imageRefs);
//         console.log(imageRefs); // Optionally, log the image references
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     console.log(2);

//     // Create a reference to the file to delete
//     const desertRef = ref(storage, `images/${images[2]}`);

//     // Delete the file
//     deleteObject(desertRef)
//       .then(() => {
//         // File deleted successfully
//       })
//       .catch((error) => {
//         console.log(error);
//         // Uh-oh, an error occurred!
//       });
//   }
//   async function send() {
//     if (file) {
//       console.log(file);
//       const storageRef = ref(storage, `news/${file?.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       await uploadTask;
//       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//       setImageURL(downloadURL);
//       console.log(downloadURL);
//       setDoc(doc(db, "users", `${Date.now()}`), {
//         title: value,
//         description: inputValue,
//         image: downloadURL,
//       });
//     } else {
//       console.log("error");
//     }
//   }
//   function handleClick() {
//     if (value && file && inputValue) {
//       send();
//     } else {
//       alert("fnqwpofnqwpofnqwpofnqwpofnqwponqwpfonfqw");
//     }
//   }
//   const { quill, quillRef } = useQuill();

//   useEffect(() => {
//     if (quill) {
//       quill.on("text-change", () => {
//         setInputValue(quill.root.innerHTML);
//       });
//     }
//   }, [quill]);
//   return (
//     <div key="news">
//       <div className="max-w-[80%] m-auto">
//         <h1 className="mb-[100px]" style={{ fontSize: "25px" }}>
//           Опция добавления данных <big>НОВОСТИ</big>
//         </h1>

//         <Input
//           className="mb-[40px]"
//           onChange={(e) => setFile(e.target.files[0])}
//           type="file"
//           placeholder="тема новости (шапка)"
//         />
//         <Input
//           className="mb-[40px]"
//           type="text"
//           name=""
//           id=""
//           onChange={(e) => setValue(e.target.value)}
//         />
//       </div>

//       <div>
//         <div className="flex w-[80%] m-auto justify-between">
//           <Flex gap={"large"} vertical className="w-full">
//             <Flex vertical gap={"middle"} className="w-">
//               <div ref={quillRef} style={{ width: "80%" }} />
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: DOMPurify.sanitize(inputValue),
//                 }}
//               />
//               <Button
//                 style={{ marginTop: "30px", width: "100px", display: "flex" }}
//                 onClick={handleClick}
//                 color="blue"
//                 size="large"
//                 type="primary"
//               >
//                 загрузить
//               </Button>
//             </Flex>
//           </Flex>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default News;
import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  deleteObject,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, getDoc, getDocs, collection, setDoc } from "firebase/firestore";
import { db } from "../../fireBase/fireBase";
import { Button, Input, Upload } from "antd";
import ReactQuill from "react-quill";
import { useQuill } from "react-quilljs";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";

// Initialize Firebase app with your project configuration
function News() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imageURL, setImageURL] = useState("");

  const storage = getStorage();

  function pageTokenExample() {
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
  }

  async function send() {
    if (file) {
      console.log(file);
      const storageRef = ref(storage, `news/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setImageURL(downloadURL);
      console.log(downloadURL);
      await setDoc(doc(db, "users", `${Date.now()}`), {
        title: value,
        description: inputValue,
        image: downloadURL,
      });
    } else {
      console.log("error");
    }
  }

  function handleClick() {
    if (value && file && inputValue) {
      send();
    } else {
      alert("Please fill all fields and upload a file.");
    }
  }

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setInputValue(quill.root.innerHTML);
      });
    }
  }, [quill]);

  return (
    <div key="news">
      <div className="max-w-[80%] m-auto">
        <h1 className="mb-[100px]" style={{ fontSize: "25px" }}>
          Опция добавления данных <big>НОВОСТИ</big>
        </h1>

        <Input
          className="mb-[40px]"
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          placeholder="тема новости (шапка)"
        />
        <Input
          className="mb-[40px]"
          type="text"
          name=""
          id=""
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите тему новости"
        />
      </div>

      <div>
        <div className="flex w-[80%] m-auto justify-between">
          <div className="w-full">
            <div className="mb-[40px]">
              <div ref={quillRef} style={{ width: "100%" }} />
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(inputValue),
                }}
              />
            </div>
            <Button
              style={{ marginTop: "30px", width: "100px" }}
              onClick={handleClick}
              type="primary"
            >
              Загрузить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
