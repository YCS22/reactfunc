import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, addUserToCartAction } from '../actions/index';
import ActivityIndicator from '../components/ActivityIndicator'

import { width, height, totalSize } from 'react-native-dimension';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Animated, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Pulse = require('react-native-pulse').default;
const LoginScreen = ({ navigation }) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;


    const [usernameLocal, SetUserName] = useState("");
    const [password, SetPassword] = useState("");
    const [loadingView, SetLoadingView] = useState("");
    const [localerror, SetLocalError] = useState("")

    const dispatch = useDispatch();


    const userLogin = useSelector((state) => state.userLoginReducer)
    const { loading, user, error } = userLogin


    const { userInfo } = useSelector((state) => state.cartReducer)


    console.log("userLogin", userLogin)
    console.log("error", error)

    console.log("loginuser", user)
    console.log("loginuser", userInfo)

    const onSubmit = async () => {



        await dispatch(loginAction(usernameLocal, password))
        SetLocalError("")

    }



    useEffect(async () => {

        if (usernameLocal === "" || password === "") {
            SetLocalError("Lütfen Alanları Boş Bırakmayınız.!")
            SetLoadingView("")
        }
        else if (error) {
            SetLocalError("Kullanıcı Adı Veya Şifre Hatalı !")
            SetLoadingView("")
        }

        if (loading) {
            SetLoadingView("Bilgiler Gönderiliyor.")
        }

        if (user) {
            const { _id, username, token } = user

            await dispatch(addUserToCartAction(_id, username, token))
            navigation.navigate("Home")
        }

        if (userInfo.length !== 0) {
            navigation.navigate("Home")
        }

        Animated.spring(fadeAnim, {
            toValue: 1,
            duration: 10000,
            friction: 4,
            tension: 50,

            useNativeDriver: true
        }).start();






    }, [user, usernameLocal, password, error])

    return (
        <View style={styles.container}>

            <View style={styles.topView}>
                <Pulse color='#87CEFA' numPulses={5} diameter={300} speed={25} duration={2000} />
                <Image source={require('../images/chat.png')} style={styles.profileimage}></Image>
            </View>



            <Animated.View style={[styles.midView, { transform: [{ scale: fadeAnim }] }]}>
                <View style={styles.midIcon}>
                    <Icon
                        name="user-lock"
                        size={40}
                        color="white"
                    />
                </View>

                <View style={styles.midContent}>



                    <TextInput
                        style={styles.inputContent}
                        placeholder="Kullanıcı Adı"
                        placeholderTextColor="white"
                        value={usernameLocal}
                        onChangeText={text => SetUserName(text)}
                    />

                    <TextInput
                        secureTextEntry={true}
                        style={styles.inputContent}
                        placeholder="Şifre"
                        placeholderTextColor="white"
                        value={password}
                        onChangeText={text => SetPassword(text)}

                    />



                    <Text style={{ textAlign: "center", color: "white", fontSize:totalSize(1) }}>
                        {loadingView}
                    </Text>
                    {loading ? <ActivityIndicator /> : (<Text></Text>)}

                </View>



            </Animated.View>



            <View style={styles.bottomView}>
                <Text style={{ textAlign: "center", fontSize: totalSize(1), color: "red", margin: 10 }}>{localerror}</Text>
                {loading ? <Text></Text>
                    : (<Button
                        buttonStyle={{ borderRadius: 20,height:height(5),width:width(70),fontSize:totalSize(5) }}
                        titleStyle={{fontSize:totalSize(1)}}
                        type="outline"
                        icon={
                            <Icon style={{ marginLeft: 10 }}
                                name="arrow-circle-right"
                                size={20}
                                color="#00b7ff"
                            />
                        }
                        iconRight
                        title="GİRİŞ YAP"

                        onPress={() => onSubmit()}
                    />)}





                <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ height:height(3), justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize:totalSize(0.8),fontWeight: "bold", textAlign: "center" }}>DAHA KAYIT OLMADIN MI?</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8ff", //Ghost White
        justifyContent: "flex-start",
        alignItems: "center",

    },
    topView: {
        height:height(20),
        width: width(90),
        margin: 10,
        borderRadius: 10,


        justifyContent: "center",
        alignItems: "center"
    }, profileimage: {
        width: 100,
        height: 100,
        borderRadius: 180,
        borderWidth: 10,
        borderColor: 'white',
        backgroundColor: 'white'
    },
    midView: {
        height: height(50),
        width: width(80),
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 50,
        },
        shadowOpacity: 1,
        shadowRadius: 16,

        elevation: 48,
        backgroundColor: "#00b7ff",
        justifyContent: "flex-start",
        alignItems: "center",
        borderBottomRightRadius: 120,
        borderRadius: 25,


    },
    midIcon: {
        height: height(20),
        width: width(20),
        borderRadius: 0,

        margin: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    midContent: {
        height: height(75), width: width(80),

        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    inputContent: {
        borderWidth: 1, height: height(5),width:width(76),fontSize:totalSize(1.1), borderRadius: 20, margin: 8, textAlign: "center", borderColor: "white", color: "white"
    },
    bottomView: {
        height:height(20),
        width: width(70),

        justifyContent: "space-between",
        alignItems: "stretch"

    }
})



export default LoginScreen;
