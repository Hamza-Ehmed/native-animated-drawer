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
