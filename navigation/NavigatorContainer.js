import React, { useRef, useEffect } from "react";
import ProductNavigator from "./ProductNavigator";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

const NavigatorContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <ProductNavigator ref={navRef} />;
};

export default NavigatorContainer;
