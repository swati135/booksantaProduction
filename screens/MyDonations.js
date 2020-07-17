import React, { Component } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Alert,ScrollView,FlatList} from 'react-native';
import { ListItem, Icon, Card} from 'react-native-elements';
import MyHeader from '../components/MyHeader';
import db from '../config'
import firebase from 'firebase';

export default class MyDonations extends Component {
   
   // static navigationOptions = { header: null }

    constructor() {
        super()
        this.state = {
            donorId: firebase.auth().currentUser.email,
            allDonations: [],
            donorName: "",
        }
        this.requestRef = null
    }

    static navigationOptions = { header: null };

    getDonorDetails = (donorId) => {
        db.collection("users").where("email_id", "==", donorId).get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    this.setState({
                        "donorName": doc.data().first_name + " " + doc.data().last_name
                    })
                });
            })
    }


    getAllDonations = () => {
        Alert.alert("I am being called")
        this.requestRef = db.collection("all_donations").where('donor_id', '==', this.state.donorId)
            .onSnapshot((snapshot) => {
            //     var allDonations = snapshot.docs.map(document => document.data());
            //     this.setState({
            //         allDonations: allDonations
            //     });
            // })
            
            ///////////**********Swati */
            var allDonations = []
            snapshot.docs.map((doc) =>{
              var donation = doc.data()
              donation["doc_id"] = doc.id
              allDonations.push(donation)
            });
            this.setState({
              allDonations : allDonations
            });
          })
          //////////////***********Swati ****??/////////
        console.log("I reached the end")
    }

    sendBook = (bookDetails) => {
        if (bookDetails.request_status === 'Book Sent') {
            var requestStatus = "Donor Interested"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "request_status": "Donor Interested"
            })

            this.sendNotification(bookDetails, requestStatus)  ///swati///
        }
        else {
            var requestStatus = "Book Sent";
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "request_status": "Book Sent"
            })

            this.sendNotification(bookDetails, requestStatus)
        }
    }

    sendNotification = (bookDetails, requestStatus) => {
        //f
        var requestId = bookDetails.request_id;
        var donorId = bookDetails.donor_id;
        db.collection('all_notifications')
        .where("request_id", '==', requestId)
        .where('donor_id', '==', donorId)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    var message = "";
                    if (requestStatus === "Book Sent") {
                        message = this.state.donorName + "sent you a book"
                    }
                    else {
                        message = this.state.donorName + " has shown interest in donating the book"
                    }
                    db.collection("all_notifications").doc(doc.id).update({
                        "message": message,
                        "notification_Status": "unread",
//date element missing
                    })
                })
            })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.book_name}
                subtitle={"requested By : " + item.requested_by + "\n Status : " + item.request_status}
                leftElement={<Icon name="book" type='font-awesome' color='blue' />}
                titleStyle={{ color: 'black', fontWeight: 'bold' }}
                rightElement={
                    <TouchableOpacity
                    //     style={styles.button}
                    //     onPress={() => {
                    //         Alert.alert("Book Sent!!!")
                    //         // this.sendBook(item)
                    //     }}
                    // >
                    ///////***********   SWati */
                    style={[
                        styles.button,
                        {
                          backgroundColor : item.request_status === "Book Sent" ? "green" : "#ff5722"
                        }
                      ]}
                      onPress = {()=>{
                        this.sendBook(item)
                      }}
                     >
                        <Text style={{ color: '#ffff' }}>{
                        item.request_status === "Book Sent" ? "Book Sent" : "Send Book"}</Text>

                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    componentDidMount() {
        this.getDonorDetails(this.state.donorId)
        this.getAllDonations()
    }

    componentWillUnmount() {
        this.requestRef();
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <MyHeader navigation={this.props.navigations} title="My Donations" />
                <View style={{ flex: 1 }}>
                    {
                        this.state.allDonations.length === 0
                            ? (
                                <View style={styles.subContainer}>
                                    <Text style={{ fontSize: 20 }}>List Of All Donated Books</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allDonations}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#ff5722",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8
        }
    }
})
