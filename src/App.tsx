import '98.css';
import './App.scss';

import { useEffect } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { Link, Outlet } from 'react-router-dom';
import Strings from './shared/strings';

type Theme = '98' | 'XP';

function App() {
  const { switcher, currentTheme, status } = useThemeSwitcher();

  useEffect(() => {
    setTheme((localStorage.getItem('theme') as Theme) || '98');
  });

  const setTheme = (theme: Theme) => {
    switcher({ theme });
    localStorage.setItem('theme', theme);
  };

  return (
    <div className="app-wrapper">
      {status === 'loading' ? (
        <div className="window loader-window">
          <div className="title-bar">
            <div className="title-bar-text">Loading...</div>
          </div>
          <div className="window-body">
            <p>Hold your horses</p>
            <progress></progress>
          </div>
        </div>
      ) : (
        <>
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
          <div className="app-content">
            <Outlet />
          </div>
          <footer className="app-footer surface status-bar">
            <div className="status-bar-field">&copy; 2022 Marx Cartoonee</div>
            <div className="field-row">
              <label>Theme</label>
              <select
                value={currentTheme}
                onChange={(e) => setTheme(e.target.value as Theme)}
              >
                <option value="98">98</option>
                <option value="XP">XP</option>
              </select>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
