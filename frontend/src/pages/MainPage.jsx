import React,{useEffect, useState} from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios"

function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const responce = await axios.get("http://localhost:5000/convert",{
        params:{
          date, sourceCurrency, targetCurrency, amountInSourceCurrency,
        }
      })

      setAmountInTargetCurrency(responce.data);
      setLoading(false);

    }catch(err)
    { console.log(err);
    }    
  }

  useEffect(()=>{
    const getCurrencyNames =async ()=>{
      try{

        const responce = await axios.get("http://localhost:5000/getAllCurrencies")
        setCurrencyNames(responce.data);
      }catch(err){
        console.error(err);
      }
    }; getCurrencyNames();
    
  },[])

  return (
    <div>
      <div>
        <h1 className="lg:mx-32 text-6xl font-bold text-blue-800">
          Convert Your Currencies
        </h1>
        <p className="lg:mx-32 opacity-40 py-6">
          Welcome to "Convert Your Currencies" This application allows you to
          Convert currencies based on the latest exchange rates
        </p>
      </div>
      <div className="mt-4 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}  className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 mt-2 block">
                <Label
                  className="block mb-2 text-sm font-medium text-yellow-50 dark:text-white"
                  htmlFor={date}
                  value="Date"
                />
              </div>
              <TextInput
              onChange={(e)=> setDate(e.target.value)}
                style={{ backgroundColor: "#444444" , color:"#dddddd"}} // blue color
                className=" border border-gray-900  text-sm rounded-lg block w-full "
                id={date}
                type="date"
                name={date}
                placeholder=""
                required
              />
            </div>

            <div>
              <div className="mb-2 mt-2 block">
                <Label
                  className="block mb-2 text-sm font-medium text-yellow-50 dark:text-white"
                  htmlFor={sourceCurrency}
                  value="Source Currency"
                />
              </div>
             <select onChange={(e)=> setSourceCurrency(e.target.value)} style={{ backgroundColor: "#444444" }} // blue color
                className=" border border-gray-900 text-gray-300 text-sm rounded-lg block w-full " name={sourceCurrency} id={sourceCurrency}>
              <option value={sourceCurrency}>Select source Currency </option>
              {Object.keys(currencyNames).map((currency)=>(
                <option className="p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
             </select>
            </div>

            <div>
              <div className="mb-2 mt-2 block">
                <Label
                  className="block mb-2 text-sm font-medium text-yellow-50 dark:text-white"
                  htmlFor={targetCurrency}
                  value="Target Currency"
                />
              </div>
             <select onChange={(e)=> setTargetCurrency(e.target.value)} style={{ backgroundColor: "#444444" }} // blue color
                className=" border border-gray-900 text-gray-300 text-sm rounded-lg block w-full " name={targetCurrency} id={targetCurrency}>
              <option value={targetCurrency}>Select Target Currency </option>
              {Object.keys(currencyNames).map((currency)=>(
                <option className="p-1" key={currency} value={currency}>
                  {currencyNames[currency]}
                </option>
              ))}
             </select>
            </div>

            <div>
              <div className="mb-2 mt-2 block">
                <Label
                  className="block mb-2 text-sm font-medium text-yellow-50 dark:text-white"
                  htmlFor={amountInSourceCurrency}
                  value="Amount in source currency"
                />
              </div>
              <TextInput onChange={(e)=> setAmountInSourceCurrency(e.target.value)}
                style={{ backgroundColor: "#444444", color:"#dddddd"}} // blue color
                className=" border border-gray-900  text-sm rounded-lg block w-full placeholder:text-gray-300"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                value={amountInSourceCurrency}
                type="text"
                placeholder="Amount in source currency"
                required
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-800 text-white font-m py-2 px-4 rounded-md">Get the target currency</button>
          </form>
        </section>
      </div>
      {!loading ? (
         <section className="lg:mx-72  mt-5">
         {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to{" "}
         <span className="text-blue-500 font-bold">{amountInTargetCurrency}</span> {currencyNames[targetCurrency]}
         </section>
      ):(null)}
     
    </div>
    
  );
}

export default MainPage;
