import { useEffect, useState } from "react"
import { connectToContract } from "./utilss/functions/Conection"
import { storeData } from "./utilss/functions/SaveData"
import { listenForDataStored } from "./utilss/functions/ListenerData"
import Comp from "./components/Comp"
import { IoSend } from "react-icons/io5"
import { toast } from "react-toastify"
import useStore, { SwitchLoading } from "./storeZustand/Store"
import { ColorRing } from "react-loader-spinner"
import { GiCrossedChains } from "react-icons/gi"
import { SiBnbchain } from "react-icons/si"



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

  //Escucha a todos los cambios que hayan en la wallet para asi renderizarlos si se retorna un dato, si en main.tsx esta descomentado el react.strictmode se ejecutara dos veces y obtendra la informacion repetidamente
  useEffect(()=>{
    const avivo = async () => {
      try {
        listenForDataStored(wallet.contract)
    } catch (error) {
        console.log(error)
    }
    }
    avivo() 
  },[wallet.contract])
  

  return (
    <article className="flex flex-col justify-center h-full">
      <div className='m-auto w-3/5'>
        <div className="relative">
          {/* <h3 className="fixed drop-shadow-[0_1.2px_1.2px_rgba(202, font-bold text-5xl text-center text-white 0.8)] 68, 68,">Guarda Datos En Blockchain</h3> */}
          <h1 className='font-bold font-mono text-5xl text-center text-purple-700 underline'>
            <span className="text-white"> Guarda datos en 
              <b className="p-2">
            <SiBnbchain  className="inline" />
                Blockchain 
              </b>
            </span>
          </h1>
        </div>
        <div className="flex flex-row flex-wrap justify-center bg-gray-700 shadow-slate-400 shadow-sm m-auto my-20 p-2 rounded-md min-w-80 max-w-3xl h-20 text-center">
          <input onChange={handleChange} type="text" placeholder={`Tu dato`} 
          className="border-gray-300 focus:border-purple-400 m-auto p-1 placeholder:p-1 border-b-4 focus:outline-none border-solid rounded-sm w-10/12 h-12 placeholder:font-semibold placeholder:text-lg"/>

          <button onClick={handleClick} className="flex justify-center items-center bg-white m-auto p-2 rounded-md transform transition-transform duration-200 hover:scale-105 w-1/12 h-12 max-h-max active:outline-gray-400 text-lg sm:text-xl active:outline active:outline-2"
          disabled={Loading}>
            {Loading?
            <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="color-ring-loading"
            wrapperClass="color-ring-wrapper"
            colors={['#108de0', '#0b93c9', '#2802ff', '#570bbb', '#3a025f']}
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
