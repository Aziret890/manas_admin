import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  deleteObject,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, getDoc, getDocs, collection, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../fireBase/fireBase";
import { Button, Input, Modal, Upload } from "antd";
import ReactQuill from "react-quill";
import { useQuill } from "react-quilljs";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";

// Initialize Firebase app with your project configuration
function Photo() {
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
      const storageRef = ref(storage, `photo1/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setImageURL(downloadURL);
      console.log(downloadURL);
      await setDoc(doc(db, "photo", `${Date.now()}`), {
        title: value,
        description: inputValue,
        image: downloadURL,
      });
    } else {
      console.log("error");
    }
  }
  const [data, setData] = useState([]);
  async function fetchData() {
    try {
      const ref = collection(db, "photo");
      const snapShot = await getDocs(ref);
      setData(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.log(error);
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
    fetchData();
  }, [quill]);
  async function fetchData() {
    try {
      const ref = collection(db, "photo");
      const snapShot = await getDocs(ref);
      setData(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.log(error);
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = async (id) => {
    setIsModalOpen(true);
    const cityRef = doc(db, "photo", id);
    await deleteDoc(cityRef);
    fetchData();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div key="news">
        <div className="max-w-[80%] m-auto">
          <h1 className="mb-[100px]" style={{ fontSize: "25px" }}>
            Опция добавления данных <big>ГАЛЕРЕЯ</big>
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
      <h1 className="mb-[100px]" style={{ fontSize: "25px" }}>
        Опция для удаления данных <big>НОВОСТИ</big> нажмите на картинку для
        удаления
      </h1>
      {data.length > 0 ? (
        data.map((el) => (
          <div
            onClick={() => showModal(el.id)}
            className="news__content__child max-w-[500px] h-[100%]"
            key={el.id}
          >
            <div className="news__content__child__image">
              <img src={el.image} alt="" />
            </div>
            <div className="news__content__child__text">
              <p>{el.title}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full m-auto flex justify-center mt-[100px]">
          {/* <h1 className="text-center">No news articles found</h1> */}
          <div>
            <div className="loader"></div>
          </div>
        </div>
      )}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

export default Photo;
