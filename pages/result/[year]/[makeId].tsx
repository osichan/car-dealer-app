import Loading from "@/component/Loading";
import { lazy, Suspense } from "react";

const LazyVehicleModels = lazy(() => import("@/component/VehicleModels"));

const ParentComponent = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyVehicleModels />
    </Suspense>
  );
};

export default ParentComponent;
