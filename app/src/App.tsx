import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./style.css";

import { Container } from "react-bootstrap";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { CRS } from "leaflet";
import { useEffect, useState } from "react";

const dev_mode = process.env.NODE_ENV !== "production";
const tiles_origin = dev_mode
    ? window.location.origin
    : "https://maptiles.hawk-tuah.gay";

const SetViewAutomatically = ({
    lat,
    lng,
    zoom,
}: {
    lat: number;
    lng: number;
    zoom?: number;
}) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng], zoom);
    }, [lat, lng]);
    return null;
};

const OutlandMap = () => {
    return (
        <MapContainer
            bounds={[
                [-8192, -8192],
                [8192, 8192],
            ]}
            maxBounds={[
                [-400, -700],
                [400, 128],
            ]}
            style={{
                height: window.screen.height,
                backgroundColor: "white",
            }}
            crs={CRS.Simple}
            maxBoundsViscosity={1}
            zoom={3}
            center={[0, -32]}
        >
            <TileLayer
                url={`${tiles_origin}/map_data/Outland/{z}/{x}/{y}.png`}
                tileSize={256}
                bounds={[
                    [-8192, -8192],
                    [8192, 8192],
                ]}
                zoomReverse
                minZoom={0}
                maxZoom={3}
            />
            <SetViewAutomatically lat={0} lng={-414} />
        </MapContainer>
    );
};

const AzerothMap = () => {
    return (
        <MapContainer
            bounds={[
                [-8192, -8192],
                [8192, 8192],
            ]}
            maxBounds={[
                [-2048, -2048],
                [512, 2048],
            ]}
            style={{
                height: window.screen.height,
                backgroundColor: "white",
            }}
            crs={CRS.Simple}
            maxBoundsViscosity={1}
            zoom={0}
        >
            <TileLayer
                url={`${tiles_origin}/map_data/Azeroth/{z}/{x}/{y}.png`}
                tileSize={256}
                bounds={[
                    [-8192, -8192],
                    [8192, 8192],
                ]}
                zoomReverse
                minZoom={0}
                maxZoom={3}
            />
            <SetViewAutomatically lat={0} lng={0} zoom={3} />
        </MapContainer>
    );
};

export default function App() {
    const [current_map, set_current_map] = useState<"outland" | "azeroth">(
        "azeroth"
    );

    useEffect(() => {
        const query = new URL(window.location.toString()).searchParams;
        const map_param = query.get("map");
        if (map_param === "azeroth" || map_param === "outland") {
            set_current_map(map_param);
        }
    });

    return (
        <Container data-bs-theme="dark" fluid style={{ padding: 0 }}>
            {current_map === "outland" ? <OutlandMap /> : <AzerothMap />}
        </Container>
    );
}
