import { getDataSaved } from "./GetData";

export async function listenForDataStored(contract:any) {
  
    contract.events?.DataStored({ fromBlock: 'latest' })
      .on('data', async (event:any) => {
        console.log('DataStored event detected:', event);
        // Obtener el dato guardado del evento
        const data = await  getDataSaved(contract)
        return data

      })
      ?.on('error', (error:any) => {
        console.error('Error listening for DataStored event', error);
      });
}