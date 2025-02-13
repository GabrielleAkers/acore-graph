import "leaflet/dist/leaflet.css";
import "./style.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { AzerothMap, OutlandMap } from "./components/Map";
import AppContainer from "./components/AppContainer";

const dark_theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const Maps = ["azeroth", "outland"] as const;
type AvailMaps = (typeof Maps)[number];

const AppContent = AppContainer<AvailMaps>;

export default function App() {
    const [current_map, set_current_map] = useState<AvailMaps>(
        (localStorage.getItem("lastmap") as AvailMaps) ?? "azeroth"
    );

    const on_select_map_tab = (k: AvailMaps) => {
        if (!["azeroth", "outland"].includes(k)) return;
        localStorage.setItem("lastmap", k);
        set_current_map(k);
    };

    return (
        <ThemeProvider theme={dark_theme}>
            <CssBaseline />
            <AppContent
                tab_vals={Maps}
                current_tab={current_map}
                on_select_tab={on_select_map_tab}
                main_content={
                    <>
                        {current_map === "outland" ? (
                            <OutlandMap />
                        ) : (
                            <AzerothMap />
                        )}
                    </>
                }
            />
        </ThemeProvider>
    );
}
