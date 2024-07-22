import React  from 'react'
import useStore from '../storeZustand/Store'

function Comp():React.ReactElement {
    // Estado general el cual es renderizado
    const {DataBlockchain}=useStore()

    

    return (
    <div className='flex flex-col justify-center'>
        <h3 className='border-white font-semibold text-center text-white text-xl'>Info Recuperada</h3>
        <ul className='flex flex-row flex-wrap justify-center'>
            {DataBlockchain.map((name,index)=>{
                return <li key={index}
                className='justify-center bg-white m-2 p-2 rounded-sm min-w-20 outline outline-2 outline-gray-400'>
                   <b> {name} </b> 
                </li>
            })}
        </ul> 
    </div>
  )
}

export default Comp