import DrawerNavigator from './DrawerNavigator'

export const createDrawerScreen = (ScreenComponent) => { 
    return (props) => {
        const { navigation } = props;
        return (
            <DrawerNavigator
                navigation={navigation}
            >
                <ScreenComponent {...props} />
            </DrawerNavigator>
        );
    };
}
