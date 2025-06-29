import { useState } from "react";
import "./styles/ChooseType.css";
import { useNavigate } from "react-router-dom";
import docenteIcon from "../../assets/illustrations/prof.svg"
import discenteIcon from "../../assets/illustrations/student.svg"

const ChooseType = () => {
  const [selectedBox, setSelectedBox] = useState(null);
  const navigate = useNavigate();

  const boxClick = (box) => {
    setSelectedBox(box);
  };

  const buttonClick = () => {
    if (selectedBox === "docenteBox") {
      navigate("/register/form-docente");
    } else if (selectedBox === "discenteBox") {
      navigate("/register/form-discente");
    }
  };

  return (
    <main className="selector-main">
      <h1 id="selector-title">Você é:</h1>
      <div id="selector">
        <div
          id="docenteBox"
          onClick={() => boxClick("docenteBox")}
          className={`${
            selectedBox === "docenteBox" ? "box-contrast" : "selector-box"
          } ${selectedBox === "discenteBox" ? "selector-box-blur" : ""}`}
        >
          <img className="selector-img" src={docenteIcon} alt="doctor" />
          <h2
            className={`${
              selectedBox === "docenteBox"
                ? "subtitle-contrast"
                : "selector-subtitle"
            }`}
          >
            Sou <b>docente</b>
          </h2>
        </div>
        <div
          id="discenteBox"
          onClick={() => boxClick("discenteBox")}
          className={`${
            selectedBox === "discenteBox" ? "box-contrast" : "selector-box"
          } ${selectedBox === "docenteBox" ? "selector-box-blur" : ""}`}
        >
          <img className="selector-img" src={discenteIcon} alt="pacient" />
          <h2
            className={`${
              selectedBox === "discenteBox"
                ? "subtitle-contrast"
                : "selector-subtitle"
            }`}
          >
            Sou <b>discente</b>
          </h2>
        </div>
      </div>
      <div id="selector-btn-side">
        <button
          id="btn-selector"
          className={`classBtn-prim ${!selectedBox ? "btn-disabled" : ""}`}
          onClick={buttonClick}
          disabled={!selectedBox}
        >
          Continuar registro
        </button>
      </div>
    </main>
  );
};

export default ChooseType;
