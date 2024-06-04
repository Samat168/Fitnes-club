import {
  Alert,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useContext, useState } from "react";
import "./FormforPay.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { plansData } from "../../data/plansData";
import whiteTick from "../../assets/whiteTick.png";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
const trainers = ["Касимов Рашид", "Медербеков Мирбек", "Азамат Мирбеков"]; // данные для тренеров
const subscriptions = [
  "BASIC(Абонемент на месяц)",
  "PREMIUM(Абонемент на месяц)",
  "PRO(Абонемент на месяц)",
]; // данные для абонементов

const FormforPay = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [item, setItem] = useState("");
  const [numCard, setNumCard] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [trainer, setTrainer] = useState(""); // для выбора тренера
  const [subscription, setSubscription] = useState(""); // для выбора абонемента
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  const sendMessage = async () => {
    console.log();
  };

  const navigate = useNavigate();

  const cartCleaner = () => {
    if (
      !item.trim() ||
      !numCard.trim() ||
      !date.trim() ||
      !year.trim() ||
      !cvv.trim() ||
      !trainer.trim() ||
      !subscription.trim()
    ) {
      alert("Заполните все поля!!");
      return;
    }

    // Вычисление даты окончания абонемента через месяц
    const currentDate = new Date();
    const expirationDate = new Date(currentDate);
    expirationDate.setMonth(currentDate.getMonth() + 1);

    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      trener: trainer,
      abonement: subscription,
      polsov: user.email,
      expirationDate: firebase.firestore.Timestamp.fromDate(expirationDate),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    console.log(trainer, subscription);
    navigate("/");
  };

  const secondPlan = plansData[1];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Header />
      </div>
      <div>
        <div className="plans-container">
          <div className="blur plans-blur-1"></div>
          <div className="blur plans-blur-2"></div>

          {/* Plans-card */}
          <div className="plans">
            <div className="plan" style={{ gap: "0rem" }}>
              {secondPlan.icon}

              <div className="features"></div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <h4
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  Выберите Тренера
                </h4>
              </div>

              <Box sx={{ Width: "30%", marginBottom: "20px" }}>
                <FormControl
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    width: "250px",
                    marginBottom: "20px",
                  }}
                >
                  <InputLabel id="trainer-select-label">Тренер</InputLabel>
                  <Select
                    labelId="trainer-select-label"
                    id="trainer-select"
                    value={trainer}
                    onChange={(event) => setTrainer(event.target.value)}
                  >
                    {trainers.map((trainer, index) => (
                      <MenuItem key={index} value={trainer}>
                        {trainer}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                Выберите Абонемент
              </h4>
              <Box sx={{ Width: "30%", marginBottom: "20px" }}>
                <FormControl
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    width: "250px",
                    marginBottom: "20px",
                  }}
                >
                  <InputLabel id="subscription-select-label">
                    Абонемент
                  </InputLabel>
                  <Select
                    labelId="subscription-select-label"
                    id="subscription-select"
                    value={subscription}
                    onChange={(event) => setSubscription(event.target.value)}
                  >
                    {subscriptions.map((subscription, index) => (
                      <MenuItem key={index} value={subscription}>
                        {subscription}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ Width: "30%" }}>
                <h4
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  Способ оплаты
                </h4>
                <FormControl
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    width: "250px",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">
                    Способ Оплаты
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item}
                    onChange={(event) => setItem(event.target.value)}
                  >
                    <MenuItem value="visa">visa</MenuItem>
                    <MenuItem value="Paypal">Paypal</MenuItem>
                    <MenuItem value="WebMoney">WebMoney</MenuItem>
                    <MenuItem value="MasterCard">MasterCard</MenuItem>
                    <MenuItem value="American Express">
                      American Express
                    </MenuItem>
                    <MenuItem value="MBANK">MBANK</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <h4
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  Номер карты
                </h4>
                <FormControl
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    marginTop: "3%",
                    width: "250px",
                    border: "none",
                    border: "1px solid black",
                  }}
                >
                  <Input
                    className="Card"
                    type="number"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      height: "50px",
                      padding: "10px",
                      borderBottom: "none",
                      border: "0.5px solid grey",
                    }}
                    onChange={(event) => setNumCard(event.target.value)}
                  />
                </FormControl>
              </Box>

              <Box sx={{ marginLeft: "5%" }}>
                <h4 style={{ color: "white", marginBottom: "3%" }}>
                  Срок действия карты
                </h4>
                <FormControl
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">-- </InputLabel>
                  <Select
                    sx={{ height: "50px", width: "60px" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                    <MenuItem value="7">7</MenuItem>
                    <MenuItem value="8">8</MenuItem>
                    <MenuItem value="9">9</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    marginLeft: "15px",
                  }}
                >
                  <InputLabel id="demo-simple-select-label">-- </InputLabel>
                  <Select
                    sx={{ height: "50px", width: "100px" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  >
                    <MenuItem value="2023">2023</MenuItem>
                    <MenuItem value="2024">2024</MenuItem>
                    <MenuItem value="2025">2025</MenuItem>
                    <MenuItem value="2026">2026</MenuItem>
                    <MenuItem value="2027">2027</MenuItem>
                    <MenuItem value="2028">2028</MenuItem>
                    <MenuItem value="2029">2029</MenuItem>
                    <MenuItem value="2030">2030</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ marginLeft: "20px" }}>
                <h3 style={{ color: "white" }}>Зашитный код CVV</h3>
                <FormControl
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    marginTop: "3%",
                    width: "50px",
                    border: "1px solid grey",
                    marginLeft: "10px",
                  }}
                >
                  <Input
                    type="text"
                    maxLength={3}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      height: "45px",
                      borderBottom: "none",
                    }}
                    onChange={(event) => setCvv(event.target.value)}
                  />
                </FormControl>
              </Box>

              <button
                onClick={cartCleaner}
                className="btn"
                style={{ marginTop: "10px" }}
              >
                Оплатить
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FormforPay;
