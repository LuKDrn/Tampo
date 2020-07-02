// Second screen which we will use to get the data
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, TouchableWithoutFeedback, SafeAreaView, StatusBar, LayoutAnimation, TouchableOpacity, Keyboard, Dimensions, FlatList, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'
import Fire from "../Fire";
//import all the components we are going to use.

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
const instumentsItems = [
    {
        id: 1,
        name: 'Guitare',
        image: 'https://icons.iconarchive.com/icons/unclebob/spanish-travel/512/guitar-icon.png',
        selected: false
    },
    {
        id: 2,
        name: 'Piano',
        image: 'https://cdn.icon-icons.com/icons2/898/PNG/512/grand_piano_musical_instrument_icon-icons.com_69215.png',
        selected: false
    },
    {
        id: 3,
        name: 'Chant',
        image: 'https://image.flaticon.com/icons/png/512/1028/1028382.png',
        selected: false
    },
    {
        id: 4,
        name: 'Batterie',
        image: 'https://images.vexels.com/media/users/3/184277/isolated/preview/0818d1014d8faaf2b3524ebcff2c0685-music-drums-icon-by-vexels.png',
        selected: false
    },
    {
        id: 5,
        name: 'Basse',
        image: 'https://cdn.icon-icons.com/icons2/661/PNG/512/bass-guitar_icon-icons.com_60128.png',
        selected: false
    }
]
const genresItems = [{
    name: 'Rock',
},
{
    name: 'Rap'
},
{
    name: 'RnB'
},
{
    name: 'Pop'
}
]
const pratiquesItems = [{
    name: 'Professionnel'
},
{
    name: 'Loisir'
}]


class RegisterSecond extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            user: {
                name: this.props.navigation.getParam('userName'),
                email: this.props.navigation.getParam('userMail'),
                password: this.props.navigation.getParam('userPassword'),
                avatar: this.props.navigation.getParam('userAvatar'),
                instruments: [],
                genres: [],
                pratiques: []
            },
            errorMessage: null,
        })
    }
    onPressHandler(name) {
        let renderData = [instumentsItems];
        for (let data of renderData) {
            if (data.name === name) {
                console.log(data.selected);
                data.selected = (data.selected == null) ? true : !data.selected;
                break;
            }
        }
        this.setState(prevState => {
            let user = Object.assign({}, prevState.user);  // creating copy of state variable jasper
            user.instruments.push(name);  // update the name property, assign a new value                    
            return { user }
        })
    }

    // handleSignUp = (user) => {
    //     Fire.shared.createUser(user);
    // };

    render() {
        LayoutAnimation.easeInEaseOut();
        const user = this.state;
        return (
            <DismissKeyboard>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content"></StatusBar>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="ios-arrow-round-back" size={32} color={"#FFF"}></Ionicons>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>

                        <View style={styles.form}>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={styles.inputTitle}>Instrument(s)</Text>
                                <View style={{ display: 'flex' }}>
                                    <FlatList
                                        horizontal={true}
                                        data={instumentsItems}
                                        keyExtractor={item => item.name}
                                        showsHorizontalScrollIndicator={true}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => this.onPressHandler(item.name)} style={{ marginHorizontal: 5, color: '#FFF' }}>
                                                <Card
                                                    style={
                                                        item.selected == true
                                                            ? {
                                                                padding: 10,
                                                                borderRadius: 5,
                                                                backgroundColor: '#75EAEA',
                                                            }
                                                            : {
                                                                padding: 10,
                                                                borderRadius: 5,
                                                                backgroundColor: '#333333',
                                                                textAlign:'center',
                                                                justifyContent: 'center'
                                                            }
                                                    }>
                                                    <Image style={styles.iconItem}
                                                        source={{ uri: item.image, }} />
                                                    <Text style={{ fontWeight: 'bold', color: '#FFF' }}>{item.name}</Text>
                                                </Card>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </View>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={styles.inputTitle}>Niveau de pratique</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.userBtnRegister} onPress={this.handleSignUp}>
                            <Text style={styles.textBtn}>Que l'aventure commence ! </Text>
                        </TouchableOpacity>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Loading')}>
                                <Text style={styles.textBtnCreate}>Déjà un compte ? </Text>
                                <Text style={styles.textBtnCreate, { color: "#E616E6", textAlign: 'center', fontWeight: 'bold' }}>Utilise-le  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </DismissKeyboard>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#14142d',
        height: Dimensions.get('window').height * 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingVertical: 8,
        shadowColor: "rgb(13, 16, 33)",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    back: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        marginVertical: 22,
        width: '80%',
    },
    inputTitle: {
        color: "#FFF",
        fontSize: 12,
        textTransform: "uppercase",
        marginBottom: 10
    },
    userBtnRegister: {
        width: '80%',
        backgroundColor: '#E616E6',
        color: '#FFF',
        padding: 15,
        marginVertical: 15,
        borderRadius: 4,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnContainer: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textBtn: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    textBtnCreate: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
        marginVertical: 2
    },
    iconItem: {
        width: 44,
        height: 44,
        borderRadius: 68,
    },
})

export default (RegisterSecond)