import CharactersWidget from "../CharactersWidget/CharactersWidget.jsx";
import LocationsWidget from "../LocationsWidget/LocationsWidget.jsx";

export default function Dashboard () {
  return (
    <div className="grid">
      {/* Widget 1 */}
      <div className="col-6">
        <CharactersWidget/>
      </div>

      {/* Widget 2 */}
      <div className="col-6">
        <LocationsWidget/>
      </div>
    </div>

  )
}
