import Strings from '../shared/strings';

function Home() {
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">{Strings.TOOLS_TITLE}</div>
      </div>
      <div className="window-body">
        <p>Bunch of stupid tools that may or may not be useful</p>
      </div>
    </div>
  );
}

export default Home;
