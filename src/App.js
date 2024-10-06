import House from "./components/House";
import NavBar from "./components/Navbar";
import Table from "./components/Table";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import Blind from "./components/Blind";
import { BFSsearch } from "./searches";



function App() {
  const [housesList, setHousesList] = useState(["A"]);
  const [inputValue, setInputValue] = useState("");
  const [performBlindSearch, setPerformBlindSearch] = useState(false);
  const [performHeuristicSearch, setPerformHeuristicSearch] = useState(false);
  const [results, setResults] = useState({});

  const handleChange = (e) => {
    if (e.target.value.length > 1) return;
    setInputValue(e.target.value.toUpperCase());
  };

  const handleAddHouse = () => {
    if (inputValue.length === 0) return;
    if (inputValue.charCodeAt(0) < 65 || inputValue.charCodeAt(0) > 76) return;
    if (housesList.includes(inputValue)) return;
    setHousesList([...housesList, inputValue]);
    setInputValue("");
  };

  const handleDeleteHouse = (house) => {
    setHousesList(housesList.filter((h) => h !== house));
  };

  const handleBlindSearch = () => {
    setPerformBlindSearch(true);
    setPerformHeuristicSearch(false);
    setResults(BFSsearch(housesList));
  };

  return (
    <div className="App">
        <NavBar />
        <div className="container-fluid content">
          <div className="header">
            <h2>Problema</h2>
          </div>
            <div className="problem-container">
              <div className="graphic-container">
                <div className="h3">Representación gráfica</div>
                {/* <canvas className="graphic-canvas"></canvas> */}
                <div className="graphic" style={{backgroundImage: `url(./images/graphic.png)`}}></div>

              </div>
              <Table/>
            </div>
            <div className="form">
              <h3>Elejir casas con mascotas:</h3>
              <div className="houses-list row">
                {housesList.map((house) => (
                  <div className="col-1">
                      <div className="chip btn btn-light d-flex ">
                        <House />
                        <p>{house}</p>
                        <div className="delete text-danger" onClick={() => handleDeleteHouse(house)}>
                          <FaMinus />
                        </div>
                      </div>
                  </div>

                ))}
                <div className="input-item col-1">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleChange(e)}
                    className="form-control input-char"
                    placeholder="J"
                    maxLength="1"
                    pattern="[A-Z]"
                  />
                  <button className="btn btn-success btn-add" onClick={handleAddHouse}>
                      <i><CiCirclePlus /></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="btns">
                <button className="btn btn-primary" onClick={handleBlindSearch}>Generar Búsqueda Ciega</button>
                <button className="btn btn-dark"> Generar Búsqueda Heurística</button>
            </div>

            {performBlindSearch && <Blind results={results} />}
        </div>
    </div>
  );
}

export default App;
