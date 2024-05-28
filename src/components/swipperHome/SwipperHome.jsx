import { Button, Modal } from "antd";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import React, { createContext } from "react";
import { Space } from "antd";
const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);
const config = {
  title: "ой ошибка !!!",
  content: (
    <>
      <ReachableContext.Consumer>
        {(name) => `нету фотографии`}
      </ReachableContext.Consumer>
    </>
  ),
};
function SwipperHome() {
  const [modal, contextHolder] = Modal.useModal();

  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const storage = getStorage();
  async function send() {
    if (file) {
      console.log(file);
      const storageRef = ref(storage, `images/${file?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setImageURL(downloadURL);
      console.log(downloadURL);
    } else {
      modal.error(config);
    }
  }
  return (
    <div>
      <h1 className="text-center mt-[3pc] text-4xl">
        добавить новое фотографие в слайдер
      </h1>
      <div className="container m-auto mt-[3pc]">
        <div className="flex flex-col gap-[50px] max-w-[300px]">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            name=""
            id=""
          />
          <ReachableContext.Provider value="Light">
            <Space>
              <Button
                onClick={async () => {
                  send();
                }}
              >
                добавить новое фотографие
              </Button>
            </Space>
            {contextHolder}
            <UnreachableContext.Provider value="Bamboo" />
          </ReachableContext.Provider>
        </div>
        {imageURL && <img width={100} src={imageURL} />}
      </div>
    </div>
  );
}

export default SwipperHome;
