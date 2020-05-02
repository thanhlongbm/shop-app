import React from 'react';
import {Ionicons} from '@expo/vector-icons'
import {HeaderButton} from 'react-navigation-header-buttons'

const CustomHeaderButton = (props) => {
    return ( <HeaderButton {...props} iconSize = {23} IconComponent = {Ionicons} color = "white"/> );
}
 
export default CustomHeaderButton;