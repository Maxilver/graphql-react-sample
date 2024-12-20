import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";

import { PrimeReactProvider } from 'primereact/api';
import { Menu } from 'primereact/menu';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './App.css'

import Dashboard from './Dashboard/Dashboard.jsx'
import Details from './Details/Details.jsx'
import ActionsPanel from "./ActionsPanel/ActionsPanel.jsx";

import { apolloClient } from "./apollo/index.js";

function App () {
  // Router items.
  const menuItems = [
    { label: 'Main', template: (item, options) => <Link to="/" className={options.className}>{item.label}</Link> },
    { label: 'Details', template: (item, options) => <Link to="/details" className={options.className}>{item.label}</Link> },
  ];


  return (
    <Router>
      <ApolloProvider client={apolloClient}>
        <PrimeReactProvider>
          <div className="grid h-screen">
            {/* Vertical Navigation Panel */}
            <div className="col-2 border-right-1 surface-border">
              <Menu model={menuItems} className="mt-4"/>
            </div>

            <div className="col-10">
              <ActionsPanel />

              <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/details" element={<Details/>}/>
              </Routes>
            </div>
          </div>
        </PrimeReactProvider>
      </ApolloProvider>
    </Router>
  )
}

export default App
