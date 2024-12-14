import { useMemo, useState } from 'react'
import { Panel } from 'primereact/panel';
import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../apollo/index.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function Details () {
  const [page, setPage] = useState(1);

  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: {
      page,
    }
  });

  const episodes = useMemo(() => {
    if (!data || !data.episodes && !data.episodes.results) {
      return [];
    }

    return data.episodes.results.map((episode) => ({
      id: episode.id,
      name: episode.name,
      air_date: episode.air_date,
      episode: episode.episode,
    }));
  }, [data]);


  // Event handler for pagination
  const onPage = (event) => {
    setPage(event.page + 1);
    refetch({ page: event.page + 1 });
  };

  return (
    <Panel header="Episodes" className="no-padding-content">

      <div style={{ padding: '0' }}>
        <DataTable
          value={episodes}
          scrollable
          scrollHeight="650px"
          style={{}}
          responsiveLayout="scroll"
          paginator
          rows={20}
          totalRecords={data?.episodes?.info?.count || 0}
          lazy
          onPage={onPage}
          loading={loading}
        >
          <Column field="id" header="ID"/>
          <Column field="name" header="Name"/>
          <Column field="episode" header="Episode"/>
          <Column field="air_date" header="Air Date"/>
        </DataTable>
      </div>
    </Panel>

  )
}
