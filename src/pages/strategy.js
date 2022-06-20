import React, { useState, useEffect } from "react";
import Router from "next/router";
import Fonts from "../components/Fonts";
import Template from "../components/Template";
import StrategyForm from "../components/StrategyForm";
import CompanyTypePercentages from "../components/CompanyTypePercentages";
import { useAuth } from "../context/AuthUserContext";

export default function strategy() {
  const { authUser } = useAuth();

  const redirectIfUserNotLoggedIn = async () => {
    const router = Router;
    await sleep(2000);
    if (!authUser) router.push("/login");
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(async () => {
    Fonts();
    //await redirectIfUserNotLoggedIn();
  }, []);

  const [showStrategies, setShowStrategies] = useState(false);

  return (
    <>
      {authUser && (
        <Template tabTitle={"strategy"}>
          { !showStrategies && (
            <CompanyTypePercentages
            setShowStrategies={setShowStrategies}
            ></CompanyTypePercentages>
            )
          }
          {showStrategies && <StrategyForm setShowStrategies={setShowStrategies}></StrategyForm>}
        </Template>
      )}
    </>
  );
}
