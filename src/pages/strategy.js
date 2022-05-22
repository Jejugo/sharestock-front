import React, { useEffect } from 'react'
import Fonts from "../components/Fonts";
import Template from "../components/Template";
import Navbar from "../components/Navbar";
import StrategyForm from "../components/StrategyForm"

export default function strategy() {
    useEffect(() => {
        Fonts()
      }, [])

    return (
        <Template tabTitle={"strategy"}>
            <Navbar></Navbar>
            <StrategyForm></StrategyForm>
        </Template>
    )
}
