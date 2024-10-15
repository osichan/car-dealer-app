import Model from "@/types/Model";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const VehicleModels = () => {
  const router = useRouter();
  const { year, makeId } = router.query;

  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    if (makeId && year) {
      fetchVehicleModels(makeId, year);
    }
  }, [makeId, year]);

  const fetchVehicleModels = async (
    makeId: string | string[],
    year: string | string[]
  ) => {
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch vehicle models");
      }

      const data = await response.json();
      setModels(data.Results || []);
    } catch (error) {
      console.error(error);
      // Handle error accordingly, e.g., set an error state
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {models.length > 0
          ? `${models[0].Make_Name} ${year} Models`
          : "Vehicle Models"}
      </h1>
      {models.length > 0 ? (
        <ul className="list-disc pl-5">
          {models.map((model) => (
            <li key={model.Model_ID} className="text-lg mb-2">
              {model.Model_Name} ({model.Model_ID})
            </li>
          ))}
        </ul>
      ) : (
        <p>No models found for the specified make and year.</p>
      )}
    </div>
  );
};
export default VehicleModels;
