import React from "react";
import Template from "../skeleton/Template";
import DashboardComponent from "../components/Dashboard";
import { useAuth } from "../context/AuthUserContext";

export default function Dashboard() {
    const { authUser } = useAuth();

    return (
        <section className="dashboard">
        {authUser && (
            <Template tabTitle={"dashboard"}>
                <h1 className="dashboard__title">Olá, Jeff.</h1>
                <DashboardComponent>
                </DashboardComponent>
                <style jsx global>{`
                body,
                html {
                    margin: 0px;
                    color: white;
                    background-color: #000000;
                    font-family: "Baloo Bhaina 2", cursive;
                    font-style: normal;
                    font-display: swap;
                }
                .dashboard__title{
                    font-size: 30px;
                }
                `}</style>
            </Template>
        )}
        </section>
    );
}
