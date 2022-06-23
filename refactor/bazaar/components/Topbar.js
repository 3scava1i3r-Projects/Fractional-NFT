import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
  } from 'wagmi'



function Topbar() {


    const { data: account } = useAccount()
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
    const { data: ensName } = useEnsName({ address: account?.address })
    const { connect, connectors, error, isConnecting, pendingConnector } =
      useConnect()
    const { disconnect } = useDisconnect()



  if (account) {

    return (
      <div>
        <div>
          <img src={ensAvatar} alt="ENS Avatar" />
          <div>
            {ensName ? `${ensName} (${account.address})` : account?.address}
          </div>
          <div>Connected to {account.connector.name}</div>
          <button type="button" className="nes-btn" onClick={disconnect}>Disconnect</button>
        </div>


      </div>
    )
  }



    return (
    <div>
      {connectors.map((connector) => (
        <button
        type="button" className="nes-btn"
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

export default Topbar;