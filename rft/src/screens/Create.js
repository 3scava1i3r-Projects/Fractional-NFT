import React, { useState } from "react";
import { ethers } from "ethers";
import {Button, TextField} from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { checkProperties } from "ethers/lib/utils";
import { makeStyles } from "@material-ui/core/styles";



import NFTselect from '../components/nftselect.js';
import './Screens.css';
/* import { getAddress } from "ethers/lib/utils"; */
const SWFabi = require('../abi/ShardedWalletFactory.json');
const BT = require('../abi/BatchTransferHelper.json');
const Approve = require('../abi/Approve.json');
const CS = require('../abi/FixedPriceSaleModule.json');
const SW = require('../abi/ShardedWallet.json');



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 5,
  },
  media: {
    height: 200,
    width: 245,
  },
});


export default function Create() {

let provider;
const classes = useStyles();

const [ data, setdata] = useState([]);


const [Name , setName] = useState();
const [Sym, setSym] = useState();
const [Desc, setDesc] = useState();
const [Nof, setNof] = useState();
const [Afs, setAfs] = useState();
const [Ppf, setPpf] = useState();


  window.ethereum
    .enable()
    .then((provider = new ethers.providers.Web3Provider(window.ethereum)));
  const signer = provider.getSigner();

async function connectmetamask() {
  

  const address = await signer.getAddress();
  

  
  const options = { method: "GET" };

  fetch(
    "https://rinkeby-api.opensea.io/api/v1/assets?format=json&limit=40&offset=0&order_direction=desc&owner="+address,
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

const DeployCC = async() => {

  

  const address = await signer.getAddress();


  if (data[0].asset_contract.asset_contract_type !== "non-fungible")
  {
    console.log("Need a non-fungible token man!")
  }




  const SWFcontract = new ethers.Contract(
    "0x8D6889c94DeE6BFF422EF191Fa404f461667D2c4",
    SWFabi.abi,
    provider
  );
  const SWFSigner = SWFcontract.connect(signer);

  const receipt = await SWFSigner.mintWallet(
    "0x496FA5e4095a0dBf120b644DFCcd698607ADaD9F",
    address,
    "Tokenized NFT", // name_
    "TNFT",
    address
  );


  const SWR = await provider.waitForTransaction(receipt.hash);
  console.log(SWR.logs[1].address.toString());



  const SWinstance = new ethers.Contract(SWR.logs[1].address, SW.abi, provider);

  console.log(SWinstance);


  console.log("Sharded wallet made");
  
  /* const options = { method: "GET" };

  fetch(
    "https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=0xee45b41d1ac24e9a620169994deb22739f64f231&apikey=5DVXQC5JJCDC3BPT9IIK7E9MDUECDTTFTE",
    options
  )
    .then(async (response) => {
      const b = await response.json();
      setNFTabi(b);
      console.log(NFTabi.result);
    })
    .catch((err) => console.error(err));

  console.log(NFTabi.result); */
  

  const ApproveNFT = new ethers.Contract(
    data[0].asset_contract.address,
    Approve,
    provider
  );

  const ApproveNFTSigner = ApproveNFT.connect(signer);
  const AppReceipt = await ApproveNFTSigner.setApprovalForAll(
    "0xFD9Be68b7B88f82a19Ea74EDA72F4009dd96360e",
    true
  );

  const Appr = await provider.waitForTransaction(AppReceipt.hash);
  console.log(Appr);

  /* const TransferNFTR = await ApproveNFTSigner.transferFrom(
    address,
    SWR.logs[1].address,
    data[0].id
  );

  const TNFTR = await provider.waitForTransaction(TransferNFTR.hash);
  console.log(TNFTR); */

  console.log("Approval done!")




  const BatchTransfer = new ethers.Contract(
    "0xFD9Be68b7B88f82a19Ea74EDA72F4009dd96360e",
    BT.abi,
    provider
  );

  const BTSigner = BatchTransfer.connect(signer);

  const Transfer = await BTSigner.batchTransferERC721(
    [SWinstance.address], //   SWR.logs[1].address.toString()
    [data[0].asset_contract.address.toString()],
    [data[0].token_id.toString()]
  );

  const BTR = await provider.waitForTransaction(Transfer.hash);
  console.log(BTR);



  console.log("NFT Transfer done!");
  // ============    Crowd sale start   =============== //

  const CrowdSale = new ethers.Contract(
    "0x043f9b07BaeAA142c81f55BcEbefa6E84dA62507",
    CS.abi,
    provider
  );

  const CSSigner = CrowdSale.connect(signer);


  const CPR = await CSSigner.CURVE_PREMINT_RESERVE();

  const SaleStart = await CSSigner.setup(
    SWinstance.address,
    address,
    ethers.utils.parseEther("0.0001").toString(),
    3600,
    ethers.utils.parseEther("20").toString(),
    [
      [address, ethers.utils.parseEther("8").toString()],
    ],
    { from: address }
  );


  const SSR = await provider.waitForTransaction(SaleStart.hash);
  console.log(SSR);

  console.log("Sale Started!");

  

  
  
}


const AppTrNFT = async() => {


  const address = await signer.getAddress();

  const CrowdSale = new ethers.Contract(
    "0xFC2761AaD91bEd9950Fe41c9a9f81b06D32C152d",
    CS.abi,
    provider
  );

  const CSSigner = CrowdSale.connect(signer);

  const CPR = await CSSigner.CURVE_PREMINT_RESERVE();
  

  const SaleStart = await CSSigner.setup(
    "0xee13ff6088d4cf499519cd5ec580b5f5c2ab7c4f",
    address,
    ethers.utils.parseEther("0.0001").toString(),
    3600,
    ethers.utils.parseEther("20").toString(),
    [
      [address, ethers.utils.parseEther("8").toString()],
      [
        "0x55590DcD461Ce79eB2280Cd1446932b46112AFc9",
        ethers.utils.parseEther("12").toString(),
      ],
    ],
    { from: address }
  );

  console.log(SaleStart);
  console.log("Sale Started!");
  

}

    return (
      <div>
        <Button onClick={connectmetamask}>Connect and show NFT</Button>

        <div>
          <div id="hh">
            {data.map((data, index) => (
              <>
                <div>
                  <NFTselect data={data} />
                </div>
              </>
            ))}
          </div>
          <div>
            <div id="first-form">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                onChange={(e) => {
                  setName(e.target.value);
                  console.log(Name);
                }}
              />
            </div>
            <div id="first-form">
              <TextField
                id="outlined-basic"
                label="Symbol"
                variant="outlined"
                onChange={(e) => {
                  setSym(e.target.value);
                  console.log(Sym);
                }}
              />
            </div>
            <div id="first-form">
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={8}
                variant="outlined"
                onChange={(e) => {
                  setDesc(e.target.value);
                  console.log(Desc);
                }}
              />
            </div>

            <div id="first-form">
              <TextField
                id="outlined-basic"
                label="Number of Fractions"
                variant="outlined"
                type="number"
                onChange={(e) => {
                  setNof(e.target.value);
                  console.log(Nof);
                }}
              />
            </div>

            <div id="first-form">
              <TextField
                id="outlined-basic"
                label="Amount for Self"
                variant="outlined"
                type="number"
                onChange={(e) => {
                  setAfs(e.target.value);
                  console.log(Afs);
                }}
              />
            </div>

            <div id="first-form">
              <TextField
                id="outlined-basic"
                label="Price per fraction"
                variant="outlined"
                type="number"
                onChange={(e) => {
                  setPpf(e.target.value);
                  console.log(Ppf);
                }}
              />
            </div>

            <div id="buttons">
              <Button variant="contained" color="primary" onClick={DeployCC}>
                Deploy Custody Contract
              </Button>
            </div>
            <div id="buttons">
              <Button variant="contained" color="primary" onClick={AppTrNFT}>
                Check Preview
              </Button>
            </div>
            
            <div id="ll">
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={data.image_url}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {data.id}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="medium" color="primary" onClick>
                    Choose
                  </Button>
                  <Button
                    size="medium"
                    color="primary"
                    href={data.permalink}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
}
