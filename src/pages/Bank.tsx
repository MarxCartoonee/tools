import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Strings from '../shared/strings';

function Bank() {
  const [value, setValue] = useState('');
  const [bankNo, setBankNo] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ctrlNo, setCtrlNo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (value == null) {
      setError('Loading...');
      return;
    }
    const raw = value.replaceAll(/[^\d]/g, '');
    if (raw.length > 18) {
      setError('Input is too long');
      return;
    }
    const groups = /(\d{3})(\d{0,13})(\d{2})/.exec(raw)!;
    if (groups == null) {
      setError('No valid match');
      return;
    }
    const [_bankNo, _accountNo, _ctrlNo] = groups
      .slice(1)
      .map((v, i) => (i === 1 ? v.padStart(13, '0') : v));

    setError('');
    setBankNo(_bankNo);
    setAccountNo(_accountNo);
    setCtrlNo(_ctrlNo);
  }, [value]);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">{Strings.BANK_TITLE}</div>
        <div className="title-bar-controls">
          <Link to="/">
            <button aria-label="Close"></button>
          </Link>
        </div>
      </div>
      <div className="window-body">
        <fieldset className="input-wrapper">
          <div className="field-row">
            <label>Bank account number</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </fieldset>
      </div>
      <div className="status-bar">
        {error ? (
          <div className="status-bar-field">{error}</div>
        ) : (
          <>
            <div className="status-bar-field">{bankNo}</div>
            <div className="status-bar-field">{accountNo}</div>
            <div className="status-bar-field">{ctrlNo}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Bank;
