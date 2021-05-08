import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Chip, TextField } from "@material-ui/core";
import { ethers } from "ethers";
import { makeStyles } from "@material-ui/core/styles";

import "./header.css";

const CS = require("../abi/FixedPriceSaleModule.json");

let provider;
let address;

const usestyle = makeStyles({
  textField: {
    width: "30%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    color: "white",
  },
  input: {
    color: "white",
  },
});

export default function NFTsaleScreen() {
  const classes = usestyle();

  const [data, setdata] = useState({});
  const [nftdata , setnftdata] = useState({});
  const [left , setleft] = useState();
  const [price , setprice] = useState();

  let location = useLocation();
  const [image, setimage] = useState();
  const [finaltime, setfinaltime] = useState();
  const [buyamt, setbuyamt] = useState();

  window.ethereum
    .enable()
    .then((provider = new ethers.providers.Web3Provider(window.ethereum)));
  const signer = provider.getSigner();

  signer.getAddress().then((res) => {
    address = res;
  });
  
  console.log(location)
  let i = location.pathname
  let v  = i.slice(1,43)
  console.log(v);
  useEffect(() => {
    axios
      .post(
        "https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-custody",
        {
          query: `{
                          wallet(id:"${v}") {
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
        setnftdata(res.data.data.wallet.nfts[0])
        console.log(res.data.data.wallet.nfts);
        const options = { method: "GET" };
        fetch(
          `https://testnets-api.opensea.io/api/v1/metadata/${res.data.data.wallet.nfts[0].registry}/${res.data.data.wallet.nfts[0].tokenId}`,
          options
        ).then(async (response) => {
          const a = await response.json();
          console.log(a);
          setimage(a.image);
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
                    shardedWallet(id:"${v}"){
                      id
                      crowdsales{
                        remainingShards{
                                value
                              }
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
        console.log(res.data.data.shardedWallet.crowdsales[0].remainingShards.value)

        setleft(
          res.data.data.shardedWallet.crowdsales[0].remainingShards.value
        );

        setprice(
          res.data.data.shardedWallet.crowdsales[0].price.value
        );
        /* console.log(res.data.data.shardedWallet.crowdsales[0].deadline); */

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
          date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
        console.log(time);
        setfinaltime(time);
      })
      .catch((e) => console.log(e));
    return () => {
      setimage();
      setfinaltime();
    };
  }, []);

  const buy = async () => {
    // buying function //

    const CrowdSale = new ethers.Contract(
      "0x043f9b07BaeAA142c81f55BcEbefa6E84dA62507",
      CS.abi,
      provider
    );
    let k = (buyamt*price).toString();
    
    const CSSigner = CrowdSale.connect(signer);

    const BuyStart = await CSSigner.buy(v, address, {
      from: address,
      value: ethers.utils.parseEther(k).toString(),
    });
    const B = await provider.waitForTransaction(BuyStart.hash);
    console.log(B);

    console.log("Bought some shards");
  };

  console.log(location);

  return (
    <>
      <div>
        <h1 style={{ color: "white", marginTop: 10, marginBottom: 20 }}>
          {data.name}
        </h1>
        {/* {{ image } === "<empty string>" ? (
            <img alt={data.name} src={image} />
          ) : (
            <img
              alt={data.name}
              src="https://www.mahalaxmimedicos.com/assets/upload/products/MM63611493626166.png"
            />
          )} */}

        <img alt={data.name} src={image} />

        <h4 style={{ color: "white", marginTop: 20 }}>
          Deadline = {finaltime}
        </h4>
        <h4 style={{ color: "white", marginTop: 20 }}>
          Price per fraction = {price}
        </h4>
      </div>
      <div>
        <h4 style={{ color: "white", margin: 10 }}>Left Shards = {left}</h4>
      </div>
      <Chip style={{ margin: 10 }} label={data.symbol} />
      <div id="btn">
        {/* <Button variant="contained" color="primary" onClick={load}>
            Let's gooooooo
          </Button> */}
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="Buying amount"
          variant="outlined"
          type="number"
          onChange={(e) => {
            console.log(e.target.value);
            setbuyamt(e.target.value);
          }}
          style={{
            width: "25%",
            borderRadius: "10px",
            color: "#ffffff",
          }}
          InputProps={{
            style: {
              color: "#ffffff",
            },
          }}
          InputLabelProps={{
            style: {
              color: "#ffffff",
            },
          }}
        />
      </div>
      <div>
        <p style={{ color: "white", marginTop: 10 }}>
          More info about the
          <a
            style={{ color: "#903749" }}
            href={`https://testnets.opensea.io/assets/${nftdata.registry}/${nftdata.tokenId}`}
          >
            {" "}
            NFT
          </a>
        </p>
      </div>
      <div>
        <p style={{ color: "white", marginTop: 10 }}>
          More info about the
          <a
            style={{ color: "#903749" }}
            href={`https://rinkeby.etherscan.io/token/${v}`}
          >
            {" "}
            Shard
          </a>
        </p>
      </div>
      <div>
        <Button
          style={{ margin: "15px", backgroundColor: "#903749" }}
          id="btn"
          variant="contained"
          color="primary"
          onClick={buy}
        >
          Buy
        </Button>
      </div>
      <footer id="footer">
        <p style={{ color: "white", marginTop: 100 }}>
          Made with ❤️ by
          <a style={{ color: "white" }} href="https://github.com/3scava1i3r">
            {" "}
            3scava1i3r
          </a>
        </p>
      </footer>
    </>
  );
}
