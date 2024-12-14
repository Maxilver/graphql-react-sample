import { useState } from 'react'
import { Panel } from 'primereact/panel';
import { Button } from "primereact/button";
import { useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../apollo/index.js";
import { Dropdown } from "primereact/dropdown";

export default function ActionsPanel () {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const countryOptions = data?.locations?.results.map(location => ({
    label: location.name,
    value: location.id
  }));

  return (

    <Panel header="Actions" className="mb-4">
      <Dropdown
        value={selectedLocation}
        options={countryOptions}
        onChange={(e) => setSelectedLocation(e.value)}
        placeholder="Select a Location"
        optionLabel="label"
        optionValue="value"
      />
    </Panel>

  )
}
