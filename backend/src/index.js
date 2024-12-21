const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app= express();

// middlewares
app.use(express.json());
app.use(cors());

app.get("/getAllCurrencies", async(req,res)=>{
    const namesURL = "https://openexchangerates.org/api/currencies.json?app_id=94d89d1c3d754d039a4dc3bd639b1c10";

    

    try{const namesResponce = await axios.get(namesURL);
        const nameData = namesResponce.data;
    
        return res.json(nameData);}catch(err){console.error(err);}
})

app.get("/convert", async(req,res)=>{
    const{date, sourceCurrency, targetCurrency, amountInSourceCurrency} = req.query;

    try{
        const dataurl = `
https://openexchangerates.org/api/historical/${date}.json?app_id=94d89d1c3d754d039a4dc3bd639b1c10`;

        const dataResponce = await axios.get(dataurl);
        const rates = dataResponce.data.rates;

        const sourceRate = rates[sourceCurrency];
        const targetRate = rates[targetCurrency];

        const targetAmount = (targetRate/sourceRate)* amountInSourceCurrency;

        return res.json(targetAmount.toFixed(2));


    }catch(err){
        console.log(err);
        
    }
})

app.listen(5000, ()=>{
    console.log("server running on port 5000");
    
})

