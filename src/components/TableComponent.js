import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

export default function TableComponent({ rows, columns, page, rowsPerPage, setPage, setRowsPerPage}) {

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
    
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: 'black'}}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow >
							{columns.map((column) => (
								<TableCell sx={{ backgroundColor: '#3E3E3E', color: 'white'}}
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
											const recommendedValue = parseFloat(row['recommended'].split('%')[0]);
											const totalValue = parseFloat(row['total'].split('%')[0]);
											return (
												<TableCell key={column.id} align={column.align} sx={{ backgroundColor: '#1E1E1E', color: 'white'}}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: column.id === 'total' ? (
															<span>
																{
																	recommendedValue > totalValue ? (
																		<>
																			<NorthIcon style={{fontSize: 'medium', color: 'green'}}/>{value}
																		</>
																	) : (
																		<>
																			<SouthIcon style={{fontSize: 'medium', color: 'red'}}/>{value}
																		</>
																	)
																}
															</span>
														) : value}
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
				sx={{ backgroundColor: '#1E1E1E', color: 'white'}}
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
