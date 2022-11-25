import { flow, partialRight } from 'lodash';
import { inflate } from 'pako';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Strings from '../shared/strings';
import './Jwt.scoped.css';

function Jwt() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');

  const writeToken = (token: string): void => {
    const replace = token.replaceAll(/-/g, '+').replaceAll(/_/g, '/');
    setToken(replace);
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    const [rawHeader, rawPayload, rawSignature] = token.split('.').map(atob);

    const ops = [];
    if (JSON.parse(rawHeader).zip === 'GZIP') {
      ops.push(partialRight(inflate, { to: 'string' }));
    }
    ops.push(formatJson);

    setHeader(formatJson(rawHeader));
    setPayload(flow(...ops)(rawPayload));
    setSignature(rawSignature);
  }, [token]);

  const formatJson = (jsonString: string): string =>
    JSON.stringify(JSON.parse(jsonString), null, 2);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">{Strings.JWT_TITLE}</div>
        <div className="title-bar-controls">
          <Link to="/">
            <button aria-label="Close"></button>
          </Link>
        </div>
      </div>
      <div className="window-body io-body">
        <fieldset className="input-wrapper">
          <div className="field-row-stacked">
            <label>JWT Token</label>
            <textarea
              value={token}
              onChange={(e) => writeToken(e.target.value)}
            ></textarea>
          </div>
        </fieldset>
        <fieldset className="output-wrapper">
          <div className="field-row-stacked">
            <label>Header</label>
            <textarea readOnly value={header}></textarea>
          </div>
          <div className="field-row-stacked">
            <label>Payload</label>
            <textarea readOnly value={payload}></textarea>
          </div>
          <div className="field-row-stacked">
            <label>Signature</label>
            <textarea readOnly value={signature}></textarea>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Jwt;
