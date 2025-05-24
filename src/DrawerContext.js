// my-rn-custom-drawer/src/context/DrawerContext.js
import React, { createContext, useContext, useState } from 'react';

// Define the default style values (no change here)
const DEFAULT_DRAWER_STYLES = {
    drawerGradientColors: ['#1A2980', '#26D0CE'],
    drawerGradientStart: { x: 0, y: 0 },
    drawerGradientEnd: { x: 1, y: 1 },
}

const DEFAULT_DRAWER_HEADER_STYLES = {
    headerUserNameColor: '#FFFFFF',
    headerEventsCountColor: 'rgba(255, 255, 255, 0.7)',
    headerProfileContainerBgColor: 'rgba(255, 255, 255, 0.1)',
    headerBorderBottomColor: 'rgba(255, 255, 255, 0.2)',
}

const DEFAULT_LIST_ITEM_STYLES = {
    itemBgColor: 'rgba(255, 255, 255, 0.1)',
    itemTextColor: '#FFFFFF',
}

// Default drawer data (empty array if not provided)
const DEFAULT_DRAWER_DATA = []

// Create the context with default structure and default values
const DrawerContext = createContext({
    isDrawerOpen: false,
    setIsDrawerOpen: () => { },
    drawerStyles: DEFAULT_DRAWER_STYLES,
    drawerHeaderStyles: DEFAULT_DRAWER_HEADER_STYLES,
    listItemStyles: DEFAULT_LIST_ITEM_STYLES,
    drawerData: DEFAULT_DRAWER_DATA, // New: Default drawer data
})

// Custom hook to consume the context
export const useDrawer = () => useContext(DrawerContext)

// Provider component that accepts style props and drawerData
export const DrawerProvider = ({
    children,
    // Accept style objects as props for customization
    drawerStyles = {},
    drawerHeaderStyles = {},
    listItemStyles = {},
    drawerData = DEFAULT_DRAWER_DATA, // New: Accept drawerData as a prop
}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    // Merge provided styles with defaults
    const mergedDrawerStyles = { ...DEFAULT_DRAWER_STYLES, ...drawerStyles }
    const mergedDrawerHeaderStyles = { ...DEFAULT_DRAWER_HEADER_STYLES, ...drawerHeaderStyles }
    const mergedListItemStyles = { ...DEFAULT_LIST_ITEM_STYLES, ...listItemStyles }

    const contextValue = {
        isDrawerOpen,
        setIsDrawerOpen,
        // Provide merged styles through the context
        drawerStyles: mergedDrawerStyles,
        drawerHeaderStyles: mergedDrawerHeaderStyles,
        listItemStyles: mergedListItemStyles,
        drawerData, // New: Provide drawerData through the context
    }

    return (
        <DrawerContext.Provider value={contextValue}>
            {children}
        </DrawerContext.Provider>
    )
}
