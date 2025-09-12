'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapClickHandlerProps {
    onMapClick: (lat: number, lng: number) => void;
}

function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
    useMapEvents({
        click: (e) => {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

interface LocationMapProps {
    latitude: number;
    longitude: number;
    onMapClick: (lat: number, lng: number) => void;
    hasValidCoordinates?: boolean;
}

export default function LocationMap({ latitude, longitude, onMapClick, hasValidCoordinates = true }: LocationMapProps) {
    const mapRef = useRef<L.Map>(null);

    // Update map view when coordinates change
    useEffect(() => {
        if (mapRef.current && !isNaN(latitude) && !isNaN(longitude)) {
            mapRef.current.setView([latitude, longitude], mapRef.current.getZoom());
        }
    }, [latitude, longitude]);

    // Default to NYC if no valid coordinates
    const validLat = !isNaN(latitude) ? latitude : 40.7128;
    const validLng = !isNaN(longitude) ? longitude : -74.0060;

    return (
        <MapContainer
            center={[validLat, validLng]}
            zoom={13}
            style={{ height: '300px', width: '100%' }}
            ref={mapRef}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {hasValidCoordinates && !isNaN(latitude) && !isNaN(longitude) && (
                <Marker position={[latitude, longitude]} />
            )}
            
            <MapClickHandler onMapClick={onMapClick} />
        </MapContainer>
    );
}