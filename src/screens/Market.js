import React, { useState , useEffect } from "react";
import axios from "axios";

import MarketCard from "../components/MarketCard";
import "./Screens.css";
import { Button } from "@material-ui/core";


let g = new Array();

export default function Market() {
  const [d, setd] = useState([]);
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
        
        setd(a);

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
              /* console.log(res.data.data.wallet.nfts[0]); */

              if (res.data.data.wallet.nfts[0] !== undefined) {

                let add = res.data.data.wallet.nfts[0].registry;
                let tkid = res.data.data.wallet.nfts[0].tokenId;
                let wid = listitem.id;
                let symbol = listitem.symbol;
                let name = listitem.name;
                let status = listitem.asWallet.crowdsales[0].status;
                let price = listitem.asWallet.crowdsales[0].price.value;


                g.push({ add, tkid , wid , symbol , name , status , price});


              }
              else{
                /* console.log("reclaimed")  */
              }

            })
            
          }
            
        });
        setl(g);
        g = [];
        
      })
      .catch((err) => console.error(err));

      
  
  }, [])



  return (
    <>
      <div id="gg">
        {l.map(( l ,index) => (
          <div>
            <MarketCard l={l}/>
          </div>
        ))}
      </div>
    </>
  );
}
