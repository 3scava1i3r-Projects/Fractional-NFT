import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { ethers } from "ethers";


import MarketCard from '../components/MarketCard';
import './Screens.css';

export default function Market() {

    const [data, setdata] = useState([]);

    let provider;

    window.ethereum
      .enable()
      .then((provider = new ethers.providers.Web3Provider(window.ethereum)));
    const signer = provider.getSigner();

    async function connectmetamask() {
      const address = await signer.getAddress();

      const options = { method: "GET" };

      fetch(
        "https://rinkeby-api.opensea.io/api/v1/assets?format=json&limit=40&offset=0&order_direction=desc&owner=" +
          address,
        options
      )
        .then(async (response) => {
          const a = await response.json();

          setdata(a.assets);
          console.log(a);
        })
        .catch((err) => console.error(err));

      console.log(data);
    }

    return (
      <>
        <Button onClick={connectmetamask}>Connect and show NFT</Button>
        <div id="gg">
          {data.map((data, index) => (
            <div>
              <div>
                <MarketCard data={data} />
              </div>
            </div>
          ))}
        </div>
      </>
    );
}
