import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Portis from "@portis/web3";
import {useState} from "react";
import axios from "axios"
let g = new Array();


const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "d4c7101b7a7e45fd8adaaf71881b6be4", // required
      },
    },
    portis: {
      package: Portis, // required
      options: {
        id: "b7d059de-0fea-4fbf-a725-143562297c30", // required
      },
    },
  }



  

function dashboard() {


    const [auth, setauth] = useState(false)
    const [acc, setacc] = useState("")
    const [dashboard, setdashboard] = useState([]);
    const [isloading, setisloading] = useState(false)

    const GetFractions = () => {

        try {

          axios
          .post("https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-custody", {
            query: 
            `{
                wallets(where:{owner:"0x55590dcd461ce79eb2280cd1446932b46112afc9"})
                {
                                            id
                                            name
                                            symbol
                                            owner
                                            nfts{
                                            id
                                            }       
                                    }
                                
                        }`,
          })
          .then((res) => {
            
            res.data.data.wallets.map((walletitem,i) => {
              if (walletitem.nfts.length != 0) {
                //console.log(walletitem);
                g.push(walletitem);
              }
            });
            setdashboard(g);
            console.log(dashboard);
            g = [];
   
          })
          setisloading(true)
          
        } catch (e) {
          console.log(e)
        }
        console.log(dashboard);
        
      }
    

    const logIn = async() => {
        const web3Modal = new Web3Modal({
            providerOptions, 
            //displayNoInjectedProvider: true,
            //disableInjectedProvider: true,
          });
          
          const provider = await web3Modal.connect();
          //console.log(provider)
          const web3 = new Web3(provider);
          
          //const d = web3.currentProvider.selectedAddress
          const accounts = await web3.eth.getAccounts();
    
          setacc(accounts[0])
          setauth(true)
          GetFractions()
          
      }
    
      const signout = () => {
    
        const web3Modal = new Web3Modal({
          providerOptions, // required
          //displayNoInjectedProvider: true,
          //disableInjectedProvider: true,
        });
        
        setauth(false)
        setacc("")
        console.log(acc)
    
        web3Modal.clearCachedProvider();
    
        //console.log(auth)
      }



    return (
        <>  
            {!acc ? (<button onClick={logIn}>IN</button>): (<button onClick={signout}>Out</button>)}
            
            
            {!acc ? (<h2>we have no {acc}</h2>) : (<h2>we have {acc}</h2>)}

        </>
    );
}

export default dashboard;