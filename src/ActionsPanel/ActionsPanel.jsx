import { useEffect, useState } from 'react'
import { Panel } from 'primereact/panel';
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_LOCATIONS, selectedLocationVar } from "../apollo/index.js";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";

export default function ActionsPanel () {
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  const selectedLocation = useReactiveVar(selectedLocationVar);

  useEffect(() => {
    if (data?.locations?.results[0] && !selectedLocation) {
      selectedLocationVar(locationOptions[0].value);
    }
  }, [data, selectedLocation]);

  if (loading) return <ProgressSpinner style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }} />;

  const locationOptions = data?.locations?.results.map(location => ({
    label: location.name,
    value: location.id
  })) || [];

  const handleSelect = (e) => selectedLocationVar(e.value);

  return (
    <Panel header="Actions" className="mb-4">
      <Dropdown
        value={selectedLocation}
        options={locationOptions}
        onChange={handleSelect}
        placeholder="Select a Location"
        optionLabel="label"
        optionValue="value"
      />
    </Panel>

  )
}
