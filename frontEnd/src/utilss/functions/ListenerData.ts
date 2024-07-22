import { getDataSaved } from "./GetData";


export async function listenForDataStored(contract:any) {
  
    contract.events?.DataStored({ fromBlock: 'latest' })
      .on('data', async (event:any) => {
        console.log('DataStored event detected:', event);
        // Obtener el dato guardado del evento
        try {
          const data = await  getDataSaved(contract)
          return data
        } catch (error) {
            throw new Error ("Error fetching data")
        }

      })
      ?.on('error', (error:any) => {
        console.error('Error listening for DataStored event', error);
      });
}