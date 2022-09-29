import React, { useEffect } from 'react';
import Switch from 'react-switch';
import { useAuth } from '../../context/AuthUserContext';
import Firestore from '../../firebase/Firestore';
import * as S from './styles';

export default function StockCheckList({
  statements,
  setStatements,
  handleStatementCheck,
  assetValue,
  assetsToInvest = null,
}) {
  const { authUser } = useAuth();

  // const filterAssetStatements = assetStatements => {
  //   const statementsArray = statements.map(statement => statement.statement);
  //   const weightArray = statements.map(statement => statement.weight);
  //   const filteredAssets1 = assetStatements.map((statement, index) => {
  //     if (statementsArray.includes(statement.statement)) {
  //       return {
  //         ...statement,
  //         weight: weightArray[index],
  //       };
  //     }
  //     return null;
  //   });
  //   return filteredAssets1.filter(a => a);
  // };

  const updatedStrategyStatements = async () => {
    let updatedStrategyStatements = await Firestore().getAllItems({
      collection: 'userStrategyStatements',
      id: authUser.uid,
    });
    updatedStrategyStatements = Object.keys(updatedStrategyStatements).map(
      key => updatedStrategyStatements[key],
    );

    return updatedStrategyStatements;
  };

  const checkAgainstStrategyStatements = (
    assetStatements,
    updatedStatements,
  ) => {
    const removedAssets = assetStatements.filter(assetStatement =>
      updatedStatements.find(
        updatedStatement =>
          updatedStatement.statement === assetStatement.statement &&
          updatedStatement.weight === assetStatement.weight,
      ),
    );

    const addedAssets = updatedStatements.filter(
      updatedStatement =>
        !assetStatements.find(
          assetStatement =>
            updatedStatement.statement === assetStatement.statement &&
            updatedStatement.weight === assetStatement.weight,
        ),
    );

    return {
      addedAssets,
      removedAssets,
    };
  };

  useEffect(async () => {
    if (assetValue) {
      const assetListStatements = await Firestore().getAllItems({
        collection: 'userAssetStatements',
        id: authUser.uid,
      });

      const updatedStatements = await updatedStrategyStatements();

      // if (assetsToInvest && assetsToInvest.hasOwnProperty(assetValue)) {
      //   assetsStatementsFiltered = filterAssetStatements(
      //     assetsToInvest[assetValue],
      //   );
      //   for (let { statement } of statements) {
      //     for (let assetStatement of assetsStatementsFiltered) {
      //       if (assetStatement.statement === statement) {
      //         sameStatements.push(statement);
      //       }
      //     }
      //   }

      //   const filteredStatements = statements.filter(
      //     statement => !sameStatements.includes(statement.statement),
      //   );
      //   setStatements([...assetsStatementsFiltered, ...filteredStatements]);
      // }

      if (assetValue in assetListStatements) {
        const assetStatements = assetListStatements[assetValue];

        const { addedAssets, removedAssets } = checkAgainstStrategyStatements(
          assetStatements,
          updatedStatements,
        );

        setStatements([...removedAssets, ...addedAssets]);
      } else {
        setStatements([...updatedStatements]);
      }
    }
  }, [assetValue]);

  return (
    <section>
      <S.StockCheckList>
        {statements.length &&
          statements.map(({ statement, checked }, index) => (
            <S.StockCheckListItem>
              <S.CheckListItemWrapper>
                <p>{statement}</p>
                <Switch
                  onChange={e => handleStatementCheck(e, index)}
                  checked={checked}
                  disabled={!assetValue}
                />
              </S.CheckListItemWrapper>
            </S.StockCheckListItem>
          ))}
      </S.StockCheckList>
    </section>
  );
}
