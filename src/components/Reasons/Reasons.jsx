import React from "react";
import "./Reasons.css";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import nb from "../../assets/nb.png";
import adidas from "../../assets/adidas.png";
import nike from "../../assets/nike.png";
import tick from "../../assets/tick.png";

const Reasons = () => {
  return (
    <div className="Reasons" id="reasons">
      <div className="left-r">
        <img src={image1} alt="reason-1" />
        <img src={image2} alt="reason-2" />
        <img src={image3} alt="reason-3" />
        <img src={image4} alt="reason-4" />
      </div>
      <div className="right-r">
        <span>Причины</span>

        <div className="details-header">
          <span className="stroke-text">Почему</span>
          <span>мы ?</span>
        </div>

        <div className="details-r">
          <div>
            <img src={tick} alt="" />
            <span>БОЛЕЕ 40+ ЭКСПЕРТНЫХ ТРЕНЕРОВ</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>ТРЕНИРУЙТЕСЬ УМНЕЕ И БЫСТРЕЕ, ЧЕМ РАНЬШЕ</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>БЕСПЛАТНАЯ ПРОГРАММА ДЛЯ НОВОГО УЧАСТНИКА</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>НАДЕЖНЫЕ ПАРТНЕРЫ</span>
          </div>
        </div>

        <span
          style={{
            color: "var(--gray)",
            fontWeight: "normal",
          }}
        >
          Наши партнеры
        </span>
        <div className="partners">
          <img src={nb} alt="" />
          <img src={adidas} alt="" />
          <img src={nike} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Reasons;
