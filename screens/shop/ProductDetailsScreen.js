import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Color } from '../../constant/Color';
import { addToCart } from '../../redux/action/action';

const ProductDetailScreen = ({navigation}) => {

    const productId = navigation.getParam("productId");
    const details = useSelector(state => state.product.availableProducts.filter(product => product.id === productId)[0]);
    const dispatch = useDispatch();

    return (
    <ScrollView> 
        <View style = {styles.container}>
            <Image style = {styles.image} source = {{uri : details.imgUrl}} />
            <View style = {styles.buttonBox}>
                <Button color = {Color.primary} title = "Add to cart" onPress = {() => {dispatch(addToCart(details))}}/>
            </View>
            <Text style = {styles.price}>${details.price}</Text>
            <Text style = {styles.descript}>{details.description}</Text>
        </View>
    </ScrollView>);
}

ProductDetailScreen.navigationOptions = ({navigation}) => {
    return {
        headerTitle : navigation.getParam("title")
    }
}

const styles = StyleSheet.create({
    container : {
        padding : 10
    },
    image : {
        width : "100%",
        height : 300
    },
    buttonBox : {
        alignSelf : "center",
        width : 150,
        marginVertical : 10
    },
    price : {
        fontFamily : "open-sans",
        textAlign : "center",
        marginTop : 5,
        marginBottom : 15,
        fontSize : 20
    },
    descript : {
        fontFamily : "open-sans",
        textAlign : "center",
        marginHorizontal : 10
    }
})
 
export default ProductDetailScreen;