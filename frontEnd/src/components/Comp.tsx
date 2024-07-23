import React  from 'react'
import useStore from '../storeZustand/Store'
import { LuFileCode2 } from "react-icons/lu"

function Comp():React.ReactElement {
    // Estado general el cual es renderizado
    const {DataBlockchain}=useStore()

    console.log(DataBlockchain)

    return (
    <div>
        <h3 className='border-white font-semibold text-center text-white text-xl'>Info Recuperada</h3>
        <div className='flex flex-col border-white p-4 border h-96 overflow-x-auto'>

            <ul className='flex flex-row flex-wrap justify-start p-4'>
                {DataBlockchain.map((name,index)=>{
                    return <li key={index}
                    className='justify-center shadow-md shadow-purple-500 m-2 p-2 min-w-20 min-h-min text-center text-white transform transition-transform duration-200 hover:scale-105 overflow-hidden select-none outline outline-2 outline-purple-900'>
                        <LuFileCode2 className='inline text-white'/>
                    <b className='inline'> {name} </b> 
                    </li>
                })}
            </ul> 
        </div>
    </div>
  )
}

export default Comp
