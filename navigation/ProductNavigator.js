import React from 'react';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import ProductOverview from "../screens/shop/ProductOverViewScreen";
import { Color } from "../constant/Color";
import ProductDetailScreen from "../screens/shop/ProductDetailsScreen";
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/UI/HeaderButton';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import {Ionicons} from '@expo/vector-icons'


const defaultNavigationOptions = {
    headerStyle : {
        backgroundColor : Color.primary
    },
    headerTitleStyle : {
        fontFamily: 'open-sans-bold'
    },
    headerTintColor : "white"
}

const MenuButton = ({navigation}) => {
    return (
    <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
        <Item iconName = "ios-menu" title = "Menu" onPress = {() => {navigation.toggleDrawer()}}/>
    </HeaderButtons>)
}

const ProductNavigator = createStackNavigator({
    ProductOverview : {
        screen : ProductOverview,
        navigationOptions : ({navigation}) => {
            return {
            headerTitle : "All Product",
            headerLeft : <MenuButton navigation = {navigation} />,
            headerRight : (<HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
                <Item iconName = "md-cart" title = "Cart" onPress = {() => {navigation.navigate("Cart")}}/>
            </HeaderButtons>)
            }
        }
    },
    ProductDetails : ProductDetailScreen,
    Cart : {
        screen : CartScreen,
        navigationOptions : {
            headerTitle : "Your cart"
        }
    }
} , {
    navigationOptions : {
        drawerIcon : drawerConfig => <Ionicons name = "md-cart" size = {23} color = {drawerConfig.tintColor} />
    },
    defaultNavigationOptions
});

const OrderNavigator = createStackNavigator({
    Order : {
        screen : OrderScreen,
        navigationOptions : ({navigation}) => {
            return {
            headerTitle : "Your Order",
            headerLeft : <MenuButton navigation = {navigation} />
            }
        }
    }
} , {
    navigationOptions : {
        drawerIcon : drawerConfig => <Ionicons name = "md-list" size = {23} color = {drawerConfig.tintColor} />
    },
    defaultNavigationOptions
});

const AppNavigator = createDrawerNavigator({
    Product : ProductNavigator,
    Order : {
        screen : OrderNavigator,
        navigationOptions : {
            drawerLabel : "Order List"
        }
    }
} , {
    contentOptions : {
        labelStyle : {
            fontFamily : "open-sans-bold"
        },
        activeTintColor : Color.primary
    }
})

export default createAppContainer(AppNavigator);