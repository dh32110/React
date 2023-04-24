import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

const App = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/movie/:id",
      element: <Detail />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default App;
