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
import Chip from "@material-ui/core/Chip";


import NFTselect from '../components/nftselect.js';
import './Screens.css';
/* import { getAddress } from "ethers/lib/utils"; */
const SWFabi = require('../abi/ShardedWalletFactory.json');
const BT = require('../abi/BatchTransferHelper.json');
const Approve = require('../abi/Approve.json');
const CS = require('../abi/FixedPriceSaleModule.json');
const SW = require('../abi/ShardedWallet.json');
const BDM = require('../abi/BasicDistributionModule.json');
const Gov = require('../abi/Governance.json');



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
const [Select , setSelect ] = useState({});
const [T ,setT] = useState();

const [contractadd, setcontractadd] = useState();
const [tkid , settkid] = useState();


const [Name , setName] = useState();
const [Sym, setSym] = useState();
const [Desc, setDesc] = useState();
const [Nof, setNof] = useState();
const [Afs, setAfs] = useState();
const [Ppf, setPpf] = useState();
const [Deadline, setDeadline] = useState();


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


const Sel = (img) => {
  setSelect(img);
};

const contracttype = (ct) => {
  setT(ct);
};

const tokenid = (tk) => {
  settkid(tk);
};

const cadd = (conadd) => {
  setcontractadd(conadd);
};


const DeployCC = async() => {

  

  const address = await signer.getAddress();


  /* if (data[0].asset_contract.asset_contract_type !== "non-fungible")
  {
    console.log("Need a non-fungible token man!")
  } */


  console.log(contractadd);
  console.log(tkid)

  const SWFcontract = new ethers.Contract(
    "0x8D6889c94DeE6BFF422EF191Fa404f461667D2c4",
    SWFabi.abi,
    provider
  );
  const SWFSigner = SWFcontract.connect(signer);

  const receipt = await SWFSigner.mintWallet(
    "0x496FA5e4095a0dBf120b644DFCcd698607ADaD9F",
    address,
    Name, // name_
    Sym,
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
    contractadd,
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
    [contractadd.toString()],
    [tkid.toString()]
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


  /* const CPR = await CSSigner.CURVE_PREMINT_RESERVE(); */

  const SaleStart = await CSSigner.setup(
    SWinstance.address,
    address,
    ethers.utils.parseEther(Ppf).toString(),
    3600,
    ethers.utils.parseEther(Nof).toString(),
    [
      [address, ethers.utils.parseEther(Afs).toString()],
    ],
    { from: address }
  );


  const SSR = await provider.waitForTransaction(SaleStart.hash);
  console.log(SSR);

  console.log("Sale Started!");


}


const SelfIssued = async() => {

  const address = await signer.getAddress();

  const SWFcontract = new ethers.Contract(
    "0x8D6889c94DeE6BFF422EF191Fa404f461667D2c4",
    SWFabi.abi,
    provider
  );
  const SWFSigner = SWFcontract.connect(signer);

  const receipt = await SWFSigner.mintWallet(
    "0x496FA5e4095a0dBf120b644DFCcd698607ADaD9F",
    address,
    Name, // name_
    Sym,
    address
  );


  const SWR = await provider.waitForTransaction(receipt.hash);
  console.log(SWR.logs[1].address.toString());



  const SWinstance = new ethers.Contract(SWR.logs[1].address, SW.abi, provider);

  console.log(SWinstance);


  console.log("Sharded wallet made");
  

  const ApproveNFT = new ethers.Contract(
    contractadd,
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


  console.log("Approval done!")


  const BatchTransfer = new ethers.Contract(
    "0xFD9Be68b7B88f82a19Ea74EDA72F4009dd96360e",
    BT.abi,
    provider
  );

  const BTSigner = BatchTransfer.connect(signer);


  const Transfer = await BTSigner.batchTransferERC721(
    [SWinstance.address], //   SWR.logs[1].address.toString()
    [contractadd.toString()],
    [tkid.toString()]
  );

  const BTR = await provider.waitForTransaction(Transfer.hash);
  console.log(BTR);

  console.log("NFT Transfer done!");

  /*  Governance  */

  const governance = new ethers.Contract(
    "0x496FA5e4095a0dBf120b644DFCcd698607ADaD9F",
    Gov.abi,
    provider
  );

  console.log(governance);

  const govSigner = governance.connect(signer);

  const govadd = await govSigner.getNiftexWallet();
  console.log(govadd);



  /*     self issue     */
  const Self = new ethers.Contract(
    "0xa48f413dddc05bfd8a2ab5d4985077998f8f5ae6",
    BDM.abi,
    provider
  );

  const BDMsigner = Self.connect(signer);
    let mainone = ((99 * Nof) / 100).toString();
    let otherone = (Nof / 100).toString();
  const Selfsale = await BDMsigner.setup(
    SWinstance.address,
    [
      [ address , (ethers.utils.parseEther(mainone).toString())],
      [govadd , (ethers.utils.parseEther(otherone).toString())]
    ],{from: address}
  );


  const BDR = await provider.waitForTransaction(Selfsale.hash);
  console.log(BDR);

  console.log("Self issued let's go!");


  /* 0xa48f413dddc05bfd8a2ab5d4985077998f8f5ae6 */


}





    return (
      <div>
        <Button onClick={connectmetamask}>Connect and show NFT</Button>

        <div>
          <div id="hh">
            {data.map((data, index) => (
              <>
                <div>
                  <NFTselect
                    data={data}
                    Choose={Sel}
                    type={contracttype}
                    contractadd={cadd}
                    tkid={tokenid}
                  />
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
            <div id="first-form">
              <TextField
                id="outlined-basic"
                label="Deadline(in seconds)"
                variant="outlined"
                type="number"
                onChange={(e) => {
                  setDeadline(e.target.value);
                  console.log(Deadline);
                }}
              />
            </div>

            <div id="buttons">
              <Button variant="contained" color="primary" onClick={DeployCC}>
                Deploy Custody Contract(FPS)
              </Button>
            </div>
            <div id="buttons">
              <Button variant="contained" color="primary" onClick={SelfIssued}>
                Deploy Self issued 
              </Button>
            </div>

            {T !== "non-fungible" ? (
              <h1>Not a Non fungible token</h1>
            ) : (
              <div id="ll">
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={Select}
                      title={Name}
                    />
                    <CardContent>
                      {/* Name */}
                      <Typography gutterBottom variant="h6" component="h4">
                        {Name}
                      </Typography>
                      {/*Symbol */}
                      <Chip label={Sym} />
                      {/* price */}
                      <Typography gutterBottom variant="h7" component="h5">
                        {Nof * Ppf}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Buy
                    </Button>
                    <Button size="small" color="primary" href={data.permalink}>
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
