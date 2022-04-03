import { StyleSheet } from 'react-native';
import { BookList, Volume } from './booklist';
import { SignIn } from './signin';

const emptyVolume: Volume = {
  title: '',
  authors: [],
  publisher: '',
  publishedDate: '',
  description: '',
  industryIdentifiers: [],
  readingModes: {
      text: true,
      image: true,
  },
  pageCount: 0,
  printType: '',
  categories: [],
  maturityRating: '',
  allowAnonLogging: true,
  contentVersion: '',
  panelizationSummary: {
      containsEpubBubbles: true,
      containsImageBubbles: true,
  },
  imageLinks: {
      smallThumbnail: '',
      thumbnail: '',
  },
  language: '',
  previewLink: '',
  infoLink: '',
  canonicalVolumeLink: '',
};

const createVolume = (isbn: string, title: string, author: string, url: string): Volume => {
  return {
    ...emptyVolume,
    title,
    authors: [author],
    imageLinks: {
      smallThumbnail: url,
      thumbnail: ''
    },
    industryIdentifiers: [
      { type: 'ISBN 13', identifier: isbn },
    ]
  };
};

export default function App() {
  const volumes = [
    createVolume('0', 'The Left Hand of Darkness', 'Ursula K. LeGuin', 'http://books.google.com/books/content?id=MDveDQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'),
    createVolume('1', 'The Fellowship of the Ring', 'J R. R. Tolkein', 'http://books.google.com/books/content?id=MDveDQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'),
    createVolume('2', 'Dune', 'Frank Herbert', 'http://books.google.com/books/content?id=MDveDQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'),
    createVolume('3', 'The Handmaid\'s Tale', 'Margret Atwood', 'http://books.google.com/books/content?id=MDveDQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'),
  ];
  return (
    // <SignIn volumes={volumes}/>
    <SignIn />
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
