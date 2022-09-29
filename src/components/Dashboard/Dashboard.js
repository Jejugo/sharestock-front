import React, { useState, useEffect } from 'react';
import PieChart from '../charts/PieChart';
import Firestore from '../../firebase/Firestore';
import calculateAssetPercentages from '../../builders/calculateAssetPercentages';
import TableComponent from '../TableComponent';
import * as S from './styles.js';

import { useAuth } from '../../context/AuthUserContext';

const columnsMock = [
  { id: 'asset', label: 'Ação', minWidth: 170 },
  { id: 'recommended', label: 'Recomendado %', minWidth: 100 },
  {
    id: 'currentValue',
    label: 'Valor Atual',
    minWidth: 100,
    align: 'right',
    format: value => `R$${value.toLocaleString('pt-BR')}`,
  },
  {
    id: 'grade',
    label: 'Nota',
    minWidth: 100,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'total',
    label: 'Total %',
    minWidth: 100,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'quantity',
    label: 'Quantidade',
    minWidth: 100,
    align: 'right',
    format: value => value,
  },
];

export default function DashboardComponent() {
  const { authUser } = useAuth();

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(async () => {
    if (authUser) {
      const [userAssets, userAssetStatements] = await Promise.all([
        await Firestore().getAllItems({
          collection: 'userAssets',
          id: authUser.uid,
        }),
        await Firestore().getAllItems({
          collection: 'userAssetStatements',
          id: authUser.uid,
        }),
      ]);

      if (Object.keys(userAssetStatements).length) {
        const assetPoints = Object.keys(userAssetStatements).reduce(
          (acc, assetKey) => ({
            ...acc,
            [assetKey]: userAssetStatements[assetKey].reduce(
              (acc, statement) => {
                if (statement.checked) return acc + 1 * statement.weight;
                if (!statement.checked) return acc + -1 * statement.weight;
              },
              0,
            ),
          }),
          {},
        );

        let assetRecommendedPercentages =
          calculateAssetPercentages(assetPoints);
        assetRecommendedPercentages = assetRecommendedPercentages.reduce(
          (acc, curr) => ({ ...acc, [curr.name]: curr }),
          {},
        );

        const totalQuantity = Object.keys(userAssets)
          .map(item => userAssets[item])
          .reduce((acc, curr) => acc + parseInt(curr.quantity), 0);

        let tableData = Object.keys(userAssets).map(item => ({
          asset: userAssets[item]['nome'],
          recommended: assetRecommendedPercentages[item].percentage,
          currentValue:
            userAssets[item]['quantity'] * userAssets[item]['Cotação'],
          grade: assetPoints[item],
          total: `${(
            (userAssets[item]['quantity'] / totalQuantity) *
            100
          ).toFixed(2)}%`,
          quantity: userAssets[item]['quantity'],
        }));

        setRows(tableData);
        setColumns(columnsMock);
      }
    }
  }, []);

  return (
    <>
      <S.DashboardWrapper>
        <S.PieChartWrapper>
          <PieChart />
        </S.PieChartWrapper>
        <S.PieChartWrapper>
          <PieChart />
        </S.PieChartWrapper>
      </S.DashboardWrapper>
      <S.WalletAssets>
        <TableComponent
          rows={rows}
          columns={columns}
          page={page}
          rowsPerPage={rowsPerPage}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        ></TableComponent>
      </S.WalletAssets>
    </>
  );
}
