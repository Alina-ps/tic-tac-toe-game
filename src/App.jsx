import { useState } from 'react';
import s from './App.module.css';
import { IoMdRadioButtonOff } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

function App() {
  const [data, setData] = useState(['', '', '', '', '', '', '', '', '']);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winningIndices, setWinningIndices] = useState([]);
  const [message, setMessage] = useState('');

  const toggle = (index) => {
    if (lock || data[index] !== '') {
      return;
    }
    const newData = [...data];
    newData[index] = count % 2 === 0 ? 'X' : 'O';
    setData(newData);
    setCount(count + 1);

    checkWin(newData);
  };

  const checkWin = (newData) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newData[a] &&
        newData[a] === newData[b] &&
        newData[a] === newData[c]
      ) {
        setWinningIndices(combination);
        setLock(true);
        setMessage(`Player ${newData[a]} wins!`);
        return;
      }
      if (!newData.includes('')) {
        setMessage("It's a draw!");
        setLock(true);
      }
    }
  };
  const resetGame = () => {
    setData(['', '', '', '', '', '', '', '', '']);
    setCount(0);
    setLock(false);
    setWinningIndices([]);
    setMessage('');
  };

  return (
    <div className={s.container}>
      {message ? (
        <h1 className={s.header}>{message}</h1>
      ) : (
        <h1 className={s.header}>Tic Tac Toe Game</h1>
      )}

      <div className={s.gridContainer}>
        {data.map((value, index) => (
          <div
            key={index}
            className={`${s.item} ${
              winningIndices.includes(index) ? s.winning : ''
            }`}
            onClick={() => toggle(index)}
          >
            {value === 'X' && <RxCross2 />}
            {value === 'O' && <IoMdRadioButtonOff />}
          </div>
        ))}
      </div>
      <button className={s.button} onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

export default App;
