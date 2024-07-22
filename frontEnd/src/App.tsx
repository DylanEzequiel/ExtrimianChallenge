import { useEffect, useState } from "react"
import { connectToContract } from "./utilss/functions/Conection"
import { storeData } from "./utilss/functions/SaveData"
import { listenForDataStored } from "./utilss/functions/ListenerData"
import Comp from "./components/Comp"
import { IoSend } from "react-icons/io5"
import { toast } from "react-toastify"
import useStore, { SwitchLoading } from "./storeZustand/Store"
import { ColorRing } from "react-loader-spinner"



function App() {
  const [info, setInfo]=useState<string>("")
  const {Loading}=useStore()
  const [wallet,setWallet]=useState<{contract:any,account:string}>({
    contract:"",
    account:""
  })

//ejecuta la funcion del  strore para enviar el dato y procesar el pago
  function handleClick (){
    SwitchLoading()
    storeData({data:info, contract:wallet.contract,account:wallet.account })
    toast.info("Procesando el pago",{delay:120})
  }


//almacena los cambios del imput para enviarlos
  function handleChange(e:any){
    setInfo(
      [e.target.name]=e.target.value
    )
  }
  
//Se ejecuta para conectarse a la wallet una vez se carga la pagina
  useEffect(()=>{
    const load = async () => {
      const {contract,account} = await connectToContract()
      setWallet({contract,account})
    }
    load()
    toast.info("Se a conectado a tu wallet")

  },[])

  //Escucha a todos los cambios que hayan en la wallet para asi renderizarlos si se retorna un dato
  useEffect(()=>{
    const avivo = async () => {
      try {
        listenForDataStored(wallet.contract)
    } catch (error) {
        console.log(error)
    }
    }
    avivo() 
  },[wallet])
  

  return (
    <article className="flex flex-col justify-center h-full">
      <div className='m-auto w-3/5'>
        <h1 className='font-semibold text-4xl text-center text-white underline'>Guarda datos en Blockchain
        </h1>
        <div className="flex flex-row flex-wrap justify-center my-20 text-center">
          <input onChange={handleChange} type="text" placeholder="Tu dato" 
          className="shadow-lime-300 shadow-sm p-1 placeholder:p-1 rounded-sm w-3/4 h-8 outline-1 focus:outline-slate-600"/>

          <button onClick={handleClick} className="flex justify-center items-center bg-white shadow-lime-300 shadow-sm mx-4 p-2 rounded-sm h-8 max-h-max active:outline-slate-600 text-lg outline"
          disabled={Loading}>
            {Loading?
            <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
            :
            <IoSend size={20}/>
          }
            </button>
        </div>
        <Comp />
      </div>
    </article>
  )
}

export default App
