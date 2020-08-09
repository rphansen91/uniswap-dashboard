import UniswapV2Factory from "@uniswap/v2-core/build/UniswapV2Factory.json";
import UniswapV2Pair from "@uniswap/v2-core/build/UniswapV2Pair.json";
import { web3 } from "../Web3";

console.log(UniswapV2Factory, UniswapV2Pair);
export const getUniswapV2FactoryContract = () =>
  new web3.eth.Contract(UniswapV2Factory.abi as any);
export const getUniswapV2PairContract = (address: string) =>
  new web3.eth.Contract(UniswapV2Pair.abi as any, address);

export async function loadUniswapPairInfo(
  address: string,
  from: string
): Promise<IUniswapInfo> {
  const contract = getUniswapV2PairContract(address);
  const [
    balance,
    token0,
    token1,
    {
      _reserve0: reserve0,
      _reserve1: reserve1,
      _blockTimestampLast: blockTimestampLast,
    },
    totalSupply,
  ] = await Promise.all([
    contract.methods.balanceOf(from).call({ from }),
    contract.methods.token0().call({ from }),
    contract.methods.token1().call({ from }),
    contract.methods.getReserves().call({ from }),
    contract.methods.totalSupply().call({ from }),
  ]);
  return {
    balance: Number(web3.utils.fromWei(balance)),
    token0: token0,
    token1: token1,
    reserve0: Number(web3.utils.fromWei(reserve0)),
    reserve1: Number(web3.utils.fromWei(reserve1)),
    blockTimestampLast: blockTimestampLast,
    totalSupply: Number(web3.utils.fromWei(totalSupply)),
  };
}

export const isUniswapSymbol = (symbol: string) => symbol.startsWith("UNI-V2");


export type BN = ReturnType<typeof web3.utils.toBN>
export type IUniswapInfo = {
  balance: number;
  token0: string;
  token1: string;
  reserve0: number;
  reserve1: number;
  blockTimestampLast: string;
  totalSupply: number;
};
