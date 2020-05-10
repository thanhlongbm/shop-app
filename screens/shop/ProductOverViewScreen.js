import React, { useEffect, useCallback, useState } from "react";
import { FlatList, View, Text, ActivityIndicator, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductOverviewItem from "../../components/Shop/ProductOverviewItem";
import { addToCart, fetchProducts } from "../../redux/action/action";
import { Color } from "../../constant/Color";

const ProductOverview = ({ navigation }) => {
  const [isLoading, setisLoading] = useState(true);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const { availableProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setisLoading(true);
    setError(null);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setisLoading(false);
  }, [setisLoading, dispatch, setError]);

  const refreshProducts = useCallback(async () => {
    setisRefreshing(true);
    setError(null);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setisRefreshing(false);
  }, [setisLoading, dispatch, setError]);

  useEffect(() => {
    const willFocus = navigation.addListener("willFocus", loadProducts);
    return () => {
      willFocus.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 10 }}>An error occured</Text>
        <Button
          title="Try Again"
          color={Color.primary}
          onPress={() => loadProducts()}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  if (availableProducts.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>There's no product. Please add some products</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={refreshProducts}
      refreshing={isRefreshing}
      data={availableProducts}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <ProductOverviewItem
          title={item.title}
          image={item.imgUrl}
          price={item.price}
          onSelect={() => {
            navigation.navigate("ProductDetails", {
              productId: item.id,
              title: item.title,
            });
          }}
          buttonList={[
            {
              title: "Details",
              onPress: () => {
                navigation.navigate("ProductDetails", {
                  productId: item.id,
                  title: item.title,
                });
              },
            },
            {
              title: "To Cart",
              onPress: () => {
                dispatch(addToCart(item));
              },
            },
          ]}
        />
      )}
    />
  );
};

export default ProductOverview;
