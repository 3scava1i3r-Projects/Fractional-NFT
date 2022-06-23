import {
  useAccount,
} from 'wagmi'

export default function Home() {

  const { data: account } = useAccount()

  console.log(account)


  return (
    <>

    </>
  )
}
