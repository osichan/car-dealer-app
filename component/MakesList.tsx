import Make from "@/types/Make";
import { useState, useEffect } from "react";

const fetchMakes = async () => {
  const response = await fetch(
    "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
  );
  const data = await response.json();
  return data.Results;
};

export default function MakesList() {
  const [makes, setMakes] = useState([] as Make[]);

  useEffect(() => {
    const getMakes = async () => {
      const data = await fetchMakes();
      setMakes(data);
    };

    getMakes();
  }, []);

  return (
    <>
      {makes?.map((make) => (
        <option key={make.MakeId} value={make.MakeId}>
          {make.MakeName}
        </option>
      ))}
    </>
  );
}
