import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Strings from '../shared/strings';

function Dutch() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const isUppercase = input === input.toLocaleUpperCase();

    let str = input
      .replace(/nilesy/gi, (match) => `${match.slice(0, 1)}isley`)
      .replace(
        /s+/gi,
        (match) =>
          `${match.slice(0, 1)}${Array(match.length).fill('h').join('')}`
      )
      .replace(/g/g, 'k')
      .replace(/G/g, 'K');

    if (isUppercase) {
      str = str.toLocaleUpperCase();
    }

    setOutput(str);
  }, [input]);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">{Strings.DUTCH_TITLE}</div>
        <div className="title-bar-controls">
          <Link to="/goofs">
            <button aria-label="Close"></button>
          </Link>
        </div>
      </div>
      <div className="window-body io-body">
        <fieldset className="input-wrapper">
          <div className="field-row-stacked">
            <label>English</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
        </fieldset>
        <fieldset className="output-wrapper">
          <div className="field-row-stacked">
            <label>Dutch</label>
            <textarea readOnly value={output}></textarea>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Dutch;
