import gql from "graphql-tag";

export const liquidityPositionSnapshots = gql`
	query liquidityPositionSnapshots ($pair: String!) {
    liquidityPositionSnapshots(
    where: {
			pair: $pair
    }
  ) {
    reserve0
    reserve1
    token0PriceUSD
    token1PriceUSD
    timestamp
    user {
      id
    }
    liquidityTokenTotalSupply
    liquidityTokenBalance
  }
}
`;
