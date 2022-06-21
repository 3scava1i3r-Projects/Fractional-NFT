import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
import { useState , useEffect} from "react"
import axios from "axios"

import DashboardCard from "../components/DashboardCard"

function dashboard() {

  let g = new Array();
  const [dashboard, setdashboard] = useState([]);


  const { data: account } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
  const { data: ensName } = useEnsName({ address: account?.address })
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  
  useEffect(() => {

    if(account != null)
    {
      axios
      .post("https://api.thegraph.com/subgraphs/name/jmahhh/niftex-v2-custody", {
        query: `{
          wallets(where:{owner:"0x55590dcd461ce79eb2280cd1446932b46112afc9"})
          {
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
        console.log(res)
        res.data.data.wallets.map((walletitem) => {
          if (walletitem.owner === "0x55590dcd461ce79eb2280cd1446932b46112afc9" && walletitem.nfts.length !== 0) {
            //console.log(walletitem);
            g.push(walletitem);
          }
        });
        setdashboard(g);
        console.log(dashboard);
        g = [];

      })
      .catch((e) => console.log(e));

    }
    console.log(dashboard)
  
  }, [account])


  if (account) {

    return (
      <div>
        <div>
          <img src={ensAvatar} alt="ENS Avatar" />
          <div>
            {ensName ? `${ensName} (${account.address})` : account?.address}
          </div>
          <div>Connected to {account.connector.name}</div>
          <button type="button" class="nes-btn" onClick={disconnect}>Disconnect</button>
        </div>
        
        <div className="is-container">
          
          {dashboard.map((v,i) => (
            <div >
                <DashboardCard info={v}/>
            </div>
            
          ))}
        </div>

      </div>
    )
  }

  
  return (
    <div>
      {connectors.map((connector) => (
        <button
        type="button" class="nes-btn"
          //disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect(connector)}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isConnecting &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}

      <div> Wallet not attached! 🥸 </div>
    </div>
  )

  
}

export default dashboard;