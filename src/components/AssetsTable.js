import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useAuth } from "../context/AuthUserContext";
import Firestore from "../firebase/Firestore";
import calculateAssetPercentages from '../builders/calculateAssetPercentages';

const columnsMock = [
    { id: 'asset', label: 'Ação', minWidth: 170 },
    { id: 'recommended', label: 'Recomendado %', minWidth: 100 },
    {
      id: 'currentValue',
      label: 'Valor Atual',
      minWidth: 100,
      align: 'right',
      format: (value) => `R$${value.toLocaleString('pt-BR')}`,
    },
    {
      id: 'grade',
      label: 'Nota',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'total',
      label: 'Total %',
      minWidth: 100,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
    {
      id: 'quantity',
      label: 'Quantidade',
      minWidth: 100,
      align: 'right',
      format: (value) => value,
    },
  ];

export default function AssetsTable() {
    const { authUser } = useAuth();
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


  useEffect(async () => {
    if(authUser){
      const data = await Firestore().getAllItems({ collection: 'userAssetStatements', id: authUser.uid})
      const result = Object.keys(data).reduce((acc, assetKey) => ({
        ...acc,
        [assetKey]: data[assetKey].reduce((acc, statement) => {
          if(statement.checked) return acc + (1 * statement.weight)
          if(!statement.checked) return acc + (-1 * statement.weight)
        }, 0)
      }), {})

      console.log(result)
    }
    
    
  }, [authUser])

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(async () => {
      if(authUser){
        const [userAssets, userAssetStatements] = await Promise.all([
          await Firestore().getAllItems({
          collection: "userAssets",
          id: authUser.uid,
        }), await Firestore().getAllItems({
          collection: "userAssetStatements",
          id: authUser.uid,
        })]);

        if(Object.keys(userAssetStatements).length){
          const assetPoints = Object.keys(userAssetStatements).reduce((acc, assetKey) => ({
            ...acc,
            [assetKey]: userAssetStatements[assetKey].reduce((acc, statement) => {
              if(statement.checked) return acc + (1 * statement.weight)
              if(!statement.checked) return acc + (-1 * statement.weight)
            }, 0)
          }), {})
  
          let assetRecommendedPercentages = calculateAssetPercentages(assetPoints)
          assetRecommendedPercentages = assetRecommendedPercentages.reduce((acc, curr) => ({...acc, [curr.name]: curr}), {})
  
          const totalQuantity = Object.keys(userAssets).map(item => userAssets[item]).reduce((acc, curr) => acc + parseInt(curr.quantity), 0)
      
          let tableData = Object.keys(userAssets).map(item => ({
            asset: userAssets[item]["nome"], 
            recommended: assetRecommendedPercentages[item].percentage,
            currentValue: userAssets[item]["quantity"] * userAssets[item]["cotação"], 
            grade: assetPoints[item], 
            total: `${((userAssets[item]["quantity"] / totalQuantity)*100).toFixed(2)}%`, 
            quantity: userAssets[item]["quantity"]
          }));
  
          console.log(tableData)
  
          setRows(tableData)
          setColumns(columnsMock)
  
        }
      }
    }, [])
  
    return (
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
}
