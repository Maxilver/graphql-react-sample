import { useState } from 'react'
import { Panel } from 'primereact/panel';

export default function Details () {

  const [someState, setSomeState] = useState({})

  return (

    <Panel header="Dashboard"><p>This is the Another page.</p></Panel>

  )
}
