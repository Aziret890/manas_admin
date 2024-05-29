import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../fireBase/fireBase";
import { Button, Flex } from "antd";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import { parse } from "node-html-parser";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function About() {
  const storage = getStorage();

  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setInputValue(quill.root.innerHTML);
      });
    }
  }, [quill]);

  async function addAbout() {
    try {
      const docRef = await addDoc(collection(db, "aboutme"), {
        textAboutMe: inputValue,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setInputValue("");
    if (quill) {
      quill.setText("");
    }
  }
  return (
    <div>
      <div className="flex w-[80%] m-auto justify-between">
        <Flex gap={"large"} vertical className="w-full">
          <h1 style={{ fontSize: "25px" }}>
            Опция добавления данных <big>о нас</big>
          </h1>
          <Flex vertical gap={"middle"} className="w-">
            <div ref={quillRef} style={{ width: "80%" }} />
            <div dangerouslySetInnerHTML={{ __html: parse(inputValue).toString() }} />
            <Button
              style={{ marginTop: "30px", width: "100px", display: "flex" }}
              onClick={addAbout}
              color="blue"
              size="large"
              type="primary"
            >
              загрузить
            </Button>
          </Flex>
        </Flex>
      </div>
      {imageURL && <img src={imageURL} />}
    </div>
  );
}

export default About;
