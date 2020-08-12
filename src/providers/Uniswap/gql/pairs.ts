import gql from "graphql-tag";

export const pairsDocument = gql`
query pairs {
  pairs {
    id
    token0 {
      name
    }
    token1 {
      name
    }
    liquidityProviderCount
    volumeUSD
    reserveUSD
  }
}`


// const pairsQuery = useQuery(pairsDocument);
// console.log("pairsQuery", pairsQuery.loading);
// useMemo(() => {
//   const mostVolume = pairsQuery.data?.pairs
//     ?.map((pair: any) => {
//       const infoUrl = `https://uniswap.info/pair/${pair.id}`;
//       const volumeUSD = Number(pair.volumeUSD) || 0;
//       const reserveUSD = Number(pair.reserveUSD) || 0;
//       const volumePercent = reserveUSD ? volumeUSD / reserveUSD : 0;
//       return {
//         // ...pair,
//         token0: pair?.token0?.name,
//         token1: pair?.token1?.name,
//         infoUrl,
//         volumeUSD,
//         reserveUSD,
//         volumePercent,
//       };
//     })
//     .sort((a: any, b: any) => b.volumePercent - a.volumePercent);
//   console.table(mostVolume);
// }, [pairsQuery.data]);