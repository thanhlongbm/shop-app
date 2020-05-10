import React, { useState, useCallback } from "react";
import { View, FlatList, Alert, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductOverviewItem from "../../components/Shop/ProductOverviewItem";
import { deleteProduct } from "../../redux/action/action";
import { Color } from "../../constant/Color";

const UserProductScreen = ({ navigation }) => {
  const products = useSelector((state) => state.product.userProducts);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const deleteAction = useCallback(
    async (id) => {
      setError(null);
      setisLoading(true);
      try {
        await dispatch(deleteProduct(id));
      } catch (err) {
        setError(err.message);
        return;
      }
      setisLoading(false);
    },
    [setisLoading, setError, dispatch]
  );

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => deleteAction(id),
      },
    ]);
  };

  if (error) {
    Alert.alert("ERROR", "An error occurred", [
      {
        text: "OK",
        onPress: () => {
          setError(null);
          setisLoading(false);
        },
      },
    ]);
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

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
