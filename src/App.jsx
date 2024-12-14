import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Menu } from 'primereact/menu';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import { default as Dashboard } from './Dashboard/Dashboard.jsx'
import { default as Details } from './Details/Details.jsx'

function App () {
  const menuItems = [
    { label: 'Main', template: (item, options) => <Link to="/" className={options.className}>{item.label}</Link> },
    { label: 'Details', template: (item, options) => <Link to="/details" className={options.className}>{item.label}</Link> },
  ];

  const [count, setCount] = useState(1)

  const addCount = () => setCount((count) => count + 1);

  return (
    <Router>
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

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/details" element={<Details />} />
            </Routes>
          </div>
        </div>
      </PrimeReactProvider>
    </Router>
  )
}

export default App
