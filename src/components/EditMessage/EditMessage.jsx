import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../..";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const EditMessage = () => {
  const { id } = useParams();
  const { firestore } = useContext(Context);
  const navigate = useNavigate();
  const [messageData, setMessageData] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      const doc = await firestore.collection("messages").doc(id).get();
      if (doc.exists) {
        setMessageData(doc.data());
      } else {
        console.error("Document does not exist!");
      }
    };
    fetchMessage();
  }, [id, firestore]);

  const handleSave = async () => {
    try {
      await firestore.collection("messages").doc(id).update(messageData);
      alert("Запись обновлена успешно");
      navigate("/admin");
    } catch (error) {
      console.error("Ошибка при обновлении записи: ", error);
    }
  };

  if (!messageData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "800px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Header />
      </div>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
          fontSize: "19px",
        }}
      >
        Изменить
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <label style={{ color: "white", fontSize: "19px" }}>
            Имя:
            <input
              type="text"
              value={messageData.displayName}
              onChange={(e) =>
                setMessageData({ ...messageData, displayName: e.target.value })
              }
            />
          </label>
          <label style={{ color: "white", fontSize: "19px" }}>
            Абонемент:
            <input
              type="text"
              value={messageData.abonement}
              onChange={(e) =>
                setMessageData({ ...messageData, abonement: e.target.value })
              }
            />
          </label>
          <label style={{ color: "white", fontSize: "19px" }}>
            Тренер:
            <input
              type="text"
              value={messageData.trener}
              onChange={(e) =>
                setMessageData({ ...messageData, trener: e.target.value })
              }
            />
          </label>
          <button
            type="button"
            onClick={handleSave}
            style={{ fontSize: "19px" }}
          >
            Сохранить
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditMessage;
