import React from "react";
import "./Programs.css";
import { programsData } from "../../data/programsData";
import RightArrow from "../../assets/rightArrow.png";

export const Programs = () => {
  return (
    <div className="Programs" id="programs">
      {/* Header */}
      <div className="programs-header">
        <span className="stroke-text">Тренировочные</span>
        <span>Места </span>
        <span className="stroke-text">фитнес клуба</span>
      </div>

      <div className="card-cont">
        <div>
          <div className="card">
            <img
              className="_img"
              src="https://www.mact-dom.ru/upload/iblock/432/432f50a4f630da3b02c2861a485c354e.jpg"
              alt=""
            />
            <div className="card_bottom">
              <p style={{ color: "white", fontSize: "20px" }}>Бассейн</p>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <img
              className="_img"
              src="https://mygym.su/wp-content/uploads/2022/05/photoeditorsdk-export6.jpg"
              alt=""
            />
            <div className="card_bottom">
              <p style={{ color: "white", fontSize: "20px" }}>
                Тренажерный зал
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <img
              className="_img"
              src="https://mfitness.ru/upload/iblock/bf7/bf7e40eb5a036587ea4b88a19876821e.jpg"
              alt=""
            />
            <div className="card_bottom">
              <p style={{ color: "white", fontSize: "20px" }}>Зона кардио</p>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <img
              className="_img"
              src="https://www.xfit.ru/upload/iblock/50c/%D0%B5%D0%B4%D0%B8%D0%BD%D0%BE%D0%B1.jpg"
              alt=""
            />
            <div className="card_bottom">
              <p style={{ color: "white", fontSize: "20px" }}>Зона бокса</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
