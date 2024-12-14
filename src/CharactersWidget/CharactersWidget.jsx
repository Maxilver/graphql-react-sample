import { Panel } from 'primereact/panel';
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_LOCATIONS_BY_DIMENSION, selectedDimensionVar } from "../apollo/index.js";
import { ProgressSpinner } from "primereact/progressspinner";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useMemo } from "react";

export default function CharactersWidget () {
  const selectedDimension = useReactiveVar(selectedDimensionVar);

  const { loading, error, data } = useQuery(GET_LOCATIONS_BY_DIMENSION, {
    variables: {
      dimension: selectedDimension,
    }
  });

  console.log(data);

  const characters = useMemo(() => {
    if (!data || !data.locations && !data.locations.results) {
      return [];
    }

    const charactersItems = data.locations.results.map(location => location.residents).flat()

    console.log(charactersItems);

    return charactersItems.map((character) => ({
      name: character.name,
      species: character.species,
      gender: character.gender,
      image: character.image,
    }));
  }, [data]);

  const imageBodyTemplate = (rowData) => (
    <img src={rowData.image} alt={rowData.name} style={{ width: '50px', borderRadius: '50%' }}/>
  );

  return (
    <Panel header="Characters" className="no-padding-content" style={{minHeight: '695px'}}>
      {loading ? (
        <ProgressSpinner/>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div style={{ padding: '0' }}>
          <DataTable value={characters} scrollable scrollHeight="600px" style={{}} responsiveLayout="scroll">
            <Column header="Image" body={imageBodyTemplate}/>
            <Column field="name" header="Name" sortable/>
            <Column field="species" header="Species" sortable/>
            <Column field="gender" header="Gender" sortable/>
          </DataTable>
        </div>
      )}
    </Panel>

  )
}
