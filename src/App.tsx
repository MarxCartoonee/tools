import { useCallback, useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState('');

  const formatInput = useCallback((): string => {
    if (value == null) {
      return 'Loading...';
    }
    const raw = value.replaceAll(/[^\d]/g, '');
    console.debug({ raw });
    if (raw.length > 18) {
      return 'Input is too long';
    }
    const groups = /(\d{3})(\d{0,13})(\d{2})/.exec(raw)!;
    if (groups == null) {
      return 'No valid match';
    }
    return groups
      .slice(1)
      .map((v, i) => (i === 1 ? v.padStart(13, '0') : v))
      .join('-');
  }, [value]);

  return (
    <div className="App">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>{formatInput()}</p>
    </div>
  );
}

export default App;
