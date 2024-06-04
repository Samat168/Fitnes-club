import React, { useContext, useEffect, useState } from "react";
import Bars from "../../assets/bars.png";
import Logo from "../../assets/photo_5370544269787519196_m.jpg";
import "./Header.css";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";

import { ADMIN } from "../../helpers/consts";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = () => {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuOpen, setMenuOpen] = useState(false);
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <>
      <div className="header" id="home">
        <img src={Logo} alt="" className="logo" />
        {menuOpen === false && mobile === true ? (
          <div
            style={{
              backgroundColor: "var(--appColor)",
              padding: "0.5rem",
              borderRadius: "5px",
            }}
            onClick={() => setMenuOpen(true)}
          >
            <img
              src={Bars}
              alt=""
              style={{ cursor: "pointer", width: "1.5rem", height: "1.5rem" }}
            />
          </div>
        ) : (
          <div>
            <ul className="header-menu">
              <li>
                <NavLink
                  to="/"
                  activeClass="active"
                  onClick={() => setMenuOpen(false)}
                  span={true}
                  smooth={true}
                  style={{ color: "white" }}
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <Link
                  to="programs"
                  onClick={() => setMenuOpen(false)}
                  span={true}
                  smooth={true}
                >
                  Зоны
                </Link>
              </li>
              <li>
                <Link
                  to="reasons"
                  onClick={() => setMenuOpen(false)}
                  span={true}
                  smooth={true}
                >
                  Почему мы
                </Link>
              </li>
              <li>
                <Link
                  to="plans"
                  onClick={() => setMenuOpen(false)}
                  span={true}
                  smooth={true}
                >
                  Абонементы
                </Link>
              </li>
              <li>
                <Link
                  to="testimonial"
                  onClick={() => setMenuOpen(false)}
                  span={true}
                  smooth={true}
                >
                  Тренеры
                </Link>
              </li>
              {user && user.email == ADMIN ? (
                <li>
                  <NavLink
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    span={true}
                    smooth={true}
                    style={{ color: "white" }}
                  >
                    Админ
                  </NavLink>
                </li>
              ) : null}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
