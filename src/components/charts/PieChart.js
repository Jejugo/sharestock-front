import React, { useState, useEffect } from 'react'
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAuth } from "../../context/AuthUserContext";
import Firestore from "../../firebase/Firestore";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
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

      const [sectorPercentages, setSectorPercentages] = useState([]);

      useEffect(async () => {
        const firestorePercentages = await Firestore().getSingleItem({
          collection: "userStrategyPercentages",
          id: authUser.uid,
        });
        const cachedPercentageList = Object.keys(firestorePercentages).map(
          (companyName, index) => ({
            name: companyName,
            className: `companyType__item_type_${index}`,
            value: firestorePercentages[companyName],
          })
        );
        
        setSectorPercentages(cachedPercentageList);
      }, [])

      useEffect(() => {
        setChartState((prevState) => ({
            ...prevState,
            labels: sectorPercentages.map((select) => select.name),
            datasets: prevState.datasets.map((dataset, index) => {
              return {
                ...prevState.datasets[index],
                data: sectorPercentages.map((select) => select.value),
              };
            }),
          }));
      }, [sectorPercentages])
      
    return (
        <section className="companyType__chart">
            <Pie data={chartState} />

        <style>{`
            .companyType__chart{
                width: 90%;
                height: 90%;
            }
        `}</style>
        </section>
    )
}
