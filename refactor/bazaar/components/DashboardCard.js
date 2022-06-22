import { useState,useEffect } from "react";
import { useAccount,useContract,useContractRead } from "wagmi"
import { ethers, providers } from "ethers";

import SWabi from "../abi/ShardedWallet.json"


function DashboardCard(props) {

    const { data: account } = useAccount()
    const [bal, setbal] = useState(null);
    //console.log(props.info)


    const { data, isError, isLoading } = useContractRead(
        {
          addressOrName: props.info.id,
          contractInterface: SWabi,
        },
        'balanceOf',
        {
            args: props.info.owner,
          },
      )

      useEffect(() => {
        //console.log(data)
        setbal(data.toString()/1000000000000000000)
        
      }, [account])
      

        

    return (
        <div className="nes-container is-rounded is-dark">
            <div>
                {props.info.symbol}
            </div>
            <div>
                {props.info.name}
            </div>
                {bal}
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