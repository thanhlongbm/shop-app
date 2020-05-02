import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const CartItem = ({amount , title , price , onDelete , deletable}) => {
    return ( 
    <View style = {styles.container}>
        <View style = {styles.textBox}>
            <Text style = {styles.quantity}>{amount}</Text>
            <Text style = {styles.text}>{title}</Text>
        </View>
        <View style = {styles.textBox}>
            <Text style = {styles.text}>${(price*amount).toFixed(2)}</Text>
            {deletable &&
            <TouchableOpacity style = {styles.deleteIcon} onPress = {onDelete}>
                <Ionicons name = "md-trash" size = {23} color = "red" />
            </TouchableOpacity>}
        </View>
    </View> );
}

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        justifyContent : "space-between",
        marginVertical : 10,
        marginHorizontal : "10%",
        paddingVertical : 5,
        borderBottomWidth : 1,
        borderBottomColor : "#ccc"
    },
    textBox : {
        flexDirection : "row",
        alignItems :"center"
    },
    quantity : {
        fontFamily : 'open-sans',
        color : "#666",
        marginRight : 5
    },
    text : {
        fontFamily : "open-sans-bold"
    },
    deleteIcon : {
        marginLeft : 15
    }
});
 
export default CartItem;