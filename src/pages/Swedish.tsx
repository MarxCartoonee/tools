import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Strings from '../shared/strings';

const SvenskLetters = {
  o: 'ø',
  O: 'Ø',
  a: 'å',
  A: 'Å',
} as const;

function Swedish() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const isUppercase = input === input.toLocaleUpperCase();

    let str = input
      .split(' ')
      .map((w) =>
        w
          .split('')
          .map((c) => SvenskLetters[c as keyof typeof SvenskLetters] || c)
          .join('f')
      )
      .join(' ');

    if (isUppercase) {
      str = str.toLocaleUpperCase();
    }

    setOutput(str);
  }, [input]);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">{Strings.SWEDISH_TITLE}</div>
        <div className="title-bar-controls">
          <Link to="/goofs">
            <button aria-label="Close"></button>
          </Link>
        </div>
      </div>
      <div className="window-body io-body">
        <div className="field-row-stacked">
          <label>English</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        <div className="field-row-stacked">
          <label>Swedish</label>
          <textarea readOnly value={output}></textarea>
        </div>
      </div>
    </div>
  );
}

export default Swedish;
