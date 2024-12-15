import { useQuery, useReactiveVar } from "@apollo/client";

import { Panel } from 'primereact/panel';
import { ProgressSpinner } from "primereact/progressspinner";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import { GET_LOCATIONS_BY_DIMENSION, selectedDimensionVar } from "../apollo/index.js";

export default function LocationsWidget () {
  // Reactive Apollo Variable would trigger new Query.
  const selectedDimension = useReactiveVar(selectedDimensionVar);

  const { loading, error, data } = useQuery(GET_LOCATIONS_BY_DIMENSION, {
    variables: {
      // Binding reactive Variable
      dimension: selectedDimension,
    }
  });

  return (
    <Panel header="Locations" className="no-padding-content" style={{minHeight: '695px'}}>
      {/* Inline handling of loading and error */}
      {loading ? (
        <ProgressSpinner/>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div style={{ padding: '0' }}>
          <DataTable value={data?.locations?.results || []} scrollable scrollHeight="650px" responsiveLayout="scroll">
            <Column field="id" header="ID" sortable/>
            <Column field="name" header="Name" sortable/>
            <Column field="type" header="Type" sortable/>
          </DataTable>
        </div>
      )}
    </Panel>

  )
}
