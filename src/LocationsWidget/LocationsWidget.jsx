import { Panel } from 'primereact/panel';
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_LOCATIONS_BY_DIMENSION, selectedDimensionVar } from "../apollo/index.js";
import { ProgressSpinner } from "primereact/progressspinner";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMemo } from "react";

export default function LocationsWidget () {
  const selectedDimension = useReactiveVar(selectedDimensionVar);

  const { loading, error, data } = useQuery(GET_LOCATIONS_BY_DIMENSION, {
    variables: {
      dimension: selectedDimension,
    }
  });

  const locations = useMemo(() => {
    if (!data || !data.locations && !data.locations.results) {
      return [];
    }

    return data.locations.results.map((character) => ({
      id: character.id,
      name: character.name,
      type: character.type,
    }));
  }, [data]);

  return (
    <Panel header="Characters" className="no-padding-content" style={{minHeight: '695px'}}>
      {loading ? (
        <ProgressSpinner/>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div style={{ padding: '0' }}>
          <DataTable value={locations} scrollable scrollHeight="650px" style={{}} responsiveLayout="scroll">
            <Column field="id" header="ID" sortable/>
            <Column field="name" header="Name" sortable/>
            <Column field="type" header="Type" sortable/>
          </DataTable>
        </div>
      )}
    </Panel>

  )
}
