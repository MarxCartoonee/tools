import { Link, useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">OOPS!</div>
        <div className="title-bar-controls">
          <Link to="/">
            <button aria-label="Close"></button>
          </Link>
        </div>
      </div>
      <div className="window-body">
        <p>Something went terribly horribly wrong!</p>
        <Link to="/">
          <button>OK</button>
        </Link>
      </div>
    </div>
  );
}

export default Error;
