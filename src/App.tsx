import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { MainLayout } from "./components/Layout/Main";

const About = lazy(() => import("./routes/About"));
const Tokens = lazy(() => import("./routes/Tokens"));
const Transactions = lazy(() => import("./routes/Transactions"));
const Uniswap = lazy(() => import("./routes/Uniswap"));

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/uniswap" component={Uniswap} />
          <Route path="/tx" component={Transactions} />
          <Route path="/" component={Tokens} />
        </Switch>
      </Suspense>
    </MainLayout>
  );
}

export default App;
