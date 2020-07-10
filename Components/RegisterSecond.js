// Second screen which we will use to get the data
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, TouchableWithoutFeedback, SafeAreaView, StatusBar, LayoutAnimation, TouchableOpacity, Keyboard, Dimensions, FlatList, Image, Picker} from 'react-native';
import { Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'
import Fire from "../Fire";
//import all the components we are going to use.

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
const sexeItems = [
    {
        id: 1,
        sexe: 'Féminin',
        image: 'https://www.icone-png.com/png/45/45176.png',
        selected: false,
    },
    {
        id: 2,
        sexe: 'Masculin',
        image: 'https://cdn.icon-icons.com/icons2/1077/PNG/512/masculine_77940.png',
        selected: false
    },
    {
        id: 3,
        sexe: 'Non-binaire',
        image: 'https://www.pinclipart.com/picdir/big/2-28389_gender-equality-is-about-celebrating-both-the-sexes.png',
        selected: false
    }
]
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
const stylesItems = [{
    id: 1,
    name: 'Rock',
    image: 'https://static.thenounproject.com/png/6270-200.png',
    selected: false
},
{
    id: 2,
    name: 'Rap',
    image: 'https://cdn.icon-icons.com/icons2/1320/PNG/512/-rapper_86877.png',
    selected: false
},
{
    id: 3,
    name: 'RnB',
    image: 'https://pngimage.net/wp-content/uploads/2018/06/silhouette-chanteur-png-3.png',
    selected: false
},
{
    id: 4,
    name: 'Pop',
    image: 'https://images.vexels.com/media/users/3/183640/isolated/preview/af82c90701505ee70e1cab91ffeb3139-microphone-pop-music-symbol-by-vexels.png',
    selected: false
},
{
    id: 5,
    name: 'Reggae',
    image: 'https://image.flaticon.com/icons/png/512/1598/1598705.png',
    selected: false
},
{
    id: 6,
    name:'Jazz',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Jazzstubartwork.svg/656px-Jazzstubartwork.svg.png',
    selected: false
}
]
const pratiquesItems = [{
    id: 1,
    name: 'Professionnel',
    selected: false
},
{
    id: 2,
    name: 'Loisir',
    selected: false

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
                city: this.props.navigation.getParam('userCity'),
                sexe: '',
                instruments: [],
                styles: [],
                pratiques: []
            },
            errorMessage: null,
        })
    }
    onPressSexeHandler(sexe) {
        let userTampo = this.state.user;
        for (let data of sexeItems) {
            for(let dataItem of sexeItems){
                if (dataItem.selected == true){
                    dataItem.selected = false;
                }
            }
            if (data.sexe === sexe) {
                data.selected = (data.selected == null) ? true : !data.selected;
                    userTampo.sexe = data.sexe
                    break;
                
            }
        }
        this.setState({ user: userTampo })
    }
    //A la séléction d'un instrument
    onPressInstrumentHandler(name) {
        let userTampo = this.state.user;
        for (let data of instumentsItems) {
            if (data.name === name) {
                data.selected = (data.selected == null) ? true : !data.selected;
                if (data.selected) {
                    userTampo.instruments.push(data.name);
                    break;
                }
                else {
                    const index = userTampo.instruments.indexOf(data.name);
                    userTampo.instruments.splice(index, 1)
                    break
                }
            }
        }
        this.setState({ user: userTampo })
    }

    onPressStyleHandler(name) {
        let userTampo = this.state.user
        for (let data of stylesItems) {
            if (data.name === name) {
                data.selected = (data.selected == null) ? true : !data.selected;
                if (data.selected) {
                    userTampo.styles.push(data.name)
                    break;
                }
                else {
                    const index = userTampo.styles.indexOf(data.name);
                    userTampo.styles.splice(index, 1)
                    break
                }
            }
        }
        this.setState({ user: userTampo })
    }
    onPressPratiqueHandler(name) {
        let userTampo = this.state.user;
        for (let data of pratiquesItems) {
            if (data.name === name) {
                data.selected = (data.selected == null) ? true : !data.selected;
                if (data.selected == true) {
                    userTampo.pratiques.push(data.name);
                    break;
                }
                else {
                    const index = userTampo.pratiques.indexOf(data.name);
                    userTampo.pratiques.splice(index, 1)
                    break
                }
            }
        }
        this.setState({ user: userTampo })
    }

    handleSignUp = (user) => {
        Fire.shared.createUser(user);
    };

    render() {
        LayoutAnimation.easeInEaseOut();
        const user = this.state.user;
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
                            <View style={{ marginBottom: 20}}>
                                <Text style={styles.inputTitle}>Sexe</Text>
                                <FlatList
                                    horizontal={true}
                                    data={sexeItems}
                                    keyExtractor={item => item.sexe}
                                    showsHorizontalScrollIndicator={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => this.onPressSexeHandler(item.sexe)} style={{ marginHorizontal: 5 }}>
                                            <Card
                                                style={
                                                    item.selected == true
                                                        ? {
                                                            padding: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: '#75EAEA',
                                                            justifyContent: 'center', alignItems: 'center'
                                                        }
                                                        : {
                                                            padding: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: '#FFF',
                                                            flexDirection: 'row',
                                                            justifyContent: 'center', alignItems: 'center'
                                                        }
                                                }>
                                                <Text style={item.selected == true
                                                    ? { fontWeight: 'bold', color: '#000' }
                                                    : {
                                                        fontWeight: 'bold', color: '#000'
                                                    }
                                                }>{item.sexe}</Text>
                                            </Card>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.inputTitle}>Instrument(s)</Text>
                                <FlatList
                                    horizontal={true}
                                    data={instumentsItems}
                                    keyExtractor={item => item.name}
                                    showsHorizontalScrollIndicator={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => this.onPressInstrumentHandler(item.name)} style={{ marginHorizontal: 5 }}>
                                            <Card
                                                style={
                                                    item.selected == true
                                                        ? {
                                                            padding: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: '#75EAEA',
                                                            justifyContent: 'center', alignItems: 'center'
                                                        }
                                                        : {
                                                            padding: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: '#FFF',
                                                            justifyContent: 'center', alignItems: 'center'
                                                        }
                                                }>
                                                <Image style={styles.iconItem}
                                                    source={{ uri: item.image, }} />
                                                <Text style={item.selected == true
                                                    ? { fontWeight: 'bold', color: '#000' }
                                                    : {
                                                        fontWeight: 'bold', color: '#000'
                                                    }
                                                }>{item.name}</Text>
                                            </Card>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.inputTitle}>Style(s)</Text>
                                <FlatList
                                    horizontal={true}
                                    data={stylesItems}
                                    keyExtractor={item => item.name}
                                    showsHorizontalScrollIndicator={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => this.onPressStyleHandler(item.name)} style={{ marginHorizontal: 5, }}>
                                            <Card
                                                style={
                                                    item.selected == true
                                                        ? {
                                                            padding: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: '#75EAEA',
                                                            justifyContent: 'center', alignItems: 'center'
                                                        }
                                                        : {
                                                            padding: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: '#FFF',
                                                            justifyContent: 'center', alignItems: 'center'
                                                        }
                                                }>
                                                <Image style={styles.iconItem}
                                                    source={{ uri: item.image, }} />
                                                <Text style={item.selected == true
                                                    ? { fontWeight: 'bold', color: '#14142d' }
                                                    : {
                                                        fontWeight: 'bold', color: '#14142d'
                                                    }
                                                }>{item.name}</Text>
                                            </Card>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={styles.inputTitle}>Pratique(s)</Text>
                                <FlatList
                                    horizontal={true}
                                    data={pratiquesItems}
                                    keyExtractor={item => item.name}
                                    showsHorizontalScrollIndicator={true}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => this.onPressPratiqueHandler(item.name)} style={{ marginHorizontal: 5 }}>
                                            <Card
                                                style={
                                                    item.selected == true
                                                        ? {
                                                            padding: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: '#75EAEA',
                                                            width: 125,
                                                            justifyContent: 'center', alignItems: 'center'
                                                        }
                                                        : {
                                                            padding: 10,
                                                            borderRadius: 5,
                                                            backgroundColor: '#FFF',
                                                            width: 125,
                                                            justifyContent: 'center', alignItems: 'center'
                                                        }
                                                }>
                                                <Text style={item.selected == true
                                                    ? { fontWeight: 'bold', color: '#14142d' }
                                                    : {
                                                        fontWeight: 'bold', color: '#14142d'
                                                    }
                                                }>{item.name}</Text>
                                            </Card>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.userBtnRegister} onPress={() => this.handleSignUp(this.state.user)}>
                            <Text style={styles.textBtn}>Que l'aventure commence ! </Text>
                        </TouchableOpacity>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Loading')}>
                                <Text style={styles.textBtnCreate}>Déjà un compte ? </Text>
                                <Text style={{ color: "#E616E6", textAlign: 'center', fontWeight: 'bold' }}>Utilise-le  </Text>
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
        width: 36,
        height: 36,
    },
    iconItemPratique: {
        width: 50,
        height: 50,
        borderRadius: 16,
    },
})

export default (RegisterSecond)