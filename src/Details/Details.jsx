import { useState } from 'react'
import { useQuery } from "@apollo/client";
import { useNavigate, useLocation } from "react-router";

import { Panel } from 'primereact/panel';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { GET_EPISODES } from "../apollo/index.js";

export default function Details () {
  // Router hooks to work with URI page navigation
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialPage = parseInt(params.get('page') || '1', 10);

  // Paginator in-component state.
  const [page, setPage] = useState(initialPage);

  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    // Provide page state as an argument to query. New Query will be triggered on state change.
    variables: {
      page,
    }
  });

  // Event handler for pagination
  const onPage = (event) => {
    const newPage = event.page + 1;
    setPage(event.page + 1);

    // Update the URI with the new pagination parameters
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', newPage);
    navigate({ pathname: location.pathname, search: newParams.toString() });

    refetch({ page: newPage });
  };

  return (
    <Panel header="Episodes" className="no-padding-content">

      <div style={{ padding: '0' }}>
        <DataTable
          value={data?.episodes?.results || []}
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
