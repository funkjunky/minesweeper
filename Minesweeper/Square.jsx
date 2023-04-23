import { Pressable, Text } from 'react-native';

const Square = ({ square: { hasMine, minesAround, cleared }, clearSquare }) => {
  const title = hasMine ? 'x' : minesAround;
  return (
    <Pressable onPress={clearSquare} style={{flexDirection: 'row', backgroundColor: 'gray', border: 'solid 2px black'}}>
      <Text style={{fontFamily: 'monospace'}}>{cleared ? title : ' '}</Text>
    </Pressable>
  );
}

export default Square;
