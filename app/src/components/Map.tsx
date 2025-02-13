import { CRS } from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { MapRef } from "react-leaflet/MapContainer";

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
    const [map_ref, set_map_ref] = useState<MapRef>(null);

    useEffect(() => {
        map_ref
            ?.getContainer()
            .style.setProperty("background", "black", "important");
    });

    return (
        <MapContainer
            bounds={[
                [-8192, -8192],
                [8192, 8192],
            ]}
            maxBounds={[
                [-800, -1000],
                [850, 1000],
            ]}
            style={{
                height: window.screen.height,
                backgroundColor: "#202020",
            }}
            crs={CRS.Simple}
            maxBoundsViscosity={1}
            center={[0, -32]}
            ref={set_map_ref}
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
            <SetViewAutomatically lat={0} lng={-414} zoom={0} />
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
                backgroundColor: "#202020",
            }}
            crs={CRS.Simple}
            maxBoundsViscosity={1}
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
            <SetViewAutomatically lat={0} lng={0} zoom={0} />
        </MapContainer>
    );
};

export { AzerothMap, OutlandMap };
