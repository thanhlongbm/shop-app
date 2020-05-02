import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from '../../components/Shop/OrderItem';

const OrderScreen = () => {
    const orderLists = useSelector(state => state.order) 
    return ( <View>
        <FlatList 
         data = {orderLists}
         keyExtractor = {(item) => item.key}
         renderItem = {({item}) => <OrderItem totalPrice = {item.totalPrice} items = {item.items} date = {item.date} />}
        />
    </View> );
}
 
export default OrderScreen;