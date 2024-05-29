import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Swagger() {
  const nav = useNavigate();
  return (
    <main>
      <div className="flex grid-cols-4">
        <Button onClick={() => nav("/about/me")}>о нас</Button>
        <Button onClick={() => nav("/swapper/home")}>
          добавить фотографие в слайдер
        </Button>
        <Button onClick={() => nav("/we/numbers/")}>МЫ В ЦИФРАХ</Button>
        <Button onClick={() => nav("/sertificate")}>сертификаты</Button>
        <Button onClick={() => nav("/news")}>новости</Button>
      </div>
    </main>
  );
}

export default Swagger;
