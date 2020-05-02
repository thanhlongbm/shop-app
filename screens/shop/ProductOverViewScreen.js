import React from 'react';
import {FlatList, View, Text} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import ProductOverviewItem from '../../components/Shop/ProductOverviewItem';
import {addToCart} from '../../redux/action/action'

const ProductOverview = ({navigation}) => {
    const {availableProducts} = useSelector(state => state.product);
    const dispatch = useDispatch();
    return (
    <FlatList  
        data = {availableProducts}
        keyExtractor = {item => item.title}
        renderItem = {({item}) => <ProductOverviewItem 
                                   title = {item.title} 
                                   image = {item.imgUrl} 
                                   price = {item.price} 
                                   addToCart = {() => {dispatch(addToCart(item))}} 
                                   goDetails = {() => {navigation.navigate("ProductDetails" , {productId : item.id , title : item.title})}} 
                                   />}
    /> );
}
 
export default ProductOverview;