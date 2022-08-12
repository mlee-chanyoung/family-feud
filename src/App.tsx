import { Layout } from "./layout/Layout";
import { Home } from "./modules/home/Home";

export const App = () => {
  const content = <Home />;

  return <Layout>{content}</Layout>;
};
