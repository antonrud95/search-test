import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchedData = async () => {
      const response = await fetch("https://venbest-test.herokuapp.com/");
      const data = await response.json();
      return data;
    };
    fetchedData().then((data) => setData(data));
  }, []);

  const sexTranslator = (item) => {
    if (item.sex === "m") {
      return "мужской";
    } else {
      return "женский";
    }
  };

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <label htmlFor="name">Имя</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="name">Фамилия</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          onChange={(event) => setLastName(event.target.value)}
        />
        <label htmlFor="name">Возраст</label>
        <input
          type="number"
          id="age"
          name="age"
          onChange={(event) => setAge(event.target.value)}
        />
        <div>
          Пол:
          <label htmlFor="male">Мужской</label>
          <input
            type="radio"
            id="male"
            name="sex"
            onChange={() => setSex("m")}
          />
          <label htmlFor="female">Женский</label>
          <input
            type="radio"
            id="female"
            name="sex"
            onChange={() => setSex("f")}
          />
        </div>
      </div>
      {data && (
        <ul className="list">
          {data
            .filter((item) => {
              return Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(
                  name.toLowerCase() || lastname.toLowerCase() || age || sex
                );
            })

            .map((item) => {
              return (
                <li key={item.lastname} className="list__item">
                  <div>Имя: {item.name}</div>
                  <div>Фамилия: {item.lastname}</div>
                  <div>Возраст: {item.age}</div>
                  <div>Пол: {sexTranslator(item)}</div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default App;
