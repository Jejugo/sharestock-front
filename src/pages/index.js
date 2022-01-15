import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Steps from "../components/Steps";
import Layout from "../skeleton/layout";
import Fonts from "../components/Fonts";

import { stockShareAnalysis } from "../const/definitions";

const HowToStart = () => {
  const [steps, setSteps] = useState(stockShareAnalysis);
  const [count, setCount] = useState(0);

  useEffect(() => {
    Fonts();
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
      <section className="how-to-start">
        <Navbar />
        <Layout>
          <Steps
            steps={steps}
            count={count}
            handleCountNext={handleCountNext}
            handleCountPrev={handleCountPrev}
          ></Steps>
        </Layout>
      </section>
      <style jsx global>{`
        body,
        html {
          margin: 0px;
          color: white;
          background-color: #000000;
          font-family: "Baloo Bhaina 2", cursive;
          font-style: normal;
          font-display: swap;
          line-height: 22pt;
        }
      `}</style>
    </>
  );
};

export default HowToStart;
