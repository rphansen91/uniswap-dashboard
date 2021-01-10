import gql from "graphql-tag";

export const liquidityPositionHistory = gql`
  query liquidityPositionHistory($address: ID!) {
    liquidityPositionSnapshots(where: { user: $address }) {
      pair {
        id
      }
      liquidityTokenTotalSupply
      liquidityTokenBalance
      reserve0
      reserve1
      token0PriceUSD
      token1PriceUSD
      block
      timestamp
    }
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
      }
    }
  }
`;
