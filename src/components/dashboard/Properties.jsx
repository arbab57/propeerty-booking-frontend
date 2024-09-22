import { useState } from "react";
import PropertyCard from "./PropertyCard";

const Properties = ({ properties }) => {
  const [mode, setMode] = useState("added");

  const toMap =
    mode === "added" ? properties?.latestAdded : properties?.latestUpated;
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-[#212529] font-bold  text-xl">Properties</p>
          <div>
            <select
              onChange={(e) => setMode(e.target.value)}
              className="border border-black rounded-sm"
              name=""
              id=""
            >
              <option value="added">Added</option>
              <option value="updated">Updated</option>
            </select>
          </div>
        </div>
        <div>
          {toMap?.map((property, i) => {
            return <PropertyCard mode={mode} key={i} property={property} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Properties;
