import { Button, View, Text } from 'react-native';
import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';

import { resetSquares, clearSquare, flagSquare } from './squares';

import Square from './Square';

let intervalId;

const Minesweeper = ({ squares, resetSquares, clearSquare, flagSquare }) => {
  useEffect(() => void resetSquares(), []);

  const [gameover, setGameover] = useState(false);
  const [pressedIn, setPressedIn] = useState(false);
  const [gameStartTime, setGameStartTime] = useState();
  const [gameTime, setGameTime] = useState();

  const pressSquare = ([x, y]) => {
    clearSquare([x, y])
    if (!gameStartTime) {
      setGameStartTime(Date.now());
      intervalId = setInterval(() => setGameTime(Date.now()), 100);
    }
    if (squares[x][y].hasMine) {
      setGameover(true);
      clearInterval(intervalId);
    }
  };

  const timePassed = Math.floor((gameTime - gameStartTime) / 1000);

  const newGame = () => {
    resetSquares();
    setGameStartTime(0);
    setGameover(false);
    clearInterval(intervalId);
  };

  const gotVictory = () => !gameover && squares.every(row => row.every(square => square.hasMine || square.cleared))

  const calcMinesLeft = useMemo(
    // TODO: replace 10, with the number of mines known
    () => 10 - squares.reduce((minesLeft, row) =>
      minesLeft + row.filter(s => s.flagged).length
    , 0),
    [squares]
  );

  let title = '🙂';

  if (pressedIn) title = '😯';
  if (gameover) title = '😵';
  if (gotVictory()) {
    title = '😎';
    // hacky: if we win, this will stop the timer.
    intervalId && clearInterval(intervalId);
  }

  const textStyles = {color: '#FCC', backgroundColor: '#F00', font: '24px monospace'};

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={textStyles}>{calcMinesLeft}</Text>
        <Button title={title} onPress={() => newGame()} />
        <Text style={textStyles}>{timePassed || '-'}</Text>
      </View>
      <View>
        {squares.map((row, r) => (
          <View key={r} style={{flexDirection: 'row'}}>
            {row.map((square, c) => (
              <Square
                square={square}
                clearSquare={() => !gameover && !squares[r][c].flagged && pressSquare([r, c])}
                key={c}
                flagSquare={() => !gameover && flagSquare([r, c])}
                onPressIn={() => setPressedIn(true)}
                onPressOut={() => setPressedIn(false)}
                gameover={gameover}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default connect(({ squares }) => ({ squares }), { resetSquares, clearSquare, flagSquare })(Minesweeper);
