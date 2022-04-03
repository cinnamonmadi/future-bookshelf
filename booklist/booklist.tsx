import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Platform, StatusBar } from "react-native";
import React from 'react';
import { Volume } from './types';
import Foundation from '@expo/vector-icons/Foundation';

export interface BookListProps {
    volumes: Volume[];
};

export interface BookListItemProps {
    volume: Volume;
};


export const BookList: React.FC<BookListProps> = ({ volumes }: BookListProps)  => {
    return (
        <SafeAreaView style={bookListStyles.bookList}>
            <ScrollView>
                <Text style={bookListStyles.listHeaderText}>Book List</Text>
                {volumes.map((volume) => (
                    <BookListItem volume={volume} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const BookListItem: React.FC<BookListItemProps> = ({ volume }: BookListItemProps) => {
    const isbn_identifier = volume.industryIdentifiers.find((industryIdentifier) => industryIdentifier.type === 'ISBN 13');
    const isbn = isbn_identifier === undefined ? '' : isbn_identifier.identifier;
    return (
        <View key={isbn} style={bookListStyles.listItemWrapper}>
            <View style={bookListStyles.listItem}>
                <View style={bookListStyles.listImageWrapper}>
                    <Image
                    source={{
                        uri: volume.imageLinks.smallThumbnail,
                    }}
                    style={bookListStyles.listImage} />
                </View>
                <View style={bookListStyles.listTextWrapper}>
                    <Text style={bookListStyles.listTitleText}>{volume.title}</Text>
                    <Text style={bookListStyles.listAuthorText}>{volume.authors[0]}</Text>
                </View>
                <View style={bookListStyles.listIconWrapper}>
                    <Foundation name='book-bookmark' size={48} color='black' />
                </View>
            </View>
        </View>
    );
}

const bookListStyles = StyleSheet.create({
    bookList: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    listHeaderText: {
        fontSize: 36,
        fontWeight: 'bold',
        paddingLeft: 10,
    },
    listItemWrapper: {
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 2,
    },
    listItem: {
        flexDirection: 'row',
        margin: 10,
    },
    listImageWrapper: {
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOpacity: 1, shadowRadius: 5, shadowOffset: { width: 2, height: 2 } },  
            android: { elevation: 5 },
        }),
    },
    listImage: {
        width: 96, 
        height: 146, 
    },
    listTextWrapper: {
        justifyContent: 'center',
        width: '60%',
        paddingLeft: 15,
    },
    listTitleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    listAuthorText: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingTop: 2,
    },
    listIconWrapper: {
        borderColor: '#ff0000',
        borderWidth: 3,
        justifyContent: 'center',
    },
});