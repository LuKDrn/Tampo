// Second screen which we will use to get the data
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text, TouchableWithoutFeedback, SafeAreaView, StatusBar, LayoutAnimation, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import MultiSelect from 'react-native-multi-select';
import { Ionicons } from '@expo/vector-icons'
import Fire from "../Fire";
import { add } from 'react-native-reanimated';
//import all the components we are going to use.

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);
var instrumentsSelected = [];
const instumentsItems = [{
    name: 'Guitare',
},
{
    name: 'Piano',
},
{
    name: 'Chant',
},
{
    name: 'Batterie',
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
    onSelectedInstrumentsChange = instrument => {
        instrumentsSelected.push(instrument);
        console.log(instrumentsSelected);
    };

    onSelectedGenresChange = genres => {
        this.state.user.genres.push(genres);
    };
    onSelectedPratiquesChange = pratiques => {
        this.state.user.pratiques.push(pratiques);
    };

    // handleSignUp = (user) => {
    //     Fire.shared.createUser(user);
    // };

    render() {
        LayoutAnimation.easeInEaseOut();
        const user = this.state;
        console.log(user);
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
                                <MultiSelect
                                    hideTags
                                    items={instumentsItems}
                                    uniqueKey="name"
                                    ref={(component) => { this.multiSelect = component }}
                                    onSelectedItemsChange={this.onSelectedInstrumentsChange}
                                    selectText="Les instruments"
                                    instruments={user.instruments}
                                    searchInputPlaceholderText="Chercher un instrument..."
                                    tagRemoveIconColor="#CCC"
                                    tagBorderColor="#CCC"
                                    tagTextColor="#CCC"
                                    selectedItemTextColor="#CCC"
                                    selectedItemIconColor="#CCC"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    searchInputStyle={{ color: '#CCC' }}
                                    submitButtonColor="#E616E6"
                                    submitButtonText="Submit"
                                />
                                <View style={{display: 'flex'}}>
                                </View>
                            </View>
                            {/* <View style={{ marginVertical: 20 }}>
                                <Text style={styles.inputTitle}>Genre(s)</Text>
                                <MultiSelect
                                    items={genresItems}
                                    uniqueKey="name"
                                    ref={(component) => { this.multiSelect = component }}
                                    onSelectedItemsChange={this.onSelectedGenresChange}
                                    selectText="Genres"
                                    genres={genres}
                                    searchInputPlaceholderText="Chercher un genre..."
                                    tagRemoveIconColor="#CCC"
                                    tagBorderColor="#CCC"
                                    tagTextColor="#CCC"
                                    selectedItemTextColor="#CCC"
                                    selectedItemIconColor="#CCC"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    searchInputStyle={{ color: '#CCC' }}
                                    submitButtonColor="#E616E6"
                                    submitButtonText="Submit"
                                />
                            </View>
                            <View style={{ marginVertical: 20 }}>
                                <Text style={styles.inputTitle}>Niveau de pratique</Text>
                                <MultiSelect
                                    items={pratiquesItems}
                                    uniqueKey="name"
                                    ref={(component) => { this.multiSelect = component }}
                                    onSelectedItemsChange={this.onSelectedPratiquesChange}
                                    selectText="Niveau de pratique"
                                    instruments={pratiques}
                                    tagRemoveIconColor="#CCC"
                                    tagBorderColor="#CCC"
                                    tagTextColor="#CCC"
                                    selectedItemTextColor="#CCC"
                                    selectedItemIconColor="#CCC"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    searchInputStyle={{ color: '#CCC' }}
                                    submitButtonColor="#E616E6"
                                    submitButtonText="Submit"
                                />
                            </View> */}
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
    buttonRemove: {
        width: '30%',
        backgroundColor: '#E616E6',
        color: '#FFF',
        padding: 15,
        marginVertical: 15,
        borderRadius: 4,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
        marginHorizontal: 2
    }
})

export default (RegisterSecond)