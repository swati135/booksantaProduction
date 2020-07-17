import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ToastAndroid } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';


import db from '../config.js';
import firebase from 'firebase';

export default class ReceiverDetailsScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: firebase.auth().currentUser.email,
            userName: "",
            userContact: "",
            receiverId: this.props.navigation.getParam('details')['user_id'],
            requestId: this.props.navigation.getParam('details')['request_id'],
            bookName: this.props.navigation.getParam('details')['book_name'],
            reason_for_requesting: this.props.navigation.getParam('details')['reason_to_request'],
            receiverName: '',
            receiverContact: '',
            receiverAddress: '',
            receiverRequestDocId: '',
            // userDetails: [],
        }
    }


    getReceiverDetails = () => {
        db.collection('users').where("email_id", '==', this.state.receiverId).get()
            .then(snapshot => {
                Alert.alert("Snapshot Receiver " + snapshot);
                snapshot.forEach(doc => {
                    Alert.alert("A pikachu appeared nearby  in getReceiverDEtails!");
                    this.setState({
                        receiverName: doc.data().first_name,
                        receiverContact: doc.data().contact,
                        receiverAddress: doc.data().address,
                    })
                })
            })

        db.collection('requested_books').where('request_id', '==', this.state.requestId).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({ receiverRequestDocId: doc.id })
                })
            })

    }

    //////////////////////************    SWATI */

    getUserDetails=(userId)=>{
        db.collection("users").where('email_id','==', userId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              userName  :doc.data().first_name + " " + doc.data().last_name
            })
          })
        })
      }
    

    /////////////////////////////////////////////
    updateBookStatus = () => {
        db.collection('all_donations').add({
            "book_name": this.state.bookName,
            "request_id": this.state.requestId,
            "requested_by": this.state.receiverName,
            "donor_id": this.state.userId,
            "request_status": "Donor Interested"
        })
    }

    // getUserDetails = (userId) => {


    //     //  Alert.alert("UserID: " + userId)
    //     db.collection("users").where('email_id', '==', userId).get()
    //         .then(snapshot => {
    //             snapshot.forEach((doc) => {
    //                 var data = doc.data()
    //                 console.log(data);
    //                 Alert.alert("DATA: " + data)
    //                 this.setState({
    //                     userDetails: data.val(),
    //                     userName: data.first_name,
    //                     contact: data.contact,

    //                 })
    //             });
    //         })
    //     Alert.alert("UserDetails: " + this.state.userDetails)
    //     Alert.alert("UserName: " + this.state.userName + "" + this.state.userContact)

    // }

    ////////////////****************    SWATI */

    // getUserDetails = (userId) => {
    //     Alert.alert(" getUserDEtails : I am mounted")
    //     db.collection("users").where('email_id', '==', userId).get()

    //         // .then(snapshot => {
    //         //     // Alert.alert("HI in then snapshot");
    //         //     //  Alert.alert("Snapshot " + snapshot);

    //         //     snapshot.forEach(doc => {
    //         .then((snapshot) => {

    //             snapshot.forEach((doc) => {
    //                 var data = doc.data();
    //                 Alert.alert("A pikachu appeared nearby !");
    //                 this.setState({
    //                     userName: data.first_name + " " + data.last_name
    //                 })
    //             })
    //             Alert.alert("doc" + doc);
    //         })

    //     // Alert.alert("UserName: " + this.state.userName);
    // }

    
    /////////////////////////////////////////////

    addNotification = () => {
        var message = this.state.userId + ' has shown interest in donating';

        db.collection("all_notifications").add({
            "targeted_user_id": this.state.recieverId,
            "donor_id": this.state.userId,
            "request_id": this.state.requestId,
            "book_name": this.state.bookName,
            "date": firebase.firestore.FieldValue.serverTimestamp(),
            "notification_status": "unread",
            "message": message
        })


        Alert.alert(message)
    }

    componentDidMount() {
        this.getReceiverDetails();
        this.getUserDetails(this.state.userId);
    }


    render() {
        return (
            <View>
                <ScrollView>
                    <View style={{ flex: 1.0 }}>
                        <Header
                            leftComponent={<Icon name='arrow-left' type='feather' color='#696969' onPress={() => this.props.navigation.goBack()} />}
                            centerComponent={{ text: "Donate Books", style: { color: '#90A5A9', fontSize: 20, fontWeight: "bold", } }}
                            backgroundColor="#eaf8fe"
                        />
                    </View>
                    <View style={{ flex: 0.3 }}>

                        <Card
                            title={"Book Information"}
                            titleStyle={{ fontSize: 20 }}
                        >
                            <Card >
                                <Text style={{ fontWeight: 'bold' }}>Name : {this.state.bookName}</Text>
                            </Card>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Reason : {this.state.reason_for_requesting}</Text>
                            </Card>
                        </Card>

                    </View>

                    <View style={{ flex: 0.3 }}>
                        <Card
                            title={"Receiver Information"}
                            titleStyle={{ fontSize: 20 }}
                        >
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Name: {this.state.receiverName}</Text>
                            </Card>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Contact: {this.state.receiverContact}</Text>
                            </Card>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Address: {this.state.receiverAddress}</Text>
                            </Card>
                        </Card>

                        <View style={styles.buttonContainer}>
                            {
                                this.state.receiverId !== this.state.userId
                                    ? (
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => {
                                                this.updateBookStatus();
                                                this.addNotification();
                                                this.props.navigation.navigate('MyDonations')
                                            }}>
                                            <Text>I want to Donate</Text>
                                        </TouchableOpacity>
                                    )
                                    : null
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>




        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    button: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        },
        elevation: 16
    }
})

