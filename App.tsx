import { StyleSheet } from 'react-native';
import { BookList } from './booklist';

export default function App() {
  return (
    <BookList/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
