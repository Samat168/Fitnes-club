import React, { useContext, useEffect, useState } from "react";
import "./Admin.css"; // Подключаем CSS-файл для стилей
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ChartComponent from "../ChartComponent/ChartComponent";
import TrainerChart from "../ChartComponent/TrainerChart";

const Admin = () => {
  const [userData, setUserData] = useState([]);
  const [abonementData, setAbonementData] = useState({});
  const [trainerData, setTrainerData] = useState({});
  const [trainerName, setTrainerName] = useState("");
  const [trainerGmail, setTrainerGmail] = useState("");
  const [trainerDescription, setTrainerDescription] = useState("");
  const [trainers, setTrainers] = useState([]); // State to store trainers
  const navigate = useNavigate();
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [subscriptionTitle, setSubscriptionTitle] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [subscriptionDescription, setSubscriptionDescription] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  // Fetch user and trainer data
  async function fetchData() {
    const usersQuery = await getDocs(collection(firestore, "messages"));
    const userData = [];
    usersQuery.forEach((doc) => {
      const {
        displayName,
        abonement,
        trener,
        polsov,
        createdAt,
        expirationDate,
      } = doc.data();
      userData.push({
        id: doc.id,
        displayName,
        abonement,
        trener,
        polsov,
        createdAt: createdAt ? createdAt.toDate() : null,
        expirationDate: expirationDate ? expirationDate.toDate() : null,
      });
    });
    setUserData(userData);

    const abonementMap = {};
    userData.forEach((user) => {
      abonementMap[user.abonement] = (abonementMap[user.abonement] || 0) + 1;
    });
    setAbonementData(abonementMap);

    const trainerMap = {};
    userData.forEach((user) => {
      trainerMap[user.trener] = (trainerMap[user.trener] || 0) + 1;
    });
    setTrainerData(trainerMap);

    // Fetch trainer data
    const trainersQuery = await getDocs(collection(firestore, "trainers"));
    const trainerList = [];
    trainersQuery.forEach((doc) => {
      trainerList.push(doc.data());
    });
    setTrainers(trainerList);

    const subscriptionsQuery = await getDocs(
      collection(firestore, "subscriptions")
    );
    const subscriptionList = [];
    subscriptionsQuery.forEach((doc) => {
      subscriptionList.push(doc.data());
    });
    setSubscriptions(subscriptionList);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await firestore.collection("messages").doc(id).delete();
      alert("Запись удалена успешно");
      const updatedUserData = userData.filter((user) => user.id !== id);
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Ошибка при удалении записи: ", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleTrainerSubmit = async (e) => {
    e.preventDefault();
    if (trainerName && trainerGmail && trainerDescription) {
      try {
        const newTrainerData = {
          name: trainerName,
          gmail: trainerGmail,
          description: trainerDescription,
        };

        await addDoc(collection(firestore, "trainers"), newTrainerData);
        alert("Данные тренера успешно добавлены!");
        setTrainerName("");
        setTrainerGmail("");
        setTrainerDescription("");
        fetchData(); // Re-fetch trainers after adding a new one
      } catch (error) {
        console.error("Ошибка при добавлении тренера: ", error);
      }
    } else {
      alert("Пожалуйста, заполните все поля!");
    }
  };

  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault();
    if (subscriptionTitle && subscriptionPrice && subscriptionDescription) {
      try {
        const newSubscriptionData = {
          title: subscriptionTitle,
          price: subscriptionPrice,
          description: subscriptionDescription,
        };

        await addDoc(
          collection(firestore, "subscriptions"),
          newSubscriptionData
        );
        alert("Абонемент успешно добавлен!");
        setSubscriptionTitle("");
        setSubscriptionPrice("");
        setSubscriptionDescription("");
        fetchData(); // Re-fetch subscriptions after adding a new one
      } catch (error) {
        console.error("Ошибка при добавлении абонемента: ", error);
      }
    } else {
      alert("Пожалуйста, заполните все поля!");
    }
  };

  const buttonStyle = {
    width: "90%",
    padding: "8px 16px",
    margin: "4px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#4CAF50", // Зеленый цвет
    color: "white",
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f44336", // Красный цвет
    color: "white",
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Header style={{ display: "flex", justifyContent: "center" }} />
      </div>
      <div style={{ width: "90%", margin: "auto", textAlign: "center" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
          Админ Панель
        </p>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Aбонемент</th>
              <th>Тренер</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((users) => (
              <tr key={users.id}>
                <td data-label="Имя">{users.displayName}</td>
                <td data-label="Email">{users.polsov}</td>
                <td data-label="Aбонемент">{users.abonement}</td>
                <td data-label="Тренер">{users.trener}</td>
                <td data-label="Дата начала">
                  {users.createdAt
                    ? users.createdAt.toLocaleDateString()
                    : "N/A"}
                </td>
                <td data-label="Дата окончания">
                  {users.expirationDate
                    ? users.expirationDate.toLocaleDateString()
                    : "N/A"}
                </td>
                <td data-label="Действия">
                  <button
                    style={editButtonStyle}
                    onClick={() => handleEdit(users.id)}
                  >
                    Изменить
                  </button>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDelete(users.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          width: "90%",
          margin: "auto",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#2e3b55",
            padding: "38px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            color: "white",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <h3
            style={{ fontSize: "20px", marginBottom: "16px", color: "#f1f1f1" }}
          >
            Добавить тренера
          </h3>
          <form onSubmit={handleTrainerSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Имя тренера"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="email"
                placeholder="Gmail"
                value={trainerGmail}
                onChange={(e) => setTrainerGmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <textarea
                placeholder="Описание тренера"
                value={trainerDescription}
                onChange={(e) => setTrainerDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  resize: "none",
                  height: "80px",
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Отправить
            </button>
          </form>
        </div>
      </div>

      <div style={{ width: "90%", margin: "auto", textAlign: "center" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
          Список тренеров
        </p>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Имя тренера</th>
              <th>Email</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer, index) => (
              <tr key={index}>
                <td>{trainer.name}</td>
                <td>{trainer.gmail}</td>
                <td>{trainer.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          width: "90%",
          margin: "auto",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#2e3b55",
            padding: "38px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            color: "white",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <h3
            style={{ fontSize: "20px", marginBottom: "16px", color: "#f1f1f1" }}
          >
            Добавить абонемент
          </h3>
          <form onSubmit={handleSubscriptionSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="Название абонемента"
                value={subscriptionTitle}
                onChange={(e) => setSubscriptionTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <input
                type="number"
                placeholder="Стоимость"
                value={subscriptionPrice}
                onChange={(e) => setSubscriptionPrice(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <textarea
                placeholder="Описание абонемента"
                value={subscriptionDescription}
                onChange={(e) => setSubscriptionDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  resize: "none",
                  height: "80px",
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Отправить
            </button>
          </form>
        </div>
      </div>

      <div style={{ width: "90%", margin: "auto", textAlign: "center" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
          Список абонементов
        </p>

        <table className="styled-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Стоимость</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription, index) => (
              <tr key={index}>
                <td>{subscription.title}</td>
                <td>{subscription.price}</td>
                <td>{subscription.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ width: "90%", margin: "auto", textAlign: "center" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
          Аналитика
        </p>
        <div className="chart-container">
          <div className="chart">
            <ChartComponent data={abonementData} textColor="white" />
          </div>
          <div className="chart">
            <TrainerChart data={trainerData} textColor="white" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
