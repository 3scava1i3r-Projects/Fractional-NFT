import '../styles/globals.css'
import { WagmiConfig, createClient, defaultChains, configureChains } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
//import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'


const infuraId = "d4c7101b7a7e45fd8adaaf71881b6be4"
const { chains, provider, webSocketProvider } = configureChains(defaultChains, 
  [infuraProvider({ infuraId })],
)

const client = createClient({
  //autoConnect: true,
  connectors: [
    new MetaMaskConnector({options: {
      name: 'Metamask',
    },
  }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: 'Injected',
    //     shimDisconnect: false,
    //   },
    // }),
  ],
  provider,
  webSocketProvider,
})



function MyApp({ Component, pageProps }) {

  return(
    <>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>

    </>
    )
}

export default MyApp
