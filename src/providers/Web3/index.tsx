import Web3 from "web3";
import { hawk, hawkeye, useHawkState, dispatch } from "react-hawk";
import { resource } from "../../utils/resource"
import { useEffect } from "react";

export let web3: Web3;
let web3Promise: Promise<Web3>;

const NON_ETH_BROWSER =
  "Non-Ethereum browser detected. You should consider trying MetaMask!";

export const ethEnabled = () => {
  if ((window as any).ethereum) return true;
  if ((window as any).web3) return true;
  return false;
};

export const enableEthereum = async () => {
  if ((window as any).ethereum) {
    web3 = new Web3((window as any).ethereum);
    return (window as any).ethereum.enable();
  }
  if ((window as any).web3) {
    web3 = new Web3((window as any).web3.currentProvider);
    return web3;
  }
  throw new Error(NON_ETH_BROWSER);
};

export function useWeb3() {
  if (web3) return web3;
  if (web3Promise) throw web3Promise;
  if ((window as any).ethereum) {
    web3 = new Web3((window as any).ethereum);
    web3Promise = (window as any).ethereum.enable();
    throw web3Promise;
  }
  if ((window as any).web3) {
    web3 = new Web3((window as any).web3.currentProvider);
    return web3;
  }
  throw new Error(NON_ETH_BROWSER);
}

const cache: { [key: string]: any } = {};
const error: { [key: string]: any } = {};
const loadable: { [key: string]: Promise<any> } = {};
export function useLoadable<V>(promise: Promise<V>, key: string) {
  if (cache[key]) return cache[key];
  if (error[key]) throw error[key];
  if (loadable[key]) throw loadable[key];
  loadable[key] = promise
    .then((v) => {
      cache[key] = v;
    })
    .catch((e) => {
      error[key] = e;
    });
  throw loadable[key];
}

export const networkVersion = (window as any).ethereum?.networkVersion ?? "";
export const selectedAddress = (window as any).ethereum?.selectedAddress ?? "";

const chainHawk = hawk({
  default: networkVersion,
  key: "chain",
});

const addressesHawk = hawk({
  default: selectedAddress ? [selectedAddress] : ([] as string[]),
  key: "addresses",
});

const networkHawk = hawkeye({
  key: "network",
  get: ({ get }) => {
    const chain = get(chainHawk);
    switch (chain) {
      case "1":
      case "0x1":
        return "Main";
      case "3":
      case "0x3":
        return "Ropsten";
      case "4":
      case "0x4":
        return "Rinkeby";
      case "5":
      case "0x5":
        return "Goerli";
      case "42":
      case "0x2a":
        return "Kovan";
      default:
        return "";
    }
  },
});

const networkColorHawk = hawkeye({
  key: "network-color",
  get: ({ get }) => {
    const chain = get(chainHawk);
    return getNetworkColor(chain);
  },
});

const addressInfoHawk = hawk<IAsyncState<IAddressInfo>>({
  key: "address-info",
  default: {
    loading: false,
    error: "",
    data: null,
  },
});

const addressTransactionsHawk = hawk<IAsyncState<ITransaction[]>>({
  key: "address-transactions",
  default: {
    loading: false,
    error: "",
    data: null,
  },
});

export const useWeb3Chain = () => useHawkState(chainHawk);
export const useWeb3Network = () => useHawkState(networkHawk);
export const useWeb3NetworkColor = () => useHawkState(networkColorHawk);
export const useWeb3Addresses = () => useHawkState(addressesHawk);
export const useWeb3AddressInfo = () => {
  const [address] = useWeb3Addresses()
  const addressInfo = useHawkState(addressInfoHawk)
  useEffect(() => {
    if (address) {
      dispatch(addressInfoHawk, { loading: true, data: null, error: '' })
      fetchAddressInfoResource.load(address)
        .then((data) => dispatch(addressInfoHawk, { loading: false, data, error: '' }))
        .catch((err) => dispatch(addressInfoHawk, { loading: false, data: null, error: err.message }))
    }
  }, [address])
  return addressInfo
}
export const useWeb3AddressTransactions = () => {
  const [address] = useWeb3Addresses()
  const addressTransactions = useHawkState(addressTransactionsHawk)
  useEffect(() => {
    if (address) {
      dispatch(addressTransactionsHawk, { loading: true, data: null, error: '' })
      fetchAddressTransactionsResource.load(address)
        .then((data) => dispatch(addressTransactionsHawk, { loading: false, data, error: '' }))
        .catch((err) => dispatch(addressTransactionsHawk, { loading: false, data: null, error: err.message }))
    }
  }, [address])
  return addressTransactions
}

const ethereum = (window as any).ethereum;
if (ethereum) {
  web3 = new Web3((window as any).ethereum);
  ethereum.on("connect", (connectInfo: any) =>
    console.log("Eth connection", connectInfo)
  );
  ethereum.on("disconnect", (error: any) =>
    console.log("Eth disconnect", error)
  );
  ethereum.on("accountsChanged", (addresses: any) =>
    console.log("Eth accountsChanged", addresses)
  );
  ethereum.on("chainChanged", (accounts: any) =>
    console.log("Eth chainChanged", accounts)
  );
  ethereum.on("accountsChanged", (addresses: any) => {
    dispatch(addressesHawk, addresses)
  });
  ethereum.on("chainChanged", (chainId: any) => dispatch(chainHawk, chainId));
} else if ((window as any).web3) {
  web3 = new Web3((window as any).web3.currentProvider);
}

export function getNetworkColor(chain: string) {
  switch (chain) {
    case "1":
    case "0x1":
      return "rgba(3, 135, 137)";
    case "3":
    case "0x3":
      return "rgb(255, 74, 141)";
    case "4":
    case "0x4":
      return "rgb(246, 195, 67)";
    case "5":
    case "0x5":
      return "rgb(48, 153, 242)";
    case "42":
    case "0x2a":
      return "rgb(112, 87, 255)";
    default:
      return "";
  }
}

export const fetchAddressInfoResource = resource(fetchAddressInfo)
export const fetchAddressTransactionsResource = resource(fetchAddressTransactions)

export async function fetchAddressInfo (address: string): Promise<IAddressInfo> {
  return fetch(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-96NbS-9bixWLY-9CJQ3`)
  .then(res => res.json())
}

export async function fetchAddressTransactions (address: string): Promise<ITransaction[]> {
  return fetch(`https://api.ethplorer.io/getAddressTransactions/${address}?apiKey=EK-96NbS-9bixWLY-9CJQ3`)
  .then(res => res.json())
}

export function weiBalance (token: IToken) {
  return token.balance / 10 ** Number(token.tokenInfo.decimals)
}

export function usdBalance (token: IToken) {
  if (!token.tokenInfo.price.rate) return null
  return `${(weiBalance(token) * token.tokenInfo.price.rate).toFixed(2)} ${token.tokenInfo.price.currency}`
}

type IAsyncState<V> = {
  loading: boolean;
  error: "";
  data: V | null;
};

export type IAddressInfo = {
  address: string;
  ETH: {
    balance: number;
    price: {
      rate: number;
      diff: number;
      diff7d: number;
      ts: number;
      marketCapUsd: number;
      availableSupply: number;
      volume24h: number;
      diff30d: number;
    };
  };
  countTxs: number;
  tokens: IToken[];
};


export type IToken = {
  tokenInfo: {
    address: string;
    name: string;
    decimals: string;
    symbol: string;
    totalSupply: string;
    owner: string;
    lastUpdated: number;
    issuancesCount: number;
    holdersCount: number;
    description: string;
    website: string;
    twitter: string;
    links: string;
    price: {
      rate: number;
      diff: number;
      diff7d: number;
      ts: number;
      marketCapUsd: number;
      availableSupply: number;
      volume24h: number;
      diff30d: number;
      currency: string;
    };
  }
  balance: number;
  totalIn: number;
  totalOut: number;
}

export type ITransaction = {
    timestamp: number
    from: string
    to: string
    hash: string
    value: string
    input: string
    success: string
}