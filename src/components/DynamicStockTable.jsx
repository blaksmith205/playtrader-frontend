import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { builder } from "@builder.io/react";
import { DataGrid, GridEditInputCell} from '@mui/x-data-grid';
import { getAuth } from 'firebase/auth';
import { getFirestore, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';

const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const calcTotal = (price, amount) => {
    return round(price * amount, 2);
}

const DynamicStockTable = ({startValue}) => {

    const [pageModel, setPageModel] = useState({page:0, pageSize:10});

    const [stocks, setStocks] = useState([]);
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);
    const [startAmount] = useState(startValue ? startValue : 10000);
    const [user] = useState(getAuth().currentUser);
    const docRef = doc(getFirestore(), 'stocks', user.uid);


    const makeRow = (response, index, bought) => {
        const q = response.data.results[0];
        const obj = stocks.find(({ticker}) => ticker.toUpperCase() === q.T);
        const ret = {company: obj?.companyName, ticker: q.T, price: bought ? bought.price : q.c, amount: bought ? bought.amount : 0, id:index, key:index};
        return ret;
    }

    const columns = [
        { field: 'company', headerName: 'Company Name', flex: 1 },
        { field: 'ticker', headerName: 'Ticker', flex: 1 },
        { field: 'price', headerName: 'Current Price', flex: 1, type: 'number' },
        {
        field: 'amount',
        headerName: '# of Shares',
        type: 'number',
        flex: 1,
        editable: true,
        renderEditCell: (params) => (
            <GridEditInputCell
            {...params}
            inputProps={{

                min: 0,
            }}
            />
        ),
        },
        {
        field: 'total',
        headerName: `Total Price ($${total})`,
        description: 'The total price of the stocks',
        sortable: false,
        flex: 1,
        valueGetter: (params) =>
            `$${calcTotal(params.row.price, params.row.amount)}`,
        },
    ]; 

    const handleRowUpdate = (updatedRow, originalRow) => {
        // Find the index of the row that was edited
        const rowIndex = rows.findIndex((row) => row.id === updatedRow.id);

        // Replace the old row with the updated row
        const updatedRows = [...rows];
        updatedRows[rowIndex] = updatedRow;

        // Update the state with the new rows
        setRows(updatedRows);

        // Return the updated row to update the internal state of the DataGrid
        return updatedRow;
    }

    useEffect(() => {
        async function fetchStocks() {
            // Obtain the links from builder.io once
            const data = await builder.getAll("stocks", {});
            let vals = []
            data.forEach((elem) => {
                vals.push(...elem.data.stocks);
            });
            setStocks(vals);
        }
        fetchStocks();
    }, []);

    useEffect(() => {
        async function fetchStockData (ticker) {
            return axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker.toUpperCase()}/prev?adjusted=true&apiKey=63bfjVzpHfxgOnOuhwctRgDJMUVsFPMV`)
                .catch(console.error);
        };

        Promise.all(stocks.map((stock) => (
            fetchStockData(stock.ticker)
        )))
        .then((val) => {
            // Get connection with the database.
            getDoc(docRef).then((res) => {
                if (res.exists()) {
                    setRows(val.map((resp, index) => {
                        var boughtIndex = res.data().bought.findIndex((row) => (row.id===index));
                        return makeRow(resp, index, boughtIndex > -1 && res.data().bought[boughtIndex]);
                    }));
                } else {
                    setRows(val.map((resp, index) => {
                        return makeRow(resp, index);
                    }));
                }
            });
        })
        .catch(console.error);
    }, [stocks])

    useEffect(() => {
        var total = 0;
        var toSave = [];
        rows.forEach((row) => {
            if (row.amount > 0) {
                // Update the total
                total += row.price * row.amount;
                // Save the row
                toSave.push(row)
            }
        });
        setTotal(round(total, 2));
        if (toSave.length > 0) {
            updateDoc(docRef, {
                bought: toSave
            });
        }
    }, [rows]);

    return (
        <div style={{ height: '640px', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                editMode='row'
                disableSelectionOnClick
                processRowUpdate={handleRowUpdate}
                onPaginationModelChange={(model) => setPageModel(model)}
                paginationModel={pageModel}
                pageSizeOptions={[5, 10, 15, 30]}
            />
        </div>
    );
}

export default DynamicStockTable;