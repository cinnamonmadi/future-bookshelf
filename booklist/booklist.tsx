import { ScrollView, View, Text, Image } from "react-native";

export const BookList = () => {
    return (
        <ScrollView>
            <Text style={{ fontSize: 36, fontWeight: 'bold', paddingLeft: 10 }}>Book List</Text>
            <BookListItem></BookListItem>
            <BookListItem></BookListItem>
            <BookListItem></BookListItem>
            <BookListItem></BookListItem>
            <BookListItem></BookListItem>
            <BookListItem></BookListItem>
            <BookListItem></BookListItem>
            <BookListItem></BookListItem>
        </ScrollView>
    );
}

const BookListItem = () => {
    return (
        <View style={{ borderBottomColor: '#f5f5f5', borderBottomWidth: 2 }}>
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <Image
                source={{
                    uri: 'http://books.google.com/books/content?id=MDveDQAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
                }}
                style={{ width: 96, height: 146, backgroundColor: '#000', shadowColor: '#000', shadowOpacity: 1, shadowRadius: 10, }} />
                <View style={{ justifyContent: 'center', width: '60%', paddingLeft: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>The Left Hand of Darkness</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', paddingTop: 2, }}>Ursula K. LeGuin</Text>
                </View>
            </View>
        </View>
    );
}