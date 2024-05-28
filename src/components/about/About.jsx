// import { collection, addDoc, setDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../../fireBase/fireBase";
// import { Button, Flex, Input } from "antd";
// import QuillEditor from "react-quill";
// import { useQuill } from "react-quilljs";
// import "react-quill/dist/quill.snow.css";
// import { parse } from "node-html-parser";

// function About() {
//   const [inputValue, setINnputValue] = useState("");
//   async function addAbout() {
//     try {
//       const docRef = await addDoc(collection(db, "aboutme"), {
//         textAboutMe: inputValue,
//       });

//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//     setINnputValue("");
//   }
//   //   const { quill, quillRef } = useQuill();

//   //   useEffect(() => {
//   //     if (quill) {
//   //       quill.on("text-change", (delta) => {
//   //         console.log("delta", delta);
//   //         console.log("innerHTML", quill.root.innerHTML);
//   //       });
//   //     }
//   //   }, [quill]);
//   useEffect(() => {
//     console.log(inputValue);
//   }, [inputValue]);
//   return (
//     <div>
//       <div className="flex w-[80%] m-auto justify-between">
//         <Flex gap={"large"} vertical className="w-full">
//           <h1 style={{ fontSize: "25px" }}>
//             Опция добавления данных <big>о нас</big>
//           </h1>
//           <Flex vertical gap={"middle"} className="w-">
//             {/* <Input
//             value={inputValue}
//               style={{ width: "400px" }}
//               onChange={(e) => setINnputValue(e.target.value)}
//             /> */}
//             <QuillEditor
//               style={{ width: "80%" }}
//               theme="snow"
//               //   readOnly={true}

//               value={inputValue}
//               onChange={(value) => setINnputValue(value)}
//             />
//             <Button
//               style={{ marginTop: "30px", width: "100px", display: "flex" }}
//               onClick={addAbout}
//               color="blue"
//               size="large"
//               type="primary"
//             >
//               загрузить
//             </Button>
//           </Flex>
//         </Flex>
//       </div>
//       <div
//         dangerouslySetInnerHTML={{ __html: parse(inputValue).toString() }}
//       ></div>
//     </div>
//   );
// }

// export default About;
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
      <div dangerouslySetInnerHTML={{ __html: parse(inputValue).toString() }} />
    </div>
  );
}

export default About;
