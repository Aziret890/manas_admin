import { Button, Input } from "antd";
import React, { useState } from "react";
import "./Dance.scss";
import axios from "axios";

function Dance() {
  const [name, setName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [time, setTime] = useState("");
  const [teacher, setTeacher] = useState("");
  const [room, setRoom] = useState("");

  const Data = [
    {
      id: Date.now(),
      name,
      schedule,
      time,
      teacher,
      room,
    },
  ];

  function PostInfoCircle() {
    if (
      name.length > 0 &&
      schedule.length > 0 &&
      time.length > 0 &&
      teacher.length > 0 &&
      room.length > 0
    ) {
      try {
        axios.post("https://5f44cef3cd1d1892.mokky.dev/items", Data);
        console.log(Data);
        alert("Данные успешно сохранены");
      } catch (error) {
        console.error("Ошибка при отправке данных", error);
        alert("Ошибка при сохранении данных");
      }
    } else {
      alert("пожалуйста заполните все поля");
    }
  }

  return (
    <>
      <div className="Dance">
        <div className="Dance__content">
          <h4>Добовьте название кружока</h4>
          <Input
            className="Dance__content__input"
            placeholder="Добовьте название кружока"
            onChange={(e) => setName(e.target.value)}
          />
          <h4>Добовьте расписание</h4>
          <Input
            className="Dance__content__input"
            onChange={(e) => setSchedule(e.target.value)}
          />
          <h4>Выберите время</h4>
          <Input
            className="Dance__content__input"
            onChange={(e) => setTime(e.target.value)}
          />
          <h4>Введите имя учителя</h4>
          <Input
            className="Dance__content__input"
            onChange={(e) => setTeacher(e.target.value)}
          />
          <h4>Добавьте кабинет</h4>
          <Input
            className="Dance__content__input"
            onChange={(e) => setRoom(e.target.value)}
          />

          <Button onClick={PostInfoCircle}>Сохранить</Button>
        </div>
      </div>
    </>
  );
}

export default Dance;
