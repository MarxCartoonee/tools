import './App.css';

import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Strings from './shared/strings';

type Theme = '98' | 'XP';

function App() {
  const currentTheme: Theme = localStorage.getItem('theme') as Theme;
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    if (currentTheme === theme) {
      return;
    }
    localStorage.setItem('theme', theme);
    window.location.reload();
  }, [theme]);

  switch (currentTheme) {
    case 'XP':
      import('xp.css');
      break;
    case '98':
    default:
      import('98.css');
      break;
  }

  return (
    <div className="app-wrapper">
      <nav className="main-nav" role="main">
        <ul className="tree-view">
          <li>
            <Link to="/">{Strings.TOOLS_TITLE}</Link>
            <ul>
              <li>
                <Link to="/bank">{Strings.BANK_TITLE}</Link>
              </li>
              <li>
                <Link to="/jwt">{Strings.JWT_TITLE}</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/goofs">{Strings.GOOFS_TITLE}</Link>
            <ul>
              <li>
                <Link to="/swedish">{Strings.SWEDISH_TITLE}</Link>
              </li>
              <li>
                <Link to="/dutch">{Strings.DUTCH_TITLE}</Link>
              </li>
              <li>
                <Link to="/horses">{Strings.HORSES_TITLE}</Link>
              </li>
              <li>
                <Link to="/cesar">{Strings.CESAR_TITLE}</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <Outlet />
      <footer className="app-footer">
        <div className="field-row">
          <label>Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
          >
            <option value="98">98</option>
            <option value="XP">XP</option>
          </select>
        </div>
      </footer>
    </div>
  );
}

export default App;
