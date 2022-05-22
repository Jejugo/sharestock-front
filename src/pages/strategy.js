import React, { useEffect } from 'react'
import Fonts from "../components/Fonts";
import Template from "../components/Template";
import Navbar from "../components/Navbar";

export default function strategy() {
    useEffect(() => {
        Fonts()
      }, [])

    return (
        <Template tabTitle={"strategy"}>
            <Navbar></Navbar>
            <div>Bla</div>
        </Template>
    )
}
