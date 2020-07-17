import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config'
import firebase from 'firebase'

export default class Settings extends Component {

    constructor() {
        super();
        this.state = {
            emailId: "",
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            docId: '',
            password: '',
            confirmPassword: ''
        }
    }

    getUserDetails = () => {
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id', '==', email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data()
                    this.setState({
                        emailId: data.email_id,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        address: data.address,
                        contact: data.contact,
                        docId: doc.id
                    })
                });
            })
    }

    updateUserDetails = () => {
        db.collection('users').doc(this.state.docId).update({
            'first_name': this.state.firstName,
            'last_name': this.state.lastName,
            'contact': this.state.contact,
            'address': this.state.address,
            'password': this.state.password
        })


        Alert.alert("Settings saved successfully")
    }

    componentDidMount() {
        this.getUserDetails();
    }


    render() {
        return (


            <View>

                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <KeyboardAvoidingView >
                    <View style={styles.formContainer}>

                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"First Name"}
                            onChangeText={(text) => {
                                this.setState({
                                    firstName: text
                                })
                            }}
                            value={this.state.firstName}

                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"Last Name"}
                            onChangeText={(text) => {
                                this.setState({
                                    lastName: text
                                })
                            }}
                            value={this.state.lastName}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"Contact"}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                this.setState({
                                    contact: text
                                })
                            }}
                            value={this.state.contact}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"Address"}
                            multiline={true}
                            onChangeText={(text) => {
                                this.setState({
                                    address: text
                                })
                            }}
                            value={this.state.address}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"Password"}
                            keyboardType={'password'}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                            value={this.state.password}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"ConfirmPassword"}
                            keyboardType={'password'}
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                            value={this.state.confirmPassword}
                        />


                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { this.updateUserDetails() }}

                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>

                    </View>

                </KeyboardAvoidingView>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    keyBoardStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    formTextInput: {
        width: "75%",
        height: 35,
        alignSelf: 'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    button: {
        width: "75%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20
    },
    buttonText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff"
    }
})
