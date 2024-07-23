import Web3, { AbiItem } from "web3"
import abiCrud from "../abi/abi.json"
import { toast } from "react-toastify"


const Contract_Address = "0x2df05c8AD56Dea969D3FC66A68b92670612C0190"
const Node_Url="https://eth-sepolia.g.alchemy.com/v2/vqWzHOM8jPizUIoCxPgs_3e5HGp-Sgnu"


//Abi necesario para poder ser utilizado en el proyecto
const abi:AbiItem[]=abiCrud

// Interfaz global para el objeto Window que incluirá Ethereum y Web3
declare global {
    interface Window {
      web3: any;
    }
  }
  
// Función para inicializar Web3

  async function initializeWeb3() {
    let web3: Web3;
  
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        // Solicita acceso a la cuenta
        await await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Ethereum enabled");
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else if (window.web3) {
      // Web3 inyectado por una extensión, por ejemplo MetaMask
      web3 = new Web3(window.web3.currentProvider);
      console.log("Web3 injected");
    } else {
      // No se encontró un proveedor web3 y se selecciona el nodo de alchemy
      web3 = new Web3(new Web3.providers.HttpProvider(Node_Url));
      web3.eth.getBlockNumber().then(console.log).catch(console.error);
        console.log("Connected to Alchemy");
      //! Al conectarme con el nodo de alchemy me da un error debido a que el from del contrano no esta especificado
    }
  
    return web3;
  }
  

// funcion encargada de conectarse al contrato con el abi y la direccion obtenida desde remix
export  async function connectToContract() {
    const web3 = await initializeWeb3();
    // Crear una instancia del contrato
    const contract = new web3.eth.Contract(abi, Contract_Address);
    // Obtener la cuenta del usuario
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]; // Asumimos que hay al menos una cuenta disponible

   

    return {contract,account};
  }





