import { useState } from 'react'
import { Panel } from 'primereact/panel';
import CharactersWidget from "../CharactersWidget/CharactersWidget.jsx";
import LocationsWidget from "../LocationsWidget/LocationsWidget.jsx";

export default function Dashboard () {

  const [someState, setSomeState] = useState({})

  return (

    <div className="grid">
      {/* Widget 1 */}
      <div className="col-6">
        <CharactersWidget/>
      </div>

      {/* Widget 2 */}
      <div className="col-6">
        <LocationsWidget />
      </div>
    </div>

  )
}
