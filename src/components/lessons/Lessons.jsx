import { Button, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import "./lessons.scss";
import { Link } from "react-router-dom";
function Lessons() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const Data = [
    {
      title,
      text,
    },
  ];
  function Sendlessons() {
    axios
      .post("https://5f44cef3cd1d1892.mokky.dev/lessons", Data)
      .then((res) => console.log(res.data));
  }

  return (
    <>
      <div className="lessons">
        <div className="lessons__content">
          <h1>Добавить загаловок</h1>
          <Input
            className="w-[300px]"
            onChange={(e) => setTitle(e.target.value)}
          />
          <h1>Добавить текст</h1>
          <Input
            className="w-[300px]"
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <Link to="/lessonsinfo">
            <Button className="lessons__content-btn">
              Добавить расписание для класса
            </Button>
          </Link>
          <br />
          <Button onClick={Sendlessons}>Добавить</Button>
        </div>
      </div>
    </>
  );
}

export default Lessons;
