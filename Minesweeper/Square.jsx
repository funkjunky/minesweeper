import { Pressable, Text } from 'react-native';

const Square = ({ square: { hasMine, minesAround, cleared }, clearSquare }) => {
  const title = hasMine ? 'x' : minesAround;
  let style = {
    flexDirection: 'row',
    backgroundColor: '#DDD',
    border: 'solid 2px #DDD',
  };
  if (!cleared) {
    style = {
      ...style,
      border: undefined,
      borderLeft: 'solid 2px #FFF',
      borderTop: 'solid 2px #FFF',
      borderRight: 'solid 2px #888',
      borderBottom: 'solid 2px #888',
    };
  }
  return (
    <Pressable onPress={clearSquare} style={style}>
      <Text style={{fontFamily: 'monospace', fontSize: 24}}>{cleared ? title : ' '}</Text>
    </Pressable>
  );
}

export default Square;
