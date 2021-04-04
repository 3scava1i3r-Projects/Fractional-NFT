import React, { useState } from "react";
import axios from "axios";

import MarketCard from "../components/MarketCard";
import "./Screens.css";
import { Button } from "@material-ui/core";

export default function Market() {
  const [d, setd] = useState([]);
  const [l, setl] = useState([]);
  let g = [];

  const main = async () => {
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

        /* for (let i = 0; i < res.data.data.tokens.length; i++) {
          if (
            d[i].asWallet !== null &&
            d[i].asWallet.crowdsales[0] !== undefined
          ) {
            axios
              .post(
                "https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-custody",
                {
                  query: `
                {
                  wallet(id: "${d[i].asWallet.id}" ){
                    id
                    nfts{
                      name
                      symbol
                      id
                      
                    }
                  }
                }
                  `,
                }
              )
              .then((res) => {
                
                
                if (res.data.data.wallet.nfts[0] !== undefined) {
                  let k = res.data.data.wallet.nfts[0].id;

                  let add = k.split("_")[0];
                  let id = k.split("_")[1];
                  l.push({add, id})
                    
                }
                else {
                  
                  g.push("null")
                }
              });
          }
        } */

        

      })
      .catch((err) => console.error(err));


  /* for (let k = 0 ; k< l.length ; k++){
    let add = l[k][0];
    let id = l[k][1];
    const options = { method: "GET" };

  setTimeout(() => {

    fetch(
      `https://rinkeby-api.opensea.io/api/v1/assets?format=json&offset=0&token_id=${id}&asset_contract_address=${add}`,
      options
    )
      .then(async (response) => {
        const a = await response.json();
        console.log(a);
      })
      .catch((err) => console.error(err));
  }, 500);
    
  } */

     

  };



  return (
    <>
      <Button onClick={main}>Make Market</Button>
      <div id="gg">
        {d.map((d, index) => (
          <div>
            <MarketCard d={d} l={l} />
          </div>
        ))}
      </div>
    </>
  );
}
