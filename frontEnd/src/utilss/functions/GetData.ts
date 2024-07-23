import  { addInfoToStore } from "../../storeZustand/Store";

export async function getDataSaved(contract:any) {
  try {
      const data = await contract.methods.retrieveData().call();
      addInfoToStore(data)
    } catch (error) {
      console.error("Error fetching data from contract", error);
      throw error; // Opcional: Puedes lanzar el error para manejarlo en el componente
    }
  }