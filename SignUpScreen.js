import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Animated, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { registerAction, addUserToCartAction } from '../actions/index';
import ActivityIndicator from '../components/ActivityIndicator'
import { width, height, totalSize } from 'react-native-dimension';
const Pulse = require('react-native-pulse').default;
const SignUpScreen = ({ navigation }) => {

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [userName, SetUserName] = useState("");
    const [password, SetPassword] = useState("");
    const [checkPassword, SetCheckPassword] = useState("");
    const [errorLocal, SetErrorLocal] = useState("")
    const [loadingView, SetLoadingView] = useState("");

    const dispatch = useDispatch();


    const userRegister = useSelector((state) => state.userRegisterReducer)
    const { loading, user } = userRegister


    const onSubmit = async () => {



        if (password !== checkPassword) {
            SetErrorLocal("Şifreler Eşleşmiyor!");
        }
        else if (name === "" || email === "" || userName === "" || password === "" || checkPassword === "") {
            SetErrorLocal("Lütfen Alanları Boş Bırakmayınız.!")
        }
        else {

            await dispatch(registerAction(name, email, userName, password))
        }




    }

    console.log(user)

    useEffect(async () => {
        if (userName === "" || password === "") {
            SetErrorLocal("Lütfen Alanları Boş Bırakmayınız.!")
            SetLoadingView("")
        }
        else if (userRegister.error) {
            SetErrorLocal("Email Adresi Kayıtlı !")
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

        Animated.spring(fadeAnim, {
            toValue: 1,
            duration: 1000,
            friction: 4,
            tension: 50,

            useNativeDriver: true
        }).start();






    }, [userRegister.error, user])

    console.log(userRegister.error)
    return (
        <View style={styles.container}>

            <View style={styles.topView}>
                <Pulse color='#87CEFA' numPulses={5} diameter={300} speed={25} duration={2000} />
                <Image source={require('../images/chat.png')} style={styles.profileimage}></Image>
            </View>



            <Animated.View style={[styles.midView, { transform: [{ scale: fadeAnim }] }]}>
                <View style={styles.midIcon}>
                    <Icon
                        name="users"
                        size={40}
                        color="white"
                    />
                </View>

                <View style={styles.midContent}>

                    <TextInput
                        style={styles.inputContent}
                        placeholder="İsim"
                        placeholderTextColor="white"
                        value={name}
                        onChangeText={text => SetName(text)}

                    />
                    <TextInput
                        style={styles.inputContent}
                        placeholder="Email"
                        placeholderTextColor="white"
                        value={email}
                        onChangeText={text => SetEmail(text)}
                    />

                    <TextInput
                        style={styles.inputContent}
                        placeholder="Kullanıcı Adı"
                        placeholderTextColor="white"
                        value={userName}
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



                    <TextInput
                        secureTextEntry={true}
                        style={styles.inputContent}
                        placeholder="Şifre Tekrar"
                        placeholderTextColor="white"
                        value={checkPassword}
                        onChangeText={text => SetCheckPassword(text)}
                    />



                    {loading ? <ActivityIndicator /> : (<Text></Text>)}
                </View>



            </Animated.View>



            <View style={styles.bottomView}>
                <Text style={{ textAlign: "center", fontSize: totalSize(1), color: "red", margin: 10 }}>{errorLocal}</Text>
                {loading ? <Text></Text> : (<Button
                    buttonStyle={{ borderRadius: 20,height:height(5),width:width(70),fontSize:totalSize(5) }}
                    titleStyle={{fontSize:totalSize(1)}}
                    type="outline"
                    icon={
                        <Icon style={{ marginLeft: 10 }}
                            name="arrow-circle-right"
                            size={totalSize(2)}
                            color="#00b7ff"
                        />
                    }
                    iconRight
                    title="KAYIT OL"

                    onPress={() => onSubmit()}
                />)}


                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ height: height(3), justifyContent: "center", alignItems: "center" }} >
                    <Text style={{fontSize:totalSize(0.8), fontWeight: "bold", textAlign: "center" }}>DAHA ÖNCEDEN KAYITLI MISIN?</Text>
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
        height: height(15),
        width: width(90),

        borderRadius: 10,


        justifyContent: "center",
        alignItems: "center"
    },
    profileimage: {
        width: 80,
        height: 80,
        borderRadius: 180,
        borderWidth: 6,
        borderColor: 'white',
        backgroundColor: 'white'
    },
    midView: {
        height: height(60),
        width: width(80),

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
        height:height(20),
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
        flex: 1
    },
    inputContent: {
       fontSize:totalSize(1.1), borderWidth: 1, height: height(5),width:width(79), borderRadius: 20, margin: 2, textAlign: "center", borderColor: "white", color: "white"
    },
    bottomView: {
        height: height(20),
        width: width(70),

        justifyContent: "space-around",
        alignItems: "stretch"

    }
})



export default SignUpScreen;
