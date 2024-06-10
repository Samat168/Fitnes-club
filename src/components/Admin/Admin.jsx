import React, { useContext, useEffect, useState } from "react";
import "./Admin.css"; // Подключаем CSS-файл для стилей
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ChartComponent from "../ChartComponent/ChartComponent";
import TrainerChart from "../ChartComponent/TrainerChart";

const Admin = () => {
  const [userData, setUserData] = useState([]);
  const [abonementData, setAbonementData] = useState({});
  const [trainerData, setTrainerData] = useState({});
  const navigate = useNavigate();
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  async function fetchh() {
    const query = await getDocs(collection(firestore, "messages"));

    const data = [];
    query.forEach((doc) => {
      const {
        displayName,
        abonement,
        trener,
        polsov,
        createdAt,
        expirationDate,
      } = doc.data(); // Получаем данные из документа
      data.push({
        id: doc.id,
        displayName,
        abonement,
        trener,
        polsov,
        createdAt: createdAt ? createdAt.toDate() : null, // Преобразуем timestamp в Date
        expirationDate: expirationDate ? expirationDate.toDate() : null, // Преобразуем timestamp в Date
      });
    });

    return data;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchh();
      setUserData(data);

      // Собираем данные по абонементам
      const abonementMap = {};
      data.forEach((user) => {
        if (abonementMap[user.abonement]) {
          abonementMap[user.abonement]++;
        } else {
          abonementMap[user.abonement] = 1;
        }
      });
      setAbonementData(abonementMap);

      const trainerMap = {};
      data.forEach((user) => {
        if (trainerMap[user.trener]) {
          trainerMap[user.trener]++;
        } else {
          trainerMap[user.trener] = 1;
        }
      });
      setTrainerData(trainerMap);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
                  {console.log(users)}
                </td>
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
            <TrainerChart data={trainerData} textColor="white" />{" "}
          </div>
        </div>
      </div>
      <div></div>
      <Footer />
    </div>
  );
};

export default Admin;
