import React  from 'react'
import useStore from '../storeZustand/Store'
import { LuFileCode2 } from "react-icons/lu"

function Comp():React.ReactElement {
    // Estado general el cual es renderizado
    const {DataBlockchain}=useStore()

    console.log(DataBlockchain)

    return (
    <div>
        <h3 className='border-white font-mono font-semibold text-3xl text-center text-white'>Datos Recuperados</h3>
        <div className='flex flex-col border-white p-4 border h-96 overflow-x-auto'>

            <ul className='flex flex-row flex-wrap justify-start p-4'>
                {DataBlockchain.map((name,index)=>{
                    return <li key={index}
                    className='justify-center bg-slate-900 shadow-md shadow-purple-500 m-2 p-2 min-w-20 min-h-min text-center text-white transform transition-transform duration-200 hover:scale-105 overflow-hidden select-none outline outline-2 outline-purple-900'>
                        <LuFileCode2 size={25} className='inline text-white'/>
                    <b className='inline'> {name} </b> 
                    </li>
                })}
            </ul> 
        </div>
    </div>
  )
}

export default Comp
