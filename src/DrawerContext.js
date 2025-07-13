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

const DEFAULT_DRAWER_HEADER_INFO = {
    title: "Organization",
    subtitle: "Awesome company",
    image: "https://i.pravatar.cc/150?img=68"
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
    drawerHeaderInfo: DEFAULT_DRAWER_HEADER_INFO,
    drawerHeaderStyles: DEFAULT_DRAWER_HEADER_STYLES,
    listItemStyles: DEFAULT_LIST_ITEM_STYLES,
    drawerData: DEFAULT_DRAWER_DATA, // New: Default drawer data
})

// Custom hook to consume the context
export const useDrawer = () => useContext(DrawerContext)

