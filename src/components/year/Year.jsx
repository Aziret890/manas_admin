// import { Button, Input } from "antd";
// import React, { useState } from "react";

// function Year() {
//   const [inputValue, setInputValue] = useState({
//     year: 10,
//     people: 1000,
//     peopleFinishSchool: 100,
//     libriary: 600,
//   });
//   return (
//     <div className="m-auto ">
//       <div className="m-auto w-[500px]">
//         <h1 className="text-4xl from-zinc-100">МЫ В ЦИФРАХ</h1>
//         <div className="flex flex-col gap-[30px]">
//           <div>
//             <h2 className="text-2xl from-zinc-100">Год :</h2>
//             <div className="flex justify-start items-center gap-3">
//               <Input />
//               <Button>изменить</Button>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-2xl from-zinc-100">КОЛИЧЕСТВО УЧЕНИКОВ :</h2>
//             <div className="flex justify-start items-center gap-3">
//               <Input />
//               <Button>изменить</Button>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-2xl from-zinc-100">ВЫПУСКНИКОВ В ГОД :</h2>
//             <div className="flex justify-start items-center gap-3">
//               <Input />
//               <Button>изменить</Button>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-2xl from-zinc-100">КНИГ В БИБЛИОТЕКЕ :</h2>
//             <div className="flex justify-start items-center gap-3">
//               <Input />
//               <Button>изменить</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Year;
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";

function Year() {
  const [inputValue, setInputValue] = useState({
    year: 10,
    people: 1000,
    peopleFinishSchool: 100,
    libriary: 600,
  });

  const [editValues, setEditValues] = useState({ ...inputValue });

  const handleInputChange = (e, field) => {
    setEditValues({ ...editValues, [field]: e.target.value });
  };

  const handleUpdate = (field) => {
    setInputValue({ ...inputValue, [field]: editValues[field] });
  };
  useEffect(() => {
    console.log( editValues);
  }, [inputValue]);
  return (
    <div className="m-auto">
      <div className="m-auto w-[500px]">
        <h1 className="text-4xl from-zinc-100">МЫ В ЦИФРАХ</h1>
        <div className="flex flex-col gap-[30px]">
          <div>
            <h2 className="text-2xl from-zinc-100">Год :</h2>
            <div className="flex justify-start items-center gap-3">
              <Input
                value={editValues.year}
                onChange={(e) => handleInputChange(e, "year")}
              />
              <Button onClick={() => handleUpdate("year")}>изменить</Button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl from-zinc-100">КОЛИЧЕСТВО УЧЕНИКОВ :</h2>
            <div className="flex justify-start items-center gap-3">
              <Input
                value={editValues.people}
                onChange={(e) => handleInputChange(e, "people")}
              />
              <Button onClick={() => handleUpdate("people")}>изменить</Button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl from-zinc-100">ВЫПУСКНИКОВ В ГОД :</h2>
            <div className="flex justify-start items-center gap-3">
              <Input
                value={editValues.peopleFinishSchool}
                onChange={(e) => handleInputChange(e, "peopleFinishSchool")}
              />
              <Button onClick={() => handleUpdate("peopleFinishSchool")}>
                изменить
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-2xl from-zinc-100">КНИГ В БИБЛИОТЕКЕ :</h2>
            <div className="flex justify-start items-center gap-3">
              <Input
                value={editValues.libriary}
                onChange={(e) => handleInputChange(e, "libriary")}
              />
              <Button onClick={() => handleUpdate("libriary")}>изменить</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Year;
