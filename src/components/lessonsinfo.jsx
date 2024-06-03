import { Button, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";

function Lessonsinfo() {
  const [lesson, setLesson] = useState({
    clas: "",
    number: "",
    lesson1: "",
    lesson2: "",
    lesson3: "",
    lesson4: "",
    lesson5: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLesson((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function SendlessonsInfo() {
    axios
      .post("https://5f44cef3cd1d1892.mokky.dev/lessonsinfo", lesson)
      .then((res) => console.log(res.data));
  }

  return (
    <>
      <div className="lessons">
        <div className="lessons__content">
          <h1>Добавить название класса</h1>
          <Input
            name="clas"
            className="w-[300px]"
            value={lesson.clas}
            onChange={handleChange}
          />
          <h1>Добавить номер</h1>
          <Input
            name="number"
            className="w-[300px]"
            value={lesson.number}
            onChange={handleChange}
          />
          <h1>Добавить 1 урок</h1>
          <Input
            name="lesson1"
            className="w-[300px]"
            value={lesson.lesson1}
            onChange={handleChange}
          />
          <h1>Добавить 2 урок</h1>
          <Input
            name="lesson2"
            className="w-[300px]"
            value={lesson.lesson2}
            onChange={handleChange}
          />
          <h1>Добавить 3 урок</h1>
          <Input
            name="lesson3"
            className="w-[300px]"
            value={lesson.lesson3}
            onChange={handleChange}
          />
          <h1>Добавить 4 урок</h1>
          <Input
            name="lesson4"
            className="w-[300px]"
            value={lesson.lesson4}
            onChange={handleChange}
          />
          <h1>Добавить 5 урок</h1>
          <Input
            name="lesson5"
            className="w-[300px]"
            value={lesson.lesson5}
            onChange={handleChange}
          />
          <br />
          <br />
          <Button onClick={SendlessonsInfo}>Добавить</Button>
        </div>
      </div>
    </>
  );
}

export default Lessonsinfo;
