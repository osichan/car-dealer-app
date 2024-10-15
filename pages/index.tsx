import { lazy, Suspense, useState } from "react";
import Link from "next/link";
const MakesListLazy = lazy(() => import("../component/MakesList"));

export default function Filter() {
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#313131]">
      <h1 className="text-3xl font-bold mt-40">Car Dealer App</h1>
      <div className="flex flex-col space-y-4 mt-8">
        <div className="flex justify-between p-2">
          <select
            className="p-2 border rounded text-black flex-1 mr-2"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select Vehicle Make</option>
            <Suspense fallback={<option>Loading makes...</option>}>
              <MakesListLazy />
            </Suspense>
          </select>

          <select
            className="p-2 border rounded text-black flex-1 ml-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Model Year</option>
            {Array.from(
              { length: currentYear - 2015 + 1 },
              (_, i) => 2015 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <Link href={`/result/${selectedYear}/${selectedMake}`}>
          <button
            className={`px-4 py-2 text-white bg-blue-500 rounded ${
              !selectedMake || !selectedYear
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            disabled={!selectedMake || !selectedYear}
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
}
