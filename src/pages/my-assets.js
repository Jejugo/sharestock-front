import React, { useState, useEffect } from "react";
import Template from "../skeleton/Template";
import AssetsTable from '../components/AssetsTable';
import config from "../configs";
import AddAssets from '../components/AddAssets';

const { SHARE_API } = config;

const MyAssets = (props) => {
  const [shares, setShares] = useState([])
  const [showAddAsset, setShowAddAsset] = useState(false)

  const handleAddAsset = () => {
    setShowAddAsset((previousState) => !previousState)
  }

  useEffect(() => {
    const { shares } = props;
    setShares(shares);
  })
  return (
    <>
      <Template tabTitle={"My Assets"}>
        <div className="my-assets">
          <h1 className="my-assets__title">Meus Ativos</h1>
          <button className="my-assets__button" onClick={handleAddAsset}>Adicionar Ativo</button>
        </div>
        {
          !showAddAsset ? (
            <AssetsTable shares={shares}></AssetsTable>
          ) : (
            <AddAssets shares={shares} setShowAddAsset={setShowAddAsset}></AddAssets>
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
    let shares = await fetch(`${SHARE_API}/shares/all`);
    const sharesItems = await shares.json();
  
    return {
      props: {
        shares: sharesItems
      },
    };
  }
  
  export default MyAssets;