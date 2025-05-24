// my-rn-custom-drawer/src/components/Item.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Item({
    title,
    route,
    Icon,
    toggleDrawer,
    navigation,
    itemBgColor,
    itemTextColor,
}) {
    const renderedIcon = Icon ? React.cloneElement(Icon, { color: itemTextColor }) : Icon;

    return (
        <TouchableOpacity
            style={[itemStyles.itemContainer, { backgroundColor: itemBgColor }]}
            onPress={() => {
                if (navigation && route) {
                    navigation.navigate(route);
                    toggleDrawer();
                }
            }}
            activeOpacity={0.7}
        >
            {renderedIcon && (
                <View style={itemStyles.iconWrapper}>
                    {renderedIcon}
                </View>
            )}
            <Text style={[itemStyles.itemTitle, { color: itemTextColor }]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const itemStyles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginBottom: 8,
        borderRadius: 10,
    },
    iconWrapper: {
        marginRight: 20,
        width: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        fontFamily: 'System',
        fontSize: 18,
        fontWeight: '500',
        flex: 1,
    },
});