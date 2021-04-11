import React, { useState , useEffect } from 'react'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Chip } from "@material-ui/core";
import { ethers } from "ethers";

import './header.css';

const CS = require("../abi/FixedPriceSaleModule.json");

let provider;
let address;

export default function NFTsaleScreen() {

    const [data , setdata] = useState({});
    let location = useLocation();
    const [image , setimage] = useState();
    const [finaltime , setfinaltime] = useState();


    window.ethereum
      .enable()
      .then((provider = new ethers.providers.Web3Provider(window.ethereum)));
    const signer = provider.getSigner();

    signer.getAddress().then((res) => {
      address = res;
    });

    useEffect(() => {
      axios
        .post(
          "https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-custody",
          {
            query: `{
                          wallet(id:"${location.state}") {
                              id
                              name
                              symbol
                              owner
                              nfts{
                              registry
                              tokenId
                              }       
                          }
                          }`,
          }
        )
        .then((res) => {
          console.log(res.data.data);

          setdata(res.data.data.wallet);

          const options = { method: "GET" };
          fetch(
            `https://rinkeby-api.opensea.io/api/v1/assets?format=json&offset=0&token_id=${res.data.data.wallet.nfts[0].tokenId}&asset_contract_address=${res.data.data.wallet.nfts[0].registry}`,
            options
          ).then(async (response) => {
            const a = await response.json();
            console.log(a.assets[0].image_url);
            setimage(a.assets[0].image_url);
          });

          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });

      axios
        .post(
          "https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-main-subgraph-rinkeby",
          {
            query: `{
                    shardedWallet(id:"${location.state}"){
                      id
                      crowdsales{
                        balance{
                          value
                        }
                        price{
                          value
                        }
                        deadline
                        
                      }
                      asToken{
                        id
                        totalSupply{
                          value
                        }
                        balances{
                          amount{value}
                        }
                      }
                    }
                  }`,
          }
        )
        .then((res) => {
          console.log(res.data.data.shardedWallet.crowdsales[0].deadline);

          /* setdeadline(res.data.data.shardedWallet.crowdsales[0].deadline); */

          var a = new Date(
            res.data.data.shardedWallet.crowdsales[0].deadline * 1000
          );
          var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time =
            date +
            " " +
            month +
            " " +
            year +
            " " +
            hour +
            ":" +
            min +
            ":" +
            sec;
          console.log(time);
          setfinaltime(time);
        })
        .catch((e) => console.log(e));
      return () => {
        setimage()
        setfinaltime()
      }
    }, [])
    const load = () => {
      

      
      
    };


    const buy = async() => {

      // buying function //

      const CrowdSale = new ethers.Contract(
        "0x043f9b07BaeAA142c81f55BcEbefa6E84dA62507",
        CS.abi,
        provider
      );

      const CSSigner = CrowdSale.connect(signer);

      const BuyStart = await CSSigner.buy(
          location.state,
          address,
        );
    const B = await provider.waitForTransaction(BuyStart.hash);
    console.log(B);


      console.log("Bought some shards");

    }
        
    console.log(location);
    return (
      <>
        <div>
          {/* {{ image } === "<empty string>" ? (
            <img alt={data.name} src={image} />
          ) : (
            <img
              alt={data.name}
              src="https://www.mahalaxmimedicos.com/assets/upload/products/MM63611493626166.png"
            />
          )} */}

          <img alt={data.name} src={image} />
          <h1>{data.name}</h1>
          <h4>deadline = {finaltime}</h4>
          <Chip label={data.symbol} />
        </div>
        <div id="btn">
          {/* <Button variant="contained" color="primary" onClick={load}>
            Let's gooooooo
          </Button> */}
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={buy}>
            Buy
          </Button>
        </div>
      </>
    );
}
