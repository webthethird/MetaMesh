import { Connect } from 'uport-connect'

export let uport = new Connect('MetaMesh', {
  network: 'rinkeby'
})
export const web3 = uport.getWeb3()
