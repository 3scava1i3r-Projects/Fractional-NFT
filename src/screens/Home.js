import React, { useState, useEffect } from "react";
import { Button, ListItem, List, ListItemText } from "@material-ui/core";
import axios from "axios";
import { ethers } from "ethers";


import "./Screens.css";
import MyFractions from '../components/MyFractions';
const SW = require("../abi/ShardedWallet.json");
let g = new Array();



export default function Home() {


  const [dashboard, setdashboard] = useState([]);
  const [address, setaddress] = useState();
  let provider;

  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then((provider = new ethers.providers.Web3Provider(window.ethereum)));
  const signer = provider.getSigner();
  signer.getAddress().then((add) => setaddress(add.toLowerCase()));


  const GetFractions = () => {
    axios
      .post("https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-custody", {
        query: `{
                    wallets {
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
        res.data.data.wallets.map((walletitem) => {
          if (walletitem.owner === address && walletitem.nfts.length !== 0) {
            console.log(walletitem);
            g.push(walletitem);
          }
        });

        setdashboard(g);
        console.log(dashboard);
        g = [];
      })
      .catch((e) => console.log(e));

    console.log(dashboard);
  }

  

  
  return (
    <div>
      <div>
        <h1>My Fractions</h1>
      </div>
      <div>
        {dashboard.map((sharditem, index) => (
          <>
            <div id="shbal">              
              <MyFractions shard={sharditem} prov = {provider} add={address}/>
            </div>
          </>
        ))}
      </div>

      <div>
        <Button variant="contained" color="primary" onClick={GetFractions}>
          Let's gooooooo
        </Button>
      </div>
    </div>
  );
}
