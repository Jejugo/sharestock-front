import React from 'react'
import { useAuth } from "../context/AuthUserContext";
import CompanyTypePercentages from "../components/CompanyTypePercentages";
import Template from "../skeleton/Template";

export default function Goals() {
    const { authUser } = useAuth();
    return (
        <section>
            {authUser && (
            <Template tabTitle={"strategy"}>
                <CompanyTypePercentages
                ></CompanyTypePercentages>
            </Template>
            )}
        </section>
    )
}
