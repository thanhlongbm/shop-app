import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from "react-navigation";
import ProductOverview from "../screens/shop/ProductOverViewScreen";
import { Color } from "../constant/Color";
import ProductDetailScreen from "../screens/shop/ProductDetailsScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/user/UserProductsScreen";
import EditScreen from "../screens/user/EditProductScreen";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Color.primary,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerTintColor: "white",
};

const HeaderBTN = ({ name, title, onPress }) => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item iconName={name} title={title} onPress={onPress} />
    </HeaderButtons>
  );
};

const ProductNavigator = createStackNavigator(
  {
    ProductOverview: {
      screen: ProductOverview,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "All Product",
          headerLeft: (
            <HeaderBTN
              name="ios-menu"
              title="Menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
          headerRight: (
            <HeaderBTN
              name="md-cart"
              title="Cart"
              onPress={() => {
                navigation.navigate("Cart");
              }}
            />
          ),
        };
      },
    },
    ProductDetails: ProductDetailScreen,
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        headerTitle: "Your cart",
      },
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions,
  }
);

const OrderNavigator = createStackNavigator(
  {
    Order: {
      screen: OrderScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Your Order",
          headerLeft: (
            <HeaderBTN
              name="ios-menu"
              title="Menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        };
      },
    },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProduct: {
      screen: UserProductScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Your Products",
          headerLeft: (
            <HeaderBTN
              name="ios-menu"
              title="Menu"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
          headerRight: (
            <HeaderBTN
              name="md-create"
              title="Edit"
              onPress={() => {
                navigation.navigate("EditProduct");
              }}
            />
          ),
        };
      },
    },
    EditProduct: EditScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons name="md-create" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions,
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Product: ProductNavigator,
    Order: {
      screen: OrderNavigator,
      navigationOptions: {
        drawerLabel: "Order List",
      },
    },
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      labelStyle: {
        fontFamily: "open-sans-bold",
      },
      activeTintColor: Color.primary,
    },
  }
);

export default createAppContainer(AppNavigator);
