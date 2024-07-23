import { getDataSaved } from "./GetData";


export async function listenForDataStored(contract:any) {
  
    contract.events?.DataStored({ fromBlock: 'latest' })
      .on('data', async (event:any) => {
        console.log('DataStored event detected:', event.id);
        // Obtener el dato guardado del evento
        try {
           await  getDataSaved(contract)
          
        } catch (error) {
            throw new Error ("Error fetching data")
        }

      })
      ?.on('error', (error:any) => {
        console.error('Error listening for DataStored event', error);
      });
}