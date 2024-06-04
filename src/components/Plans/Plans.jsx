import React, { useContext } from "react";
import "./Plans.css";
import { plansData } from "../../data/plansData";
import whiteTick from "../../assets/whiteTick.png";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";

function Plans() {
  const navigate = useNavigate();
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  const handleSubscriptionClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/formforpay");
    }
  };
  return (
    <div className="plans-container">
      <div className="blur plans-blur-1"></div>
      <div className="blur plans-blur-2"></div>
      <div className="programs-header" style={{ gap: "2rem" }}>
        <span className="stroke-text">Выбери для себя удобный</span>
        <span>Абонемент</span>
        <span className="stroke-text">Сейчас</span>
      </div>

      {/* Plans-card */}
      <div className="plans">
        {plansData.map((plan, i) => (
          <div className="plan" key={i}>
            {plan.icon}
            <span>{plan.name}</span>
            <span>KGS-{plan.price}</span>

            <div className="features">
              {plan.features.map((feature, i) => (
                <div className="feature">
                  <img src={whiteTick} alt="white-tick" />
                  <span key={i}>{feature}</span>
                </div>
              ))}
            </div>

            <button onClick={handleSubscriptionClick} className="btn">
              Подключить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
