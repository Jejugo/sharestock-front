import { StackedBarChart } from '@mui/icons-material'
import React from 'react'
import PieChart from './charts/PieChart'
import BarChart  from './charts/BarChart'

export default function DashboardComponent() {
    return (
        <section className="dashboard-wrapper">
            <div className="dashboard-wrapper__walletDistribution"><PieChart/></div>
            <div className="dashboard-wrapper__walletPercentage"><BarChart/></div>
            <div className="dashboard-wrapper__history"></div>
        <style>{`
            .dashboard-wrapper{
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: 20% 20% 20% 20% 20%;
                grid-template-rows: 15% 15% 15% 15% 15%;
            }
            .dashboard-wrapper__walletDistribution{
                grid-column: 1 / 3;
                grid-row: 1 / 5;
            }
            .dashboard-wrapper__walletPercentage{
                grid-column: 3 / 6;
                grid-row: 1 / 5;
            }
            .dashboard-wrapper__history{
                grid-column: 1 / 6;
                grid-row: 5 / 7;
                border: 1px solid;
            }
   
        `}</style>
        </section>
    )
}
