import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Menu } from 'primereact/menu';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

function App () {
  const menuItems = [
    { label: 'Main', icon: 'pi pi-home' },
    { label: 'Another', icon: 'pi pi-chart-bar' },
  ];

  const [count, setCount] = useState(1)

  const addCount = () => setCount((count) => count + 1);

  return (
    <>
      <PrimeReactProvider>
        <div className="grid h-screen">
          {/* Vertical Navigation Panel */}
          <div className="col-2 border-right-1 surface-border">
            <Menu model={menuItems} className="mt-4"/>
          </div>

          <div className="col-10">
            {/* Action Panel at the Top */}
            <Panel header="Actions" className="mb-4">
              <Button onClick={addCount} className="p-button-text mr-2">Action {count}</Button>
              <Button label="Action 2" className="p-button-text mr-2"/>
              <Button label="Action 3" className="p-button-text"/>
            </Panel>

            {/* Widgets Grid */}
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
          </div>
        </div>
      </PrimeReactProvider>
    </>
  )
}

export default App
