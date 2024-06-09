import React, { useEffect, useState, createContext } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import {
  doc,
  getDocs,
  collection,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../fireBase/fireBase";
import { Button, Input, Select, Space, Modal } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useQuill } from "react-quilljs";

function Teacher() {
  const [images, setImages] = useState([]);
  const [sort, setSort] = useState("");
  const [file, setFile] = useState(null);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const storage = getStorage();
  const { quill, quillRef } = useQuill();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSort(value);
  };

  const send = async () => {
    if (file) {
      try {
        const storageRef = ref(storage, `teacher/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL);
        await setDoc(doc(db, "teacher", `${Date.now()}`), {
          title: value,
          description: inputValue,
          image: downloadURL,
          sort: sort,
        });
        fetchData(); // Refresh data after adding new document
      } catch (error) {
        console.error("Upload failed", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleClick = () => {
    if (sort && value && file && inputValue) {
      send();
    } else {
      alert("Please fill all fields");
    }
  };

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setInputValue(quill.root.innerHTML);
      });
    }
    fetchData();
  }, [quill]);

  const fetchData = async () => {
    try {
      const ref = collection(db, "teacher");
      const snapShot = await getDocs(ref);
      setData(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const showModal = async (id) => {
    try {
      setIsModalOpen(true);
      const cityRef = doc(db, "teacher", id);
      await deleteDoc(cityRef);
      fetchData(); // Refresh data after deletion
    } catch (e) {
      alert(e.message);
    }
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
            Опция добавления данных <big>УЧИТЕЛЯ</big>
          </h1>
          <Input
            className="mb-[40px]"
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            placeholder="Выберите файл"
          />
          <Input
            className="mb-[40px]"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Название"
          />
          <Space wrap>
            <Select
              defaultValue="Математика мугалим"
              style={{ width: 200 }}
              onChange={handleChange}
              options={[
                { value: "Математика мугалим", label: "Математика мугалим" },
                { value: "Биология мугалими", label: "Биология мугалими" },
                {
                  value: "Англис тили мугалими",
                  label: "Англис тили мугалими",
                },
                {
                  value: "Кыргыз тили жана адабияты мугалими",
                  label: "Кыргыз тили жана адабияты мугалими",
                },
                { value: "Директор", label: "Директор" },
              ]}
            />
          </Space>
        </div>
        <div>
          <div className="flex w-[80%] m-auto justify-between">
            <div className="flex flex-col gap-4 w-full">
              <div ref={quillRef} style={{ width: "100%", height: "300px" }} />
              <div
                dangerouslySetInnerHTML={{ __html: inputValue }}
                className="border p-4 mt-4"
              />
              <Button
                style={{ marginTop: "30px" }}
                onClick={handleClick}
                type="primary"
              >
                загрузить
              </Button>
            </div>
          </div>
          {imageURL && (
            <img src={imageURL} alt="uploaded" style={{ marginTop: "20px" }} />
          )}
        </div>
        <div className="mt-4">
          {data.length > 0 ? (
            data.map((el) => (
              <div
                onClick={() => showModal(el.id)}
                className="news__content__child max-w-[500px] h-[100%] mb-4 cursor-pointer"
                key={el.id}
              >
                <div className="news__content__child__image">
                  <img src={el.image} alt="teacher" className="w-full h-auto" />
                </div>
                <div className="p-4">
                  <h3>{el.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: el.description }}
                    className="mt-2"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full m-auto flex justify-center mt-[100px]">
              <div>
                <div className="loader">no document</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Content for the modal goes here</p>
      </Modal>
    </>
  );
}

export default Teacher;
