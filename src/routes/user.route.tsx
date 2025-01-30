import Layout from "@/Layout";
import { Outlet } from "react-router-dom";

const UserRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default UserRoute;
