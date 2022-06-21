import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthUserContext";
import Firestore from "../firebase/Firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CompanyTypePercentages({ setShowStrategies }) {
  const { authUser } = useAuth();
  const [chartState, setChartState] = useState({
    labels: [],
    datasets: [
      {
        label: "Percent of shares",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const [selectForms, setSelectForms] = useState([
    {
      name: "agro",
      className: "companyType__item_type_0",
      value: "",
    },
  ]);

  const [showChart, setShowChart] = useState(false);

  const addNewItem = () => {
    setSelectForms((prevState) => [
      ...prevState,
      {
        name: "agro",
        className: `companyType__item_type_${prevState.length}`,
        value: "",
      },
    ]);
  };

  const removeItem = (e, name) => {
    e.preventDefault()
    console.log(name)
    console.log(selectForms)
    setSelectForms(prevState => prevState.filter(item => item.name !== name))
  }

  const handleCompanyType = (e, index) => {
    setSelectForms((prevState) => {
      prevState[index].name = e.target.value;
      return [
        ...prevState.map((stateItem, i) =>
          i === index ? prevState[index] : stateItem
        ),
      ];
    });
  };

  const handleCompanyShare = (e, index) => {
    setSelectForms((prevState) => {
      prevState[index].value = e.target.value;
      return [
        ...prevState.map((stateItem, i) =>
          i === index ? prevState[index] : stateItem
        ),
      ];
    });
  };

  const checkIfPercentagesSum100 = () => {
    const sum = selectForms.reduce((acc, curr) => {
      return parseInt(curr.value) + acc;
    }, 0);
    return sum === 100;
  };

  const calculateAndShowChart = async () => {
    if (checkIfPercentagesSum100()) {
      try {
        const firebaseState = selectForms.reduce((acc, item) => {
          return {
            ...acc,
            [item.name]: item.value,
          };
        }, {});
        await Firestore().addSingleItem({
          collection: "userStrategyPercentages",
          id: authUser.uid,
          item: firebaseState,
        });

        setChartState((prevState) => ({
          ...prevState,
          labels: selectForms.map((select) => select.name),
          datasets: prevState.datasets.map((dataset, index) => {
            return {
              ...prevState.datasets[index],
              data: selectForms.map((select) => select.value),
            };
          }),
        }));
        setShowChart(true);
      } catch (error) {
        console.error(error);
      }
    }

    return;
  };

  useEffect(async () => {
    const firestorePercentages = await Firestore().getSingleItem({
      collection: 'userStrategyPercentages',
      id: authUser.uid
    })
    const cachedPercentageList = Object.keys(firestorePercentages).map(
      (companyName, index) => ({
        name: companyName,
        className: `companyType__item_type_${index}`,
        value: firestorePercentages[companyName],
      })
    );

    setSelectForms(cachedPercentageList);
  }, []);

  return (
    <section className="companyType">
      {showChart ? (
        <>
          <section className="companyType__chart">
            <Pie data={chartState} />
          </section>
          <button
            className="companyType__chart_button"
            onClick={() => setShowChart(false)}
          >
            Editar
          </button>
          <button className="companyType__chart_button" onClick={() => setShowStrategies(true)}> Definir estratégias </button> 
        </>
      ) : (
        <>
          <h1 className="companyType__title">
            Defina a parcela de investimento nos tipos de negócio:
          </h1>
          {checkIfPercentagesSum100() === true ? (
            <p className="companyType__feedback-positive">
              Os valores somam 100%!
            </p>
          ) : (
            <p className="companyType__feedback-negative">
              Os valores tem que somar 100%.
            </p>
          )}
          <ul className="companyType__list">
            {selectForms.length > 0 &&
              selectForms.map((selectForm, index) => (
                <li className="companyType__list_item">
                  <select
                    className="companyType__list_item_dropdown"
                    value={selectForm.name}
                    onChange={(e) => handleCompanyType(e, index)}
                  >
                    <option value="agro">Agro</option>
                    <option value="ti">TI</option>
                    <option value="alimenticio">Alimenticio</option>
                  </select>
                  <input
                    className="companyType__list_item_input"
                    value={selectForm.value}
                    onChange={(e) => handleCompanyShare(e, index)}
                  ></input>{" "}
                  %
                  <span className="companyType__list_item--remove" onClick={(e) => removeItem(e, selectForm.name)}> X </span>
                </li>
              ))}
          </ul>
          <button onClick={addNewItem}>Adicionar</button>
          <button onClick={calculateAndShowChart}>Salvar</button>
        </>
      )}
      <style>
        {`
        .companyType__title{
          font-size: 26px;
        }
        .companyType{
          text-align: center;
        }
        .companyType__chart{
          width: 30%;
          height: 30%;
          margin: 5% auto 5% auto;
        }
        .companyType__chart_button{
          margin: 2% 0;
          padding: 5px 15px;
          margin: 10px;
        }
        .companyType__list{
            list-style: none;
            padding: 0;
            position: relative;
        }
        .companyType__list_item{
          margin: 5px 0;
        }
        .companyType__list_item--remove{
          position: absolute;
          right: 0;
          color: red;
          cursor: pointer;
        }
        .companyType__list_item_dropdown{
          list-style: none;
          padding: 5px 15px;
          margin: 5px 20px;
          font-size: 16px;
        }
        .companyType__list_item_input{
          width: 30px;
          padding: 5px;
          font-size: 16px;
      }
        .companyType__item_type{
            padding: 10px 20px;
        }
        .companyType__feedback-positive{
            color: green;
            font-size: 18px;
        }
        .companyType__feedback-negative{
            color: red;
            font-size: 18px;
        }
            padding: 10px 20px;
        }
        
      `}
      </style>
    </section>
  );
}
