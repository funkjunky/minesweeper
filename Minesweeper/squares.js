import {createSlice} from '@reduxjs/toolkit';

const ten = [1,2,3,4,5,6,7,8,9,10];
const createArrayTo = (length, value={}) => {
  const arr = [];
  for(let i=0; i!=length; ++i)  arr.push(value);
  return arr;
};

const squares = createSlice({
  name: 'squares',
  initialState: createArrayTo(10, createArrayTo(10)),
  reducers: {
    resetSquares: state => {
      // clear
      state.forEach(squares => squares.forEach(square => {
        square.hasMine = false;
        square.minesAround = 0;
        square.cleared = false;
        square.flagged = false;
      }))

      // add new mines
      let minesLeft = 10;
      while(minesLeft > 0) {
        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 10);

        if(!state[x][y].hasMine) {
          state[x][y].hasMine = true;

          // Add to minesAround
          for(let i = x - 1; i <= x + 1; ++i)
            for(let k = y - 1; k <= y + 1; ++k) // TODO: no optional chaining in react native??!?!? 
              state[i] && state[i][k] && ++state[i][k].minesAround;

          --minesLeft;
        }
      }
    },

    clearSquare: (state, { payload: [x, y] }) => {
      const clearSquaresAroundIfZero = (state, x, y) => {
        if (state[x][y].cleared) return;

        state[x][y].cleared = true;

        // if zero, then reveal all connecting zeros
        if (state[x][y].minesAround === 0) {
          for(let i = x - 1; i <= x + 1; ++i)
            for(let k = y - 1; k <= y + 1; ++k)
              state[i] && state[i][k] && clearSquaresAroundIfZero(state, i, k)
        }
      };

      clearSquaresAroundIfZero(state, x, y);
    },

    flagSquare: (state, { payload: [x, y] }) => void (state[x][y].flagged = !state[x][y].flagged),
  },
});

export const { resetSquares, clearSquare, flagSquare } = squares.actions;
export default squares.reducer;
