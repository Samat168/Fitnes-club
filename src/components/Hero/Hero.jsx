import React, { useContext, useEffect, useState } from "react";
import "./Hero.css";
import Header from "../Header/Header";
import hero_image from "../../assets/hero_image.png";
import hero_image_back from "../../assets/hero_image_back.png";
import Heart from "../../assets/heart.png";
import Calories from "../../assets/calories.png";
import { motion } from "framer-motion";
import NumberCounter from "number-counter";
import { Link } from "react-scroll";
import { Avatar, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
const transition = { type: "spring", duration: 3 };
const mobile = window.innerWidth <= 768 ? true : false;

const Hero = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [abonements, setAbonements] = useState([]);

  useEffect(() => {
    const fetchAbonements = async () => {
      if (user) {
        const q = query(
          collection(firestore, "messages"),
          where("polsov", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        const abonementsData = [];
        querySnapshot.forEach((doc) => {
          abonementsData.push(doc.data().abonement); // предположим, что имя абонемента хранится в поле "abonement"
        });
        setAbonements(abonementsData);
      }
    };

    fetchAbonements();
  }, [user, firestore]);

  console.log(user);
  return (
    <div className="hero">
      <div className="blur hero-blur"></div>
      {/* Left side of Hero section */}
      <div className="left-h">
        <Header />
        {/* the best add */}
        <div className="the-best-add">
          <motion.div
            initial={{ left: mobile ? "165px" : "239px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>Лучший Фитнес клуб в Бишкеке</span>
        </div>

        {/* Abonements display */}
        {user && abonements.length > 0 && (
          <div className="abonements" style={{ color: "white" }}>
            <span>Ваши подключенные абонементы:</span>
            <ul>
              {abonements.map((abonement, index) => (
                <li key={index}>{abonement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Hero Heading */}
        <div className="hero-text">
          <div>
            <span className="stroke-text">Прокачай</span>
            <span> Свое</span>
          </div>
          <div>
            <span>Тело</span>
          </div>
          <div>
            <span>ЗДОРОВЬЕ И ЭНЕРГИЯ В ПРЕМИУМ ФИТНЕС КЛУБЕ Felix</span>
          </div>
        </div>

        {/* figures */}
        <div className="figures">
          <div>
            <span>
              <NumberCounter start={30} end={40} delay="4" preFix="+" />
            </span>
            <span>ЭКСПЕРТНЫЕ ТРЕНЕРЫ</span>
          </div>
          <div>
            <span>
              <NumberCounter start={800} end={978} delay="4" preFix="+" />
            </span>
            <span>УЧАСТНИКИ ПРИСОЕДИНИЛИСЬ</span>
          </div>
          <div>
            <span>
              <NumberCounter start={0} end={50} delay="4" preFix="+" />
            </span>
            <span>ФИТНЕС-ПРОГРАММЫ</span>
          </div>
        </div>
        {/* hero button */}
        <div className="hero-buttons">
          <button className="btn">Начать</button>
          <button className="btn">Узнать больше</button>
        </div>
      </div>

      {/* right side of Hero section */}

      <div className="right-h">
        <div className="btk">
          {user ? (
            <Box display="flex" alignItems="center" gap="10px">
              <Avatar
                src={user.photoURL}
                alt={user.displayName}
                sx={{ width: 40, height: 40, borderRadius: "50%" }}
              />
              <Button
                onClick={() => auth.signOut()}
                variant="contained"
                color="success"
              >
                Выйти
              </Button>
            </Box>
          ) : (
            <NavLink to="login">
              <Button variant="contained" color="success">
                Войти
              </Button>
            </NavLink>
          )}
        </div>
        <motion.div
          initial={{ right: "-1rem" }}
          whileInView={{ right: "4rem" }}
          transition={transition}
          className="heart-rate"
        >
          <img src={Heart} alt="heart-img" />
          <span>Cердцебиение</span>
          <span>116 bpm</span>
        </motion.div>

        {/* Hero images */}
        <img src={hero_image} alt="" className="hero-image" />
        <motion.img
          src={hero_image_back}
          initial={{ right: "11rem" }}
          whileInView={{ right: "20rem" }}
          transition={transition}
          alt=""
          className="hero-image-back "
        />

        {/* Calories */}
        <motion.div
          initial={{ right: "37rem" }}
          whileInView={{ right: "28rem" }}
          transition={{ transition }}
          className="calories"
        >
          <img src={Calories} alt="" />
          <div>
            <span>Сжигание калории</span>
            <span>220 kcal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
