import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./Circle.scss";

function Circles() {
  const nav = useNavigate();
  return (
    <>
      <div className="Circle">
        <div className="Circle__content">
          <Button onClick={() => nav("/Danceinfo")}>Добавить Кружок</Button>
        </div>
      </div>
    </>
  );
}

export default Circles;
