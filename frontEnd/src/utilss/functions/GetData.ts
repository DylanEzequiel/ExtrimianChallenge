
export async function getDataSaved(contract:any) {
    try {
      const data = await contract.methods.retrieveData().call();
      console.log("Data from contract:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data from contract", error);
      throw error; // Opcional: Puedes lanzar el error para manejarlo en el componente
    }
  }