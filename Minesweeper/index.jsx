import { Button, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { resetSquares, clearSquare } from './squares';

import Square from './Square';

const Minesweeper = ({ squares, resetSquares, clearSquare }) => {
  useEffect(() => void resetSquares(), []);
  const [gameover, setGameover] = useState(false);

  const pressSquare = ([x, y]) => {
    clearSquare([x, y])
    if (squares[x][y].hasMine) setGameover(true);
  };

  const newGame = () => {
    resetSquares();
    setGameover(false);
  };

  return (
    <View>
      {gameover && <Text>Game Over</Text>}
      <Button title='Reset' onPress={() => newGame()} />
      {squares.map((row, r) => (
        <View key={r} style={{flexDirection: 'row'}}>
          {row.map((square, c) => (
            <Square square={square} clearSquare={() => !gameover && pressSquare([r, c])} key={c} />
          ))}
        </View>
      ))}
    </View>
  );
};

export default connect(({ squares }) => ({ squares }), { resetSquares, clearSquare })(Minesweeper);
