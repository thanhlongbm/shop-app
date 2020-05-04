import React from "react";
import { View, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductOverviewItem from "../../components/Shop/ProductOverviewItem";
import { deleteProduct } from "../../redux/action/action";

const UserProductScreen = ({ navigation }) => {
  const products = useSelector((state) => state.product.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductOverviewItem
            title={item.title}
            image={item.imgUrl}
            price={item.price}
            onSelect={() => {
              navigation.navigate("EditProduct", { id: item.id });
            }}
            buttonList={[
              {
                title: "Edit",
                onPress: () => {
                  navigation.navigate("EditProduct", { id: item.id });
                },
              },
              {
                title: "Delete",
                onPress: deleteHandler.bind(this, item.id),
              },
            ]}
          />
        )}
      />
    </View>
  );
};

export default UserProductScreen;
