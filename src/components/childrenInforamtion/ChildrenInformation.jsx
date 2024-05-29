import React, { useEffect, useId, useState } from "react";
import {
  getStorage,
  ref,
  deleteObject,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../fireBase/fireBase";
import { set } from "firebase/database";
import { setDoc } from "firebase/firestore";
import { Button, Flex, Input } from "antd";
import ReactQuill from "react-quill";
import parse from "node-html-parser";
import { useQuill } from "react-quilljs";

// Initialize Firebase app with your project configuration
function ChildrenInformation() {
  const [imageURL, setImageURL] = useState("");
  const [inputValue, setInputValue] = useState("");

  async function send() {
      setDoc(doc(db, "useful information", `${Date.now()}`), {
        description: inputValue,
      });

  }
  function handleClick() {
    if (inputValue) {
      send();
      setInputValue('')
    } else {
      alert("fnqwpofnqwpofnqwpofnqwpofnqwponqwpfonfqw");
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
          Опция добавления данных <big>ПОЛЕЗНАЯ НИФОРМАЦИЯ</big>
        </h1>
      </div>

      <div>
        <div className="flex w-[80%] m-auto justify-between">
          <Flex gap={"large"} vertical className="w-full">
            <Flex vertical gap={"middle"} className="w-">
              <div ref={quillRef} style={{ width: "80%" }} />
              <div
                dangerouslySetInnerHTML={{
                  __html: parse(inputValue).toString(),
                }}
              />
              <Button
                style={{ marginTop: "30px", width: "100px", display: "flex" }}
                onClick={handleClick}
                color="blue"
                size="large"
                type="primary"
              >
                загрузить
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default ChildrenInformation;
