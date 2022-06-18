import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Steps from "../components/Steps";
import TextLayout from "../skeleton/TextLayout";
import Fonts from "../components/Fonts";
import Router from 'next/router'
import { useAuth } from '../context/AuthUserContext'

import { stockShareAnalysis } from "../const/definitions";

const HowToStart = () => {
  const [steps, setSteps] = useState(stockShareAnalysis);
  const [count, setCount] = useState(0);

  const { authUser } = useAuth()

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const redirectIfUserNotLoggedIn = async () => {
    const router = Router;
    await sleep(2000)
    if(!authUser) router.push('/login')
  }

  useEffect(async () => {
    Fonts();
    // await redirectIfUserNotLoggedIn();
  }, []);

  const handleCountNext = () => {
    if (count < steps.length - 1)
      setCount((previousState) => previousState + 1);
  };

  const handleCountPrev = () => {
    if (count > 0) setCount((previousState) => previousState - 1);
  };

  return (
    <>
    {
      authUser && (
        <>
        <section className="how-to-start">
          <Navbar />
          <TextLayout>npm 
            <Steps
              steps={steps}
              count={count}
              handleCountNext={handleCountNext}
              handleCountPrev={handleCountPrev}
            ></Steps>
          </TextLayout>
      </section>
      <style jsx global>{`
        body,
        html {
          margin: 0px;
          color: #eee;
          background-color: #000000;
          font-family: "Baloo Bhaina 2", cursive;
          font-style: normal;
          font-display: swap;
          line-height: 22pt;
        }
      `}</style>
      </>
      )
    }
    </>
  );
};

export default HowToStart;
