import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, Platform, StatusBar } from "react-native";
import React, { useEffect, useState } from 'react';
import { Volume } from './types';
import Foundation from '@expo/vector-icons/Foundation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RootStackParams } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type BookListProps = NativeStackScreenProps<RootStackParams, 'BookList'>

export interface BookListItemProps {
    volume: Volume;
    index: number;
};


export const BookList: React.FC<BookListProps> = ({ navigation }: BookListProps)  => {
    const [volumes, setVolumes] = useState([]);

    const awaitAndHandleSignIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (!isSignedIn) {
            navigation.navigate('SignIn');
        } 
    }; 

    useEffect(() => { 
        awaitAndHandleSignIn(); 
    }, []);

    useEffect(() => {
        fetch('https://www.googleapis.com/books/v1/volumes?q=The Left Hand of Darkness').then((response) => response.json()).then((response) => {
            response.items.slice(10);
            setVolumes(response.items.map((item: any) => item.volumeInfo));
            console.log(response.items.length);
        });
    }, []);

    return (
        <SafeAreaView style={bookListStyles.bookList}>
            <ScrollView>
                <Text style={bookListStyles.listHeaderText}>Book List</Text>
                {volumes && volumes.map((volume, index) => <BookListItem volume={volume} index={index} />)}
            </ScrollView>
        </SafeAreaView>
    );
}

const BookListItem: React.FC<BookListItemProps> = ({ volume, index }: BookListItemProps) => {
    return (
        <View key={index} style={bookListStyles.listItemWrapper}>
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