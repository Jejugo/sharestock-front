import React, { useState, useEffect } from "react";
import Template from "../skeleton/Template";
import AssetsTable from '../components/AssetsTable';
import config from "../configs";
import AddAssets from '../components/AddAssets';

import { useAuth } from "../context/AuthUserContext";
const { SHARE_API } = config;

const MyAssets = (props) => {
  const { authUser } = useAuth();
  const [showAddAsset, setShowAddAsset] = useState(false)

  const handleAddAsset = () => {
    setShowAddAsset((previousState) => !previousState)
  }
  
  return (
    <>
      <Template tabTitle={"My Assets"}>
        <div className="my-assets">
          <h1 className="my-assets__title">Meus Ativos</h1>
          <button className="my-assets__button" onClick={handleAddAsset}>Adicionar Ativo</button>
        </div>
        {
          !showAddAsset && authUser ? (
            <AssetsTable shares={props.shares} sharesMap={props.sharesMap}></AssetsTable>
          ) : (
            <AddAssets shares={props.shares} sharesMap={props.sharesMap} setShowAddAsset={setShowAddAsset}></AddAssets>
          )
        }
        <style>{`
          .my-assets{
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .my-assets__button{
            padding: 0px 30px;
            background-color: #FFCD00;
            cursor: pointer;
            border: none;
            border-radius: 5px;
          }
        `}</style>
      </Template>
    </>
  );
}
  
  export async function getServerSideProps() {
    let data = await fetch(`${SHARE_API}/shares/all`);
    const { items: sharesItems } = await data.json();
  
    const sharesMap = sharesItems.reduce((acc, curr) => ({
      ...acc,
      [curr["Papel"].toLowerCase()]: curr
    }))
    
    return {
      props: {
        shares: sharesItems,
        sharesMap
      },
    };
  }
  
  export default MyAssets;