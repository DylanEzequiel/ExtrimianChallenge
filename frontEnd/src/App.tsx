import { useEffect, useState } from "react"
import { connectToContract } from "./utilss/functions/Conection"
import { storeData } from "./utilss/functions/SaveData"
import { listenForDataStored } from "./utilss/functions/ListenerData"



function App() {
  const [info, setInfo]=useState<string>("")

  const [wallet,setWallet]=useState<{contract:any,account:string}>({
    contract:"",
    account:""
  })

  const [savedInfo,setSavedInfo]=useState<any>("")
  console.log(`aqui guardo mis tesoros: ${savedInfo}`)
  function handleClick (){
    storeData({data:info, contract:wallet.contract,account:wallet.account })
  }

  function handleChange(e:any){
    setInfo(
      [e.target.name]=e.target.value
    )
  }
  
  useEffect(()=>{
    const load = async () => {
      const {contract,account} = await connectToContract()
      setWallet({contract,account})
    }
    load()
  },[])

  useEffect(()=>{
    const avivo = async () => {
      const data = await listenForDataStored(wallet.contract)
      setSavedInfo(data)
    }
    avivo() 
  },[wallet])
  

  return (
    <article className="">
      <div className='m-20'>
        <h1 className='font-semibold text-3xl text-white'>Guarda datos en
          <span> Blockchain</span>
        </h1>
      </div>
      <div className="m-20">
        <input onChange={handleChange} type="text" placeholder="Save On Blockchain" />
        <button onClick={handleClick} className="bg-white">=D</button>
      </div>
    </article>
  )
}

export default App
