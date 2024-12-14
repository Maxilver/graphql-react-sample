import { useState } from 'react'
import { Panel } from 'primereact/panel';

export default function Dashboard () {

  const [someState, setSomeState] = useState({})

  return (

    <div className="grid">
      {/* Widget 1 */}
      <div className="col-6">
        <Panel header="Widget 1" style={{ height: '300px' }}>
          <p>Content for Widget 1</p>
        </Panel>
      </div>

      {/* Widget 2 */}
      <div className="col-6">
        <Panel header="Widget 2" style={{ height: '300px' }}>
          <p>Content for Widget 2</p>
        </Panel>
      </div>

      {/* Widget 3 */}
      <div className="col-6">
        <Panel header="Widget 3" style={{ height: '300px' }}>
          <p>Content for Widget 3</p>
        </Panel>
      </div>

      {/* Widget 4 */}
      <div className="col-6">
        <Panel header="Widget 4" style={{ height: '300px' }}>
          <p>Content for Widget 4</p>
        </Panel>
      </div>
    </div>

  )
}
