import { useState , useEffect  } from "react";
import axios from "axios";


import MarketCard from "../components/MarketCard";

function market() {

  let g = new Array();

  //const [g, setg] = useState([]);
  const [l, setl] = useState([]);
  

  useEffect(() => {
    axios
      .post(
        "https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-main-subgraph-rinkeby",
        {
          query: `
              
                {
                  tokens{
                    id
                    name
                    symbol
                    totalSupply{
                      value
                    }
                    asWallet{
                      id
                      
                      crowdsales{
                        id
                        balance{
                        value
                        }
                        price{
                          value
                        }
                        offeredShards{
                          value
                        }
                        remainingShards{
                          value
                        }
                        deadline
                        status
                      }  
                      owner{
                        id
                        
                      }
                    }                    
                  }
          }`,
        }
      )
      .then((res) => {
        const a = res.data.data.tokens;
        
        a.map((listitem) => {

          if (
            listitem.asWallet !== null &&
            listitem.asWallet.crowdsales[0] !== undefined
          ){
            
            axios.post(
              "https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-custody",
              {
                query: `
                {
                  wallet(id: "${listitem.asWallet.id}" ){
                    id
                    nfts{
                      name
                      symbol
                      id
                      registry
                      tokenId
                    }
                  }
                }
                  `,
              }
            ).then((res) => {

              if (res.data.data.wallet.nfts[0] != undefined) {

                let add = res.data.data.wallet.nfts[0].registry;
                let tkid = res.data.data.wallet.nfts[0].tokenId;
                let wid = listitem.id;
                let symbol = listitem.symbol;
                let name = listitem.name;
                let status = listitem.asWallet.crowdsales[0].status;
                let price = listitem.asWallet.crowdsales[0].price.value;


                g.push({add, tkid , wid , symbol , name , status , price});

              }

            })
            
          }
        })


      })
      .catch((err) => console.error(err));
    


      console.log(g)
      
  }, [])

    
  
  
  return (
        <div>
            <div>
              <h1>Market Place</h1>
              
              {g.map((h, index) => (
                <div>
                  <MarketCard l={h}/>
                </div>
              ))}   
            </div>

          
        </div>
    );
}

export default market;