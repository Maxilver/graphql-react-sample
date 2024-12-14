import { useEffect, useState } from 'react'
import { Panel } from 'primereact/panel';
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_DIMENSIONS, selectedDimensionVar } from "../apollo/index.js";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";

export default function ActionsPanel () {
  const { loading, error, data } = useQuery(GET_DIMENSIONS);
  const selectedDimension = useReactiveVar(selectedDimensionVar);

  useEffect(() => {
    if (data?.first?.results[0] && !selectedDimension) {
      selectedDimensionVar(data?.first?.results[0].dimension);
    }
  }, [data, selectedDimension]);

  if (loading) return <ProgressSpinner style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }} />;

  const dimensions = [...(new Set([...data.first.results, ...data.second.results, ...data.third.results].map(item => item.dimension)))]

  const handleSelect = (e) => selectedDimensionVar(e.value)

  return (
    <Panel header="Actions" className="mb-4">
      <Dropdown
        value={selectedDimension}
        options={dimensions}
        onChange={handleSelect}
        placeholder="Select a Location"
      />
    </Panel>

  )
}
