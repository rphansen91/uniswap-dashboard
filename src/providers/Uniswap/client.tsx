import React, { FC } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";

export const uniswapClient = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
  cache: new InMemoryCache(),
});

export const UniswapApolloProvider: FC<{
  client?: ApolloClient<InMemoryCache>;
}> = ({ client = uniswapClient, children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
