import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/loader";

const PublicRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
};

export default PublicRoute;
