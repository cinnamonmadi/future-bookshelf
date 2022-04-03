import { SafeAreaView, View, StyleSheet, Platform, StatusBar, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const SignIn = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        // TODO add webClient / androidClient ID?
        GoogleSignin.configure({
            scopes: ['books'], 
            webClientId: '166237020384-bd66kmrd5mf9kg7jsum1lnmc1c62i2h2.apps.googleusercontent.com',
            iosClientId: '166237020384-uq3c9l8gis41uefogkhernmvhie3e2l2.apps.googleusercontent.com', 
            offlineAccess: true, 
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            setLoggedIn(true);
            const credential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(credential);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('PLAY_SERVICES_NOT_AVAILABLE');
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setLoggedIn(false);
            setUserInfo([]);
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <SafeAreaView style={signInStyles.signIn}>
            <View style={signInStyles.headerBox}>
                <Text style={{ ...signInStyles.headerText, fontWeight: 'bold'}}>Tsundoku</Text>
                <Text style={signInStyles.pronunciationText}>
                    <Text> /ˈsʌn.doʊ.kuː/ </Text>
                    <Text style={{fontStyle: 'italic'}}>noun.</Text> 
                </Text>
                <Text style={signInStyles.definitionText}>The practice of buying a lot of books and keeping them in a pile because you intend to read them but have not done so yet</Text>
            </View>
            <View style={signInStyles.googleSignInBox}>
                <GoogleSigninButton
                    style={{ width: 200, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                />
            </View>
        </SafeAreaView>
    );
};

const signInStyles = StyleSheet.create({
    signIn: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f5f5f5',
        height: '100%',
    },
    headerBox: {
        paddingHorizontal: '10%',
        paddingTop: '30%',
    },
    headerText: {
        fontSize: 26,
    },
    pronunciationText: {
        fontSize: 14,
        paddingTop: 8,
    },
    definitionText: {
        fontSize: 16,
        paddingTop: 10,
    },
    googleSignInBox: {
        paddingHorizontal: '10%',
        paddingTop: '15%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
