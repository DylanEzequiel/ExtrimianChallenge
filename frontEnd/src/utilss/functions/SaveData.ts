
export  async function storeData({data,contract,account}: {data:string,contract:any,account:string}) {
    try {
      // Llama a la función storeData del contrato
      const result = await contract.methods.storeData(data).send({ from: account });
      console.log("Transaction successful:", result);
    } catch (error) {
      console.error("Error storing data", error);
    }
}