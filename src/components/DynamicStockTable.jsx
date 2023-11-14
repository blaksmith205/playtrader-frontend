import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { builder } from "@builder.io/react";
import { DataGrid } from '@mui/x-data-grid';

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
    },
    {
      field: 'total',
      headerName: 'Total Price',
      description: 'The total price of the stocks',
      sortable: false,
      flex: 1,
      valueGetter: (params) =>
        `$ ${params.row.price * params.row.amount}`,
    },
  ];

const DynamicStockTable = () => {

    const sortOn = (array, key) => {
        array.sort(function(a, b){
            if(a[key] < b[key]){
                return -1;
            }else if(a[key] > b[key]){
                return 1;
            }
            return 0;
        });
    }

    const [stocks, setStocks] = useState([]);
    const [rows, setRows] = useState([]);

    const makeRow = (response, index) => {
        const q = response.data.results[0];
        const obj = stocks.find(({ticker}) => ticker.toUpperCase() === q.T);
        const ret = {company: obj?.companyName, ticker: q.T, price: q.c, amount:0, id:index};
        return ret;
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
            setRows(val.map((resp, index) => (makeRow(resp, index))));
            sortOn(rows, "ticker");
        })
        .catch(console.error);
    }, [stocks, rows])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                checkboxSelection
            />
        </div>
    );
}

export default DynamicStockTable;