import { ReactElement, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
    Box,
    Drawer,
    IconButton,
    Tab,
    Tabs,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawer_width = Math.floor(window.screen.width / 5);

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    flexDirection: "row-reverse",
    padding: 0,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: `-${2 * drawer_width}px`,
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: 0,
            },
        },
    ],
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawer_width}px)`,
                marginRight: `${drawer_width}px`,
                transition: theme.transitions.create(["margin", "width"], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex",
}));

export default function AppContainer<T extends string>({
    main_content,
    tab_vals,
    current_tab,
    on_select_tab,
}: {
    main_content: ReactElement;
    tab_vals: readonly T[];
    current_tab: T;
    on_select_tab: (v: T) => any;
}) {
    const theme = useTheme();
    const [open, set_open] = useState(false);

    const handle_drawer_open = () => {
        set_open(true);
    };

    const handle_drawer_close = () => {
        set_open(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        paddingRight={2}
                    >
                        Acore Tilemap
                    </Typography>
                    <Tabs
                        value={current_tab}
                        onChange={(e, v) => on_select_tab(v)}
                        sx={{ flexGrow: 1 }}
                    >
                        {tab_vals.map((m) => (
                            <Tab label={m} key={m} value={m} />
                        ))}
                    </Tabs>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handle_drawer_open}
                        edge="end"
                        sx={[
                            {
                                mr: 2,
                            },
                            open && { display: "none" },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Main open={open}>
                <DrawerHeader />
                {main_content}
            </Main>
            <Drawer
                sx={{
                    width: drawer_width,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawer_width,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handle_drawer_close}>
                        {theme.direction === "rtl" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
            </Drawer>
        </Box>
    );
}
