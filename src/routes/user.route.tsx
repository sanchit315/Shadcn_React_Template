import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "@/components/ui/layout";
import { Spinner } from "@/components/ui/loader";

const UserRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Layout>
        <Outlet />
      </Layout>
    </Suspense>
  );
};

export default UserRoute;
