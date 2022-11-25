import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  function formatInput(inputValue: string): string {
    const raw = inputValue.replaceAll(/[^\d]/g, '');
    if (raw.length > 18) {
      throw new Error('Too many digits');
    }
    const groups = /(\d{3})(\d{0,13})(\d{2})/.exec(raw)!;
    return groups.slice(1).join('-');
  }

  return (
    <div className="App">
      <input type="text" ref={input} />
      <p>{formatInput(input.current!.value)}</p>
    </div>
  );
}

export default App;
