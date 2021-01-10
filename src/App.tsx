import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { MainLayout } from "./components/Layout/Main";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
const Uniswap = lazy(() => import("./routes/Uniswap"));

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </MainLayout>
  );
}

export default App;
