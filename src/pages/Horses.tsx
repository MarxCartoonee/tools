import { capitalize, chunk, random } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Strings from '../shared/strings';
import './Horses.scoped.css';

enum Mode {
  hlhm,
  glhf,
}

const minLengths: Record<Mode, number> = {
  [Mode.hlhm]: 2,
  [Mode.glhf]: 4,
};

const segments: Record<Mode, Array<string>> = {
  [Mode.hlhm]: ['head', 'less', 'horse', 'man'],
  [Mode.glhf]: ['good', 'luck', 'have', 'fun'],
};

const clocks = {
  '01:00': '🕐',
  '02:00': '🕑',
  '03:00': '🕒',
  '04:00': '🕓',
  '05:00': '🕔',
  '06:00': '🕕',
  '07:00': '🕖',
  '08:00': '🕗',
  '09:00': '🕘',
  '10:00': '🕙',
  '11:00': '🕚',
  '12:00': '🕛',
  '01:30': '🕜',
  '02:30': '🕝',
  '03:30': '🕞',
  '04:30': '🕟',
  '05:30': '🕠',
  '06:30': '🕡',
  '07:30': '🕢',
  '08:30': '🕣',
  '09:30': '🕤',
  '10:30': '🕥',
  '11:30': '🕦',
  '12:30': '🕧',
} as const;

const titles: Record<Mode, string> = {
  [Mode.hlhm]: '🐴👨🕑',
  [Mode.glhf]: 'glhf',
};

function readLocalStorage<D>(key: string): D | null {
  const value = localStorage.getItem(key);
  return value ? (JSON.parse(value) as D) : null;
}

function writeLocalStorage<D>(key: string, value: D): void {
  localStorage.setItem(key, JSON.stringify(value));
}

const initialMode = readLocalStorage<Mode>('mode') || Mode.hlhm;
const initialAccurateClock =
  readLocalStorage<boolean>('accurateClock') || false;
const initialTotalInsanity =
  readLocalStorage<boolean>('totalInsanity') || false;
const initialCompoundCount =
  readLocalStorage<number>('compoundCount') || minLengths[Mode.hlhm];

function getInsanityLength(mode: Mode, compoundCount: number) {
  switch (mode) {
    case Mode.hlhm:
      return compoundCount * 2;
    case Mode.glhf:
    default:
      return compoundCount;
  }
}

function getClock() {
  const d = new Date();
  const hours = d.getHours();
  const adjustedHours = hours % 12;
  d.setHours(adjustedHours);
  const minutes = d.getMinutes();
  const adjustedMinutes = minutes < 30 ? 0 : 30;
  d.setMinutes(adjustedMinutes);
  const timeStr = d.toTimeString().slice(0, 5) as keyof typeof clocks;
  const clock = clocks[timeStr];
  return clock;
}

function concatName(nameArr: Array<string>, clock: string, mode: Mode) {
  switch (mode) {
    case Mode.hlhm:
    default:
      const arr = chunk(nameArr, 2);
      return `${arr
        .map((compound) =>
          compound.map((v, i) => (i % 2 === 0 ? capitalize(v) : v)).join('')
        )
        .join(' ')} ${clock}`;

    case Mode.glhf:
      return `${nameArr.map(capitalize).join(' ')} ${clock}`;
  }
}

function compose(
  mode: Mode,
  accurateClock: boolean,
  totalInsanity: boolean,
  numberOfSegments: number
) {
  const segs = segments[mode].slice(0);
  const length = totalInsanity
    ? getInsanityLength(mode, numberOfSegments)
    : segs.length;
  const nameArr = [];
  const clockArr = Object.values(clocks);
  const clock = accurateClock
    ? getClock()
    : clockArr[random(0, clockArr.length - 1)];

  let k = 0;
  for (let i = 0; i < length; i++) {
    k = random(0, segs.length - 1);
    nameArr.push(segs[k]);
    if (!totalInsanity) {
      segs.splice(k, 1);
    }
  }

  const name = concatName(nameArr, clock, mode);

  return name;
}

function Horses() {
  const [mode, setMode] = useState(initialMode);
  const [accurateClock, setAccurateClock] = useState(initialAccurateClock);
  const [totalInsanity, setTotalInsanity] = useState(initialTotalInsanity);
  const [compoundCount, setCompoundCount] = useState(initialCompoundCount);
  const [title, setTitle] = useState<string>('');
  const [output, _setOutput] = useState('');

  useEffect(() => {
    writeLocalStorage('mode', mode);
    setTitle(titles[mode]);
  }, [mode]);
  useEffect(() => {
    writeLocalStorage('accurateClock', accurateClock);
  }, [accurateClock]);
  useEffect(() => {
    writeLocalStorage('totalInsanity', totalInsanity);
  }, [totalInsanity]);
  useEffect(() => {
    const count = Math.max(compoundCount, minLengths[mode]);
    if (count !== compoundCount) {
      setCompoundCount(count);
      return;
    }
    writeLocalStorage('compoundCount', count);
  }, [compoundCount, mode]);

  const setOutput = useCallback(() => {
    _setOutput(compose(mode, accurateClock, totalInsanity, compoundCount));
  }, [mode, accurateClock, totalInsanity, compoundCount]);

  useEffect(() => {
    setOutput();
  }, [setOutput]);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">
          {Strings.HORSES_TITLE}: {title}
        </div>
        <div className="title-bar-controls">
          <Link to="/goofs">
            <button aria-label="Close"></button>
          </Link>
        </div>
      </div>
      <div className="window-body io-body">
        <fieldset className="input-wrapper">
          <div className="field-row mode-select">
            <label>Mode</label>
            <select
              onChange={(e) => setMode(e.target.value as unknown as Mode)}
            >
              <option value={Mode.hlhm}>{titles[Mode.hlhm]}</option>
              <option value={Mode.glhf}>{titles[Mode.glhf]}</option>
            </select>
          </div>
          <div className="field-row">
            <input
              type="checkbox"
              id="accurate-clock"
              checked={accurateClock}
              onChange={(e) => setAccurateClock(e.target.checked)}
            />
            <label htmlFor="accurate-clock">Accurate clock?</label>
          </div>
          <div className="field-row">
            <input
              type="checkbox"
              id="total-insanity"
              checked={totalInsanity}
              onChange={(e) => setTotalInsanity(e.target.checked)}
            />
            <label htmlFor="total-insanity">Total Insanity?</label>
          </div>
          {totalInsanity && (
            <div className="field-row compount-count">
              <label>No. of segments</label>
              <input
                type="number"
                value={compoundCount}
                onChange={(e) => setCompoundCount(+e.target.value)}
              />
            </div>
          )}
          <button onClick={() => setOutput()}>Generate</button>
        </fieldset>
        <div className="field-row-stacked">
          <textarea readOnly value={output}></textarea>
        </div>
      </div>
    </div>
  );
}

export default Horses;
