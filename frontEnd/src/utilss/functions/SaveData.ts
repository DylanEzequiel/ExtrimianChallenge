import { toast } from "react-toastify";
import { SwitchLoading } from "../../storeZustand/Store";

export  async function storeData({data,contract,account}: {data:string,contract:any,account:string}) {
    try {
      // Llama a la función storeData del contrato para gaurdar el dato
      await contract.methods.storeData(data).send({ from: account });
      SwitchLoading()
      return toast.success("Se aprobo la transacción!")
    } catch (error) {
      console.error("Error storing data", error);
      SwitchLoading()
      
    }
}