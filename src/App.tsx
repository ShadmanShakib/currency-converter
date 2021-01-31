import React, {useState, useEffect} from 'react'

function App() {
  const [loading, setLoading]=useState(true)
  const [rates, setRates]:any=useState({})
  const [currency, setCurrency]:any =useState([])
  const [inputVal,setInputVal]=useState(1)
  const [fromCurrency, setFormCurrency]=useState("CAD")
  const [toCurrency, setToCurrency]=useState('USD')
  const [value,setValue]=useState(1)

useEffect(()=>{
  fetch('https://api.exchangeratesapi.io/latest')
  .then(res=>res.json())
.then(data=>{
        setCurrency([data.base,...Object.keys(data.rates)]); 
        setRates({EUR:1,...data.rates})
        setLoading(false); 
})},[])
useEffect(()=>{
  if(!loading && inputVal>0){

    setValue((rates[toCurrency]/rates[fromCurrency])*inputVal)
  }
},[fromCurrency,toCurrency,rates,inputVal,loading])

return(
  <div className='flex flex-col justify-center items-center bg-yellow-200 min-h-screen '>
    
<div className='flex items-center'>
  <h3 className='text-xl font-semibold text-gray-700'>Input the amount:</h3>
 <input min='1'  className='bg-gray-100 ml-4 px-4 ring-2 ring-purple-800 focus:outline-none ring-offset-green-500 py-3 ' defaultValue='1' type='number' onChange={(e:any)=>setInputVal(e.target.value)} name='amount'/>
</div>
{inputVal<0?<div className='text-red-700'> can't put negative value</div>:null}
<div className='flex mt-4'>
  <h2 className='font-semibold text-gray-800'>From:</h2>
 <select className='ml-3' value={fromCurrency} onChange={(e:any)=>setFormCurrency(e.target.value)}>
{currency.map((x:any, index:any)=>{
  return(  
    <option key={index}>{x}</option>
  )})}
  </select> 
  </div>
  <div className='flex my-2'>
    <h2 className='font-semibold'>To:</h2>
  <select className='ml-8' value={toCurrency} onChange={(e:any)=>setToCurrency(e.target.value)}>
{currency.map((x:any, index:any)=>{
  return(  
    <option key={index}>{x}</option>
  )})}
  </select>
  </div>
  <div className='w-56 text-center text-3xl font-bold h-10 text-white bg-green-500 rounded-sm'>

  {value.toFixed(2)}
  </div>
  
  </div>
 
)
}

export default App;
