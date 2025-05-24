// my-rn-custom-drawer/src/components/DrawerNavigator.js
import React, { useEffect, useState, useRef } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, Animated, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Item from './Item'
import { useDrawer } from './DrawerContext'

const { width } = Dimensions.get('window')

export default function DrawerNavigator({
    children,
    // data prop is REMOVED from here, it comes from context
    navigation,
    // Style props are REMOVED from here, they come from context
}) {
    // Get all necessary state, styles, AND data from context
    const {
        isDrawerOpen,
        setIsDrawerOpen,
        drawerStyles,
        drawerHeaderStyles,
        listItemStyles,
        drawerData, // New: Get drawerData from context
    } = useDrawer()

    const drawerWidth = width * 0.75;
    const animatedDrawerPosition = useRef(new Animated.Value(-drawerWidth)).current;
    const [shouldRenderDrawer, setShouldRenderDrawer] = useState(isDrawerOpen);


    useEffect(() => {
        if (isDrawerOpen) {
            setShouldRenderDrawer(true);
            Animated.spring(animatedDrawerPosition, {
                toValue: 0,
                useNativeDriver: true,
                bounciness: 5,
                speed: 10,
            }).start();
        } else {
            Animated.spring(animatedDrawerPosition, {
                toValue: -drawerWidth,
                useNativeDriver: true,
                bounciness: 5,
                speed: 10,
            }).start(() => {
                setShouldRenderDrawer(false);
            });
        }
    }, [isDrawerOpen]);

    const handleCloseDrawer = () => {
        Animated.spring(animatedDrawerPosition, {
            toValue: -drawerWidth,
            useNativeDriver: true,
            bounciness: 5,
            speed: 10,
        }).start(() => {
            setShouldRenderDrawer(false);
            setIsDrawerOpen(false); // Update context state to close
        });
    };

    return (
        <View style={screenStyles.container}>
            {shouldRenderDrawer && (
                <TouchableOpacity
                    style={screenStyles.overlayer}
                    onPress={handleCloseDrawer}
                    activeOpacity={1}
                />
            )}

            {shouldRenderDrawer &&
                <Animated.View style={[screenStyles.sidebarAnimatedWrapper, { width: drawerWidth, transform: [{ translateX: animatedDrawerPosition }] }]}>
                    <LinearGradient
                        colors={drawerStyles.drawerGradientColors}
                        start={drawerStyles.drawerGradientStart}
                        end={drawerStyles.drawerGradientEnd}
                        style={screenStyles.sidebarGradient}
                    >
                        {/* Drawer Header Section */}
                        <View style={[screenStyles.drawerHeader, { borderBottomColor: drawerHeaderStyles.headerBorderBottomColor }]}>
                            <View style={[screenStyles.profileImageContainer, { backgroundColor: drawerHeaderStyles.headerProfileContainerBgColor }]}>
                                <Image
                                    source={{ uri: drawerHeaderStyles?.image || 'https://i.pravatar.cc/150?img=68' }}
                                    style={screenStyles.profileImage}
                                />
                            </View>
                            <Text style={[screenStyles.userName, { color: drawerHeaderStyles.headerUserNameColor }]}> {drawerHeaderStyles?.title || 'Title'} </Text>
                            <Text style={[screenStyles.eventsCount, { color: drawerHeaderStyles.headerEventsCountColor }]}> {drawerHeaderStyles?.subtitle || 'SSubtitle'} </Text>
                        </View>

                        <FlatList
                            data={drawerData} // New: Use data from context
                            renderItem={({ item }) => (
                                <Item
                                    navigation={navigation}
                                    title={item.title}
                                    route={item.route}
                                    Icon={item.icon}
                                    toggleDrawer={handleCloseDrawer}
                                    itemBgColor={listItemStyles.itemBgColor}
                                    itemTextColor={listItemStyles.itemTextColor}
                                />
                            )}
                            keyExtractor={item => item.id}
                            contentContainerStyle={screenStyles.flatListContent}
                            showsVerticalScrollIndicator={false}
                        />
                    </LinearGradient>
                </Animated.View>
            }

            <View style={screenStyles.childrenWrap}>
                {children}
            </View>
        </View>
    );
}

const screenStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F8F8F8', // For the main content area
    },
    overlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
    sidebarAnimatedWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        zIndex: 2,
        overflow: 'hidden',
    },
    sidebarGradient: {
        flex: 1,
        borderRadius: 25,
        paddingVertical: 20,
    },
    drawerHeader: {
        paddingVertical: 40,
        paddingHorizontal: 25,
        alignItems: 'flex-start',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
    },
    profileImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    userName: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 5,
    },
    eventsCount: {
        fontSize: 14,
    },
    flatListContent: {
        paddingBottom: 50,
    },
    childrenWrap: {
        flex: 1,
        padding: 0,
        zIndex: 0,
    },
})
