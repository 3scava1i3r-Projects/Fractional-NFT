import { useState,useEffect } from "react";
import { useAccount,useContract } from "wagmi"
import { ethers, providers } from "ethers";

import SWabi from "../abi/ShardedWallet.json"


function DashboardCard(props) {

    const { data: account } = useAccount()
    const [bal, setbal] = useState();
    //console.log(props.info)
    
    const SWcontract = useContract({
        addressOrName: props.info.id,
        contractInterface: SWabi,
        
    })


    useEffect(async() => {
        balance = await SWcontract.balanceOf("0x55590dcd461ce79eb2280cd1446932b46112afc9");
        // console.log(balance.toString())
        // setbal(balance.toString()/1000000000000000000);
        
          
    }, [account.address])
        

    return (
        <div className="nes-container is-rounded is-dark">
            <div>
                {props.info.symbol}
            </div>
            <div>
                {props.info.name}
            </div>
                
            <div>
            </div>
            {props.info.owner}
            <div>
            <a
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  href={`https://rinkeby.etherscan.io/token/${props.info.id}`}
                >
                  Shard Info
                </a>
            </div>

            <div>
                
            </div>
        </div>
            
    );
}

export default DashboardCard;