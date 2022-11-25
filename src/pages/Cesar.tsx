import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Strings from '../shared/strings';
import './Cesar.scoped.css';

const mod = (n: number): number => {
  return ((n % 26) + 26) % 26;
};
const upperCaseFirstIndex = 65;
const upperCaseLastIndex = 90;
const lowerCaseFirstIndex = 97;
const lowerCaseLastIndex = 122;

function Cesar() {
  const [input, setInput] = useState('');
  const [rot, setRot] = useState(0);
  const [output, setOutput] = useState('');

  useEffect(() => {
    const output = input
      .split('')
      .map((c) => c.charCodeAt(0))
      .map((cc) => {
        if (cc >= upperCaseFirstIndex && cc <= upperCaseLastIndex) {
          cc = mod(cc - upperCaseFirstIndex + rot) + upperCaseFirstIndex;
        } else if (cc >= lowerCaseFirstIndex && cc <= lowerCaseLastIndex) {
          cc = mod(cc - lowerCaseFirstIndex + rot) + lowerCaseFirstIndex;
        }
        return cc;
      })
      .map((cc) => String.fromCharCode(cc))
      .join('');

    setOutput(output);
  }, [input, rot]);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">{Strings.CESAR_TITLE}</div>
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
          <div className="field-row">
            <input
              type="number"
              min={0}
              max={26}
              value={rot}
              onChange={(e) => setRot(+e.target.value)}
            />
          </div>
        </fieldset>
        <fieldset className="output-wrapper">
          <div className="field-row-stacked">
            <label>Swedish</label>
            <textarea readOnly value={output}></textarea>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Cesar;
