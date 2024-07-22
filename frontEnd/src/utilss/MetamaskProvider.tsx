import React from 'react'
import { MetaMaskProvider } from '@metamask/sdk-react'


function MetamaskProvider({children}:any):React.ReactElement {
  return (
    <>
        <MetaMaskProvider
        debug={true}
        sdkOptions={{
            dappMetadata:{
                name:"Testing App",
                url:"",
            }
        }}
        >
            {children}
        </MetaMaskProvider>
    </>
  )
}

export default MetamaskProvider