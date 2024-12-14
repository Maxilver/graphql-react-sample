import { useMemo, useState } from 'react'
import { Panel } from 'primereact/panel';
import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../apollo/index.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate, useLocation } from "react-router";


export default function Details () {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialPage = parseInt(params.get('page') || '1', 10);

  const [page, setPage] = useState(initialPage);

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
    const newPage = event.page + 1;
    setPage(event.page + 1);

    // Update the URL with the new pagination parameters
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', newPage);


    navigate({
      pathname: location.pathname,
      search: newParams.toString(),
    });

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
