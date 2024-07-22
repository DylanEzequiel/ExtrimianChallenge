import  { addInfoToStore } from "../../storeZustand/Store";

export async function getDataSaved(contract:any) {
  console.log("start")
    console.log("paso")
  try {
      const data = await contract.methods.retrieveData().call();
      console.log("Data from contract:", data);
      addInfoToStore(data)
      return data;
    } catch (error) {
      console.error("Error fetching data from contract", error);
      throw error; // Opcional: Puedes lanzar el error para manejarlo en el componente
    }
  }