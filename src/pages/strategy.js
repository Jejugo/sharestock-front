import React, { useState, useEffect } from 'react'
import Fonts from "../components/Fonts";
import Template from "../components/Template";
import StrategyForm from "../components/StrategyForm";
import CompanyTypePercentages from "../components/CompanyTypePercentages";

export default function strategy() {
    useEffect(() => {
        Fonts();
      }, []);

    const [showStrategies, setShowStrategies] = useState(false);

    const handleShowStrategies = (show) => setShowStrategies(show);
    
    return (
        <Template tabTitle={"strategy"}>
            <CompanyTypePercentages handleShowStrategies={handleShowStrategies}></CompanyTypePercentages>
            {
                showStrategies && <StrategyForm></StrategyForm>
            }
        </Template>
    )
};
