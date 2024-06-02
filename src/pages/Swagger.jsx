import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Swagger() {
  const nav = useNavigate();
  return (
    <main style={{ width: "50%", margin: "0 auto", marginTop: "10%" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 4", gap: "20px" }}
      >
        <Button onClick={() => nav("/about/me")}>о нас</Button>
        <Button onClick={() => nav("/swapper/home")}>
          добавить фотографие в слайдер
        </Button>
        <Button onClick={() => nav("/we/numbers/")}>МЫ В ЦИФРАХ</Button>
        <Button onClick={() => nav("/sertificate")}>сертификаты</Button>
        <Button onClick={() => nav("/news")}>новости</Button>
        <Button onClick={() => nav("/parent/information")}>
          информация родителям
        </Button>
        <Button onClick={() => nav("/Children/information")}>
          информация ученикам
        </Button>
        <Button onClick={() => nav("/Children/information")}>
          школа родителям
        </Button>
      </div>
    </main>
  );
}

export default Swagger;
