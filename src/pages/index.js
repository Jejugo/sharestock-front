import React, { useEffect, useState } from 'react';
import Template from '../skeleton/Template/Template';
import Steps from '../components/Steps/Steps';
import TextLayout from '../skeleton/TextLayout/TextLayout';
import Fonts from '../components/Fonts';

import { stockShareAnalysis } from '../const/definitions';

const HowToStart = () => {
  const [steps] = useState(stockShareAnalysis);
  const [count, setCount] = useState(0);

  useEffect(async () => {
    Fonts();
  }, []);

  const handleCountNext = () => {
    if (count < steps.length - 1) setCount(previousState => previousState + 1);
  };

  const handleCountPrev = () => {
    if (count > 0) setCount(previousState => previousState - 1);
  };

  return (
    <>
      <Template tabTitle={'strategy'}>
        <TextLayout>
          <Steps
            steps={steps}
            count={count}
            handleCountNext={handleCountNext}
            handleCountPrev={handleCountPrev}
          ></Steps>
        </TextLayout>
      </Template>
    </>
  );
};

export default HowToStart;
