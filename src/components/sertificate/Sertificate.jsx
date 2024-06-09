// import { Button, Modal } from "antd";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { useState } from "react";
// import React, { createContext } from "react";
// import { Space } from "antd";
// import { deleteDoc, doc, setDoc } from "firebase/firestore";
// import { db } from "../../fireBase/fireBase";
// const ReachableContext = createContext(null);
// const UnreachableContext = createContext(null);
// const config = {
//   title: "ой ошибка !!!",
//   content: (
//     <>
//       <ReachableContext.Consumer>
//         {(name) => `нету фотографии`}
//       </ReachableContext.Consumer>
//     </>
//   ),
// };
// function Sertificate() {
//   const [modal, contextHolder] = Modal.useModal();

//   const [file, setFile] = useState(null);
//   const [imageURL, setImageURL] = useState("");
//   const storage = getStorage();
//   async function send() {
//     if (file) {
//       console.log(file);
//       const storageRef = ref(storage, `sertificate/${file?.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       await uploadTask;
//       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//       setImageURL(downloadURL);
//       console.log(downloadURL, "11");
//       setDoc(doc(db, "sertificate", `${Date.now()}`), {
//         image: downloadURL,
//       });
//     } else {
//       modal.error(config);
//     }
//   }
//   const [data, setData] = useState([]);
//   async function fetchData() {
//     try {
//       const ref = collection(db, "sertificate");
//       const snapShot = await getDocs(ref);
//       setData(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = async (id) => {
//     try {
//       setIsModalOpen(true);
//       const cityRef = doc(db, "sertificate", id);
//       await deleteDoc(cityRef);
//     } catch (e) {
//       alert(e.mesage);
//     }
//     fetchData();
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   console.log(imageURL, "hmwepofwenopfwenpfowefnpowe");
//   return (
//     <>
//       <div>
//         <h1 className="text-center mt-[3pc] text-4xl">
//           добавить новое фотографие в сертификаты
//         </h1>
//         <div className="container m-auto mt-[3pc]">
//           <div className="flex flex-col gap-[50px] max-w-[300px]">
//             <input
//               type="file"
//               onChange={(e) => setFile(e.target.files[0])}
//               name=""
//               id=""
//             />
//             <ReachableContext.Provider value="Light">
//               <Space>
//                 <Button
//                   onClick={async () => {
//                     send();
//                   }}
//                 >
//                   добавить новое фотографие
//                 </Button>
//               </Space>
//               {contextHolder}
//               <UnreachableContext.Provider value="Bamboo" />
//             </ReachableContext.Provider>
//           </div>
//           {imageURL && <img width={100} src={imageURL} />}
//         </div>
//       </div>
//       {data.length > 0 ? (
//         data.map((el) => (
//           <div
//             onClick={() => showModal(el.id)}
//             className="news__content__child max-w-[500px] h-[100%]"
//             key={el.id}
//           >
//             <div className="news__content__child__image">
//               <img src={el.image} alt="" />
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="w-full m-auto flex justify-center mt-[100px]">
//           {/* <h1 className="text-center">No news articles found</h1> */}
//           <div>
//             <div className="loader">no document</div>
//           </div>
//         </div>
//       )}
//       <Modal
//         title="Basic Modal"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       ></Modal>
//     </>
//   );
// }

// export default Sertificate;
import { Button, Modal, Space } from "antd";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, useEffect, createContext } from "react";
import { deleteDoc, doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../fireBase/fireBase";

const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);

const config = {
  title: "ой ошибка !!!",
  content: (
    <ReachableContext.Consumer>
      {(name) => `нету фотографии`}
    </ReachableContext.Consumer>
  ),
};

function Sertificate() {
  const [modal, contextHolder] = Modal.useModal();
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storage = getStorage();

  useEffect(() => {
    fetchData();
  }, []);

  async function send() {
    if (file) {
      try {
        const storageRef = ref(storage, `sertificate/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImageURL(downloadURL);

        await setDoc(doc(db, "sertificate", `${Date.now()}`), {
          image: downloadURL,
        });
        fetchData(); // Refresh data after adding new document
      } catch (error) {
        console.error("Upload failed", error);
        modal.error(config);
      }
    } else {
      modal.error(config);
    }
  }

  async function fetchData() {
    try {
      const ref = collection(db, "sertificate");
      const snapShot = await getDocs(ref);
      setData(snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  const showModal = async (id) => {
    try {
      setIsModalOpen(true);
      const cityRef = doc(db, "sertificate", id);
      await deleteDoc(cityRef);
      fetchData();
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
      <div>
        <h1 className="text-center mt-[3pc] text-4xl">
          добавить новое фотографие в сертификаты
        </h1>
        <div className="container m-auto mt-[3pc]">
          <div className="flex flex-col gap-[50px] max-w-[300px]">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <ReachableContext.Provider value="Light">
              <Space>
                <Button onClick={send}>
                  добавить новое фотографие
                </Button>
              </Space>
              {contextHolder}
              <UnreachableContext.Provider value="Bamboo" />
            </ReachableContext.Provider>
          </div>
          {imageURL && <img width={100} src={imageURL} alt="uploaded" />}
        </div>
      </div>
      <div>
        {data.length > 0 ? (
          data.map((el) => (
            <div
              onClick={() => showModal(el.id)}
              className="news__content__child max-w-[500px] h-[100%]"
              key={el.id}
            >
              <div className="news__content__child__image">
                <img src={el.image} alt="certificate" />
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
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* Add any modal content here if necessary */}
      </Modal>
    </>
  );
}

export default Sertificate;
