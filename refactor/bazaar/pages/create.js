import {
    useAccount,
    useContract,
    useContractWrite,
    useProvider,
    useSigner
  } from 'wagmi'
  import { useState , useEffect} from "react"
import {ethers } from "ethers"


import Topbar from '../components/Topbar';
import Nftselect from '../components/Nftselect';

import SWabi from "../abi/ShardedWallet.json"


function create() {


    const { data: account } = useAccount()
    const [toggleState, setToggleState] = useState(1);
    const [fog, setfog] = useState([]);
    const [NFT, setNFT] = useState()




    const [Name, setName] = useState();
    const [Sym, setSym] = useState();
    const [Desc, setDesc] = useState();
    const [Nof, setNof] = useState();
    const [Afs, setAfs] = useState();
    const [Ppf, setPpf] = useState();
    const [Deadline, setDeadline] = useState();

    const nftchoose = (ct) => {
        if(ct.asset_contract.schema_name != "ERC721"){
            alert("not an ERC721")
        }
        else{
            alert("selected ERC721")
            setNFT(ct);
            console.log(ct)
        }
        
      };


    const Selfmade = () => {

    }

    const provider = useProvider()
    console.log(provider)
    const { data : signer } = useSigner();

 
    console.log(signer)
    

    const CustodyMake = async() => {

        //{
            //const address = await signer.getAddress();


        
        console.log(signer)
            
            


        
            const SWFcontract = new ethers.Contract(
              "0x8D6889c94DeE6BFF422EF191Fa404f461667D2c4",
              SWabi,
              provider
            );

            const SWFSigner = SWFcontract.connect(signer);


            const receipt = await SWFSigner.mintWallet(
                "0x496FA5e4095a0dBf120b644DFCcd698607ADaD9F",
                account.address,
                Name, // name_
                Sym,
                account.address
              );
            

        
             const SWR = await provider.waitForTransaction(receipt.hash);
             console.log(SWR.logs[1].address.toString());
        
            const SWinstance = new ethers.Contract(
              SWR.logs[1].address,
              SW.abi,
              provider
            );
        
            console.log(SWinstance);
        
            console.log("Sharded wallet made");
        
    
        
        //     const ApproveNFT = new ethers.Contract(contractadd, Approve, provider);
        
        //     const ApproveNFTSigner = ApproveNFT.connect(signer);
        //     const AppReceipt = await ApproveNFTSigner.setApprovalForAll(
        //       "0xFD9Be68b7B88f82a19Ea74EDA72F4009dd96360e",
        //       true
        //     );
        
        //     const Appr = await provider.waitForTransaction(AppReceipt.hash);
        //     console.log(Appr);
        

        
        //     console.log("Approval done!");
        
        //     const BatchTransfer = new ethers.Contract(
        //       "0xFD9Be68b7B88f82a19Ea74EDA72F4009dd96360e",
        //       BT.abi,
        //       provider
        //     );
        
        //     const BTSigner = BatchTransfer.connect(signer);
        
        //     const Transfer = await BTSigner.batchTransferERC721(
        //       [SWinstance.address], //   SWR.logs[1].address.toString()
        //       [contractadd.toString()],
        //       [tkid.toString()]
        //     );
        
        //     const BTR = await provider.waitForTransaction(Transfer.hash);
        //     console.log(BTR);
        
        //     console.log("NFT Transfer done!");
        //     // ============    Crowd sale start   =============== //
        
        //     const CrowdSale = new ethers.Contract(
        //       "0x043f9b07BaeAA142c81f55BcEbefa6E84dA62507",
        //       CS.abi,
        //       provider
        //     );
        
        //     const CSSigner = CrowdSale.connect(signer);
        
        
        //     const SaleStart = await CSSigner.setup(
        //       SWinstance.address,
        //       address,
        //       ethers.utils.parseEther(Ppf).toString(),
        //       Deadline,
        //       ethers.utils.parseEther(Nof).toString(),
        //       [[address, ethers.utils.parseEther(Afs).toString()]],
        //       { from: address }
        //     );
        
        //     const SSR = await provider.waitForTransaction(SaleStart.hash);
        //     console.log(SSR);
        
        //     console.log("Sale Started!");
        //     alert('Sale Started')
        //   };
        


        // console.log(NFT)
    }
    


    useEffect(() => {
        const options = { method: "GET" };

        fetch(
          "https://rinkeby-api.opensea.io/api/v1/assets?format=json&limit=40&offset=0&order_direction=desc&owner=" +
            "0x55590dcd461ce79eb2280cd1446932b46112afc9",
          options
        )
          .then(async (response) => {
            const a = await response.json();
    
            setfog(a.assets);
            console.log(a);
          })
          .catch((err) => console.error(err));
    
        //console.log(fog);
    
      
    }, [account])
    

    //console.log(fog)
    console.log(account)

    const toggleTab = (index) => {
        setToggleState(index);
      };


    if (account) {
        return (
            <>
            
            <div>
            
                <div>
                    <Topbar />
    
                    <div>
                        {fog.map((r) => (
                            <Nftselect l={r} choose={nftchoose}/>
                        ) 
                        )}
                    </div>
    
                <div className="tabdiv">
                <button className={toggleState === 1 ? "nes-btn active-tab" : "nes-btn tab"}
                onClick={() => toggleTab(1)}>
                  Custody Contract</button>
                <button className={toggleState === 2 ? "nes-btn active-tab" : "nes-btn tab"}
                onClick={() => toggleTab(2)}>Self Issue</button>
                </div>
    
    
              <div
                  className={toggleState === 1 ? "active-content" : "content"}
                >
    
                    <div className="nes-field">
                    <label for="name_field">Name</label>
                    <input type="text" id="name_field" className="nes-input" onChange={(e) => {
                  setName(e.target.value);
                  console.log(Name);
                }} />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Symbol</label>
                    <input type="text" id="Symbol" className="nes-input" onChange={(e) => {
                  setSym(e.target.value);
                  console.log(Sym);
                }}/>
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Description</label>
                    <input type="text" id="name_field" className="nes-input" onChange={(e) => {
                  setDesc(e.target.value);
                  console.log(Desc);
                }} />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Number Of Fractions</label>
                    <input type="number" id="name_field" className="nes-input" onChange={(e) => {
                  setNof(e.target.value);
                  console.log(Nof);
                }} />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Price Per fractions</label>
                    <input type="number" id="name_field" className="nes-input" onChange={(e) => {
                  setPpf(e.target.value);
                  console.log(Ppf);
                }} />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Amount for Self</label>
                    <input type="number" id="name_field" className="nes-input" onChange={(e) => {
                  setAfs(e.target.value);
                  console.log(Afs);
                }}/>
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Deadline(In Seconds)</label>
                    <input type="number" id="name_field" className="nes-input" onChange={(e) => {
                  setDeadline(e.target.value);
                  console.log(Deadline);
                }} />
                    </div>

                    <button type='button' className='nes-btn' onClick={CustodyMake}>Submit</button>
    
                </div>
    
                <div
                  className={toggleState === 2 ? "active-content" : "content"}
                >
                    <div className="nes-field">
                    <label for="name_field">Name</label>
                    <input type="text" id="name_field" className="nes-input" />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Symbol</label>
                    <input type="text" id="Symbol" className="nes-input" />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Description</label>
                    <input type="text" id="name_field" className="nes-input" />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Number Of Fractions</label>
                    <input type="number" id="name_field" className="nes-input" />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Price Per fractions</label>
                    <input type="number" id="name_field" className="nes-input" />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Amount for Self</label>
                    <input type="number" id="name_field" className="nes-input" />
                    </div>
    
                    <div className="nes-field">
                    <label for="name_field">Deadline(In Seconds)</label>
                    <input type="number" id="name_field" className="nes-input" />
                    </div>

                    <button type='button' className='nes-btn' onClick={Selfmade}>Submit</button>
    
                </div>
                    
    
    
                </div>
    
                <footer id="footer">
              <p>
                Made with ❤️ by
                <a href="https://github.com/3scava1i3r">
                  {" "}
                  3scava1i3r
                </a>
              </p>
            </footer>
            </div>
            
            </>
        );
    

    }

    


    
        return (
            <>
            <Topbar />
            <div>sjkcvbsdf</div>
            <footer id="footer">
              <p>
                Made with ❤️ by
                <a href="https://github.com/3scava1i3r">
                  {" "}
                  3scava1i3r
                </a>
              </p>
            </footer>
            </> 
        )
}

export default create;