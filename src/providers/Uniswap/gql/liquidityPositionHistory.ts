import gql from "graphql-tag";

export const liquidityPositionHistory = gql`
query liquidityPositionHistory($address: String) {
  user(id: $address) {
    id
    liquidityPositions {
      pair {
        id
        token0 {
          id
          name
          symbol
        }
        token1 {
          id
          name
          symbol
        }
        reserve0
        reserve1
        totalSupply
      }
      poolOwnership
      historicalSnapshots {
        liquidityTokenTotalSupply
        liquidityTokenBalance
        reserve0
        reserve1
        token0PriceUSD
        token1PriceUSD
        liquidityPosition {
          poolOwnership
        }
        block
        timestamp
      }
    }
  }
}`;
