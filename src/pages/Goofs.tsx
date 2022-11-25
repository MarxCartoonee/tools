import Strings from '../shared/strings';

function Goofs() {
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">{Strings.GOOFS_TITLE}</div>
      </div>
      <div className="window-body">
        <p>Bunch of goofy shit that is absolutely not useful</p>
      </div>
    </div>
  );
}

export default Goofs;
