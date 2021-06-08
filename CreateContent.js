import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, BackHandler, StyleSheet, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ActivityIndicator from '../components/ActivityIndicator';
import { postContentAction } from '../actions/index'
const CreateContent = ({ navigation }) => {
    const user = navigation.getParam("username");
    const [contentHeader, SetContentHeader] = useState("");
    const [description, SetDescription] = useState("");
    const [localError, SetLocalError] = useState("");

    const dispatch = useDispatch();
    const contentInfo = useSelector((state) => state.postContentReducer)
    const { loading, content, error } = contentInfo




    useEffect(() => {

        if (contentHeader === "" || description === "") {
            SetLocalError("*Lütfen Alanları Boş Bırakmayınız.")
        } else {
            SetLocalError("")
        }


        const backAction = () => {
            { navigation.navigate("Home") }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();

    }), [contentHeader, description];

    console.log(user)
    const onSubmit = async () => {
        console.log("press")
        if (contentHeader !== "" && description !== "") {
            await dispatch(postContentAction(user, contentHeader, description))

            navigation.navigate("Home", { newContent: "newContent" })
            SetContentHeader("")
            SetDescription("")
            SetLocalError("")
        }

    }


    return (
        <View style={styles.container}>
            <Image source={require("../images/message.png")}
                style={{ position: "absolute", height: "100%" }} blurRadius={55}
            />



            <View style={styles.mid}>
                <View style={styles.top}>
                    <Text style={{ fontSize: 32, fontWeight: "bold", color: "#F0F8FF" }}>
                        KONU OLUŞTUR
             </Text>
                </View>
                <TextInput
                    style={styles.inputContent}
                    placeholder="Konu Başlığı"
                    placeholderTextColor="white"
                    value={contentHeader}
                    onChangeText={text => SetContentHeader(text)}


                />

                <TextInput
                    style={styles.inputContent}
                    placeholder="Konu İçeriği"
                    placeholderTextColor="white"
                    value={description}
                    onChangeText={text => SetDescription(text)}


                />


            </View>

            <View style={{ width: "70%", height: "10%", alignItems: "stretch", justifyContent: "center" }}>

                <Text style={{ color: "red", fontSize: 15, textAlign: "center" }}>
                    {localError}
                </Text>
                {loading ? <ActivityIndicator /> : (
                    <Button
                        titleStyle={{ fontSize: 14, marginRight: 4 }}
                        buttonStyle={{ borderRadius: 20 }}
                        type="outline"
                        icon={
                            <Icon

                                name="plus"
                                size={16}
                                color="#0A1E42"
                            />
                        }
                        iconRight
                        title="OLUŞTUR"
                        onPress={() => onSubmit()}
                    />
                )}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    top: {

        alignItems: "center",
        justifyContent: "center"

    },
    mid: {
        height: "60%",
        width: "80%",
        margin: 10,


        elevation: 60,
        backgroundColor: "#00b7ff",
        justifyContent: "center",
        alignItems: "stretch",
        borderBottomRightRadius: 120,
        borderRadius: 25,
    },
    inputContent: {
        borderWidth: 1, height: 40, borderRadius: 20, margin: 16, textAlign: "center", borderColor: "white", color: "white"
    },
})



export default CreateContent;
