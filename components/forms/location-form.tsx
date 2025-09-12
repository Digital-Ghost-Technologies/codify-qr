'use client';

import { LocationData } from "@/types/qr";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import("./location-map"), {
    ssr: false,
    loading: () => <div className="h-64 bg-muted flex items-center justify-center">Loading map...</div>
});

interface LocationFormProps {
    locationData: LocationData;
    onChange: (partial: Partial<LocationData>) => void;
}

export function LocationForm({ locationData, onChange }: LocationFormProps) {
    const [isGeocoding, setIsGeocoding] = useState(false);
    const [error, setError] = useState<string>("");
    const [coordError, setCoordError] = useState<{ lat?: string | null; lng?: string | null }>({});

    // Validation functions
    const validateLatitude = useCallback((lat: string): string | null => {
        if (!lat.trim()) return null;
        const num = parseFloat(lat);
        if (isNaN(num)) return "Latitude must be a number";
        if (num < -90 || num > 90) return "Latitude must be between -90 and 90";
        return null;
    }, []);

    const validateLongitude = useCallback((lng: string): string | null => {
        if (!lng.trim()) return null;
        const num = parseFloat(lng);
        if (isNaN(num)) return "Longitude must be a number";
        if (num < -180 || num > 180) return "Longitude must be between -180 and 180";
        return null;
    }, []);

    // Geocoding function using Nominatim API (OpenStreetMap)
    const geocodeAddress = useCallback(async (address: string) => {
        if (!address.trim()) {
            setError("Please enter an address to search");
            return;
        }

        setIsGeocoding(true);
        setError("");

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
            );

            if (!response.ok) {
                throw new Error("Failed to search address");
            }

            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                onChange({
                    latitude: lat,
                    longitude: lon
                });
                setError("");
            } else {
                setError("Address not found. Please try a different address or be more specific.");
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            setError("Failed to search address. Please check your internet connection and try again.");
        } finally {
            setIsGeocoding(false);
        }
    }, [onChange]);

    // Reverse geocoding function
    const reverseGeocode = useCallback(async (lat: string, lng: string) => {
        if (!lat || !lng) return;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();

            if (data && data.display_name) {
                onChange({
                    address: data.display_name
                });
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
        }
    }, [onChange]);

    // Handle map click
    const handleMapClick = useCallback((lat: number, lng: number) => {
        onChange({
            latitude: lat.toString(),
            longitude: lng.toString()
        });
        // Reverse geocode to get address
        reverseGeocode(lat.toString(), lng.toString());
    }, [onChange, reverseGeocode]);

    // Handle address search
    const handleAddressSearch = useCallback(() => {
        if (locationData.address) {
            geocodeAddress(locationData.address);
        }
    }, [locationData.address, geocodeAddress]);

    // Handle coordinate changes with validation
    const handleLatitudeChange = useCallback((value: string) => {
        onChange({ latitude: value });
        const error = validateLatitude(value);
        setCoordError(prev => ({ ...prev, lat: error }));
    }, [onChange, validateLatitude]);

    const handleLongitudeChange = useCallback((value: string) => {
        onChange({ longitude: value });
        const error = validateLongitude(value);
        setCoordError(prev => ({ ...prev, lng: error }));
    }, [onChange, validateLongitude]);

    // Handle address input keypress
    const handleAddressKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddressSearch();
        }
    }, [handleAddressSearch]);

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                        id="latitude"
                        placeholder="40.7128"
                        value={locationData.latitude}
                        onChange={(e) => handleLatitudeChange(e.target.value)}
                        className={coordError.lat ? "border-red-500" : ""}
                    />
                    {coordError.lat && (
                        <span className="text-sm text-red-500 mt-1">{coordError.lat}</span>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                        id="longitude"
                        placeholder="-74.0060"
                        value={locationData.longitude}
                        onChange={(e) => handleLongitudeChange(e.target.value)}
                        className={coordError.lng ? "border-red-500" : ""}
                    />
                    {coordError.lng && (
                        <span className="text-sm text-red-500 mt-1">{coordError.lng}</span>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="address">Address</Label>
                <div className="flex gap-2">
                    <Input
                        id="address"
                        placeholder="123 Main St, City, State, Country"
                        value={locationData.address ?? ""}
                        onChange={(e) => {
                            onChange({ address: e.target.value });
                            setError(""); // Clear error when user types
                        }}
                        onKeyDown={handleAddressKeyDown}
                        className="flex-1"
                    />
                    <Button
                        type="button"
                        onClick={handleAddressSearch}
                        disabled={isGeocoding || !locationData.address}
                        className="px-3 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                        {isGeocoding ? "..." : "Search"}
                    </Button>
                </div>
                {error && (
                    <span className="text-sm text-red-500 mt-1">{error}</span>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <Label>Map Location</Label>
                <div className="mt-2 border rounded-md overflow-hidden">
                    <MapComponent
                        latitude={parseFloat(locationData.latitude) || 40.7128}
                        longitude={parseFloat(locationData.longitude) || -74.0060}
                        onMapClick={handleMapClick}
                        hasValidCoordinates={!coordError.lat && !coordError.lng &&
                            Boolean(locationData.latitude) && Boolean(locationData.longitude) &&
                            !isNaN(parseFloat(locationData.latitude)) &&
                            !isNaN(parseFloat(locationData.longitude))}
                    />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    Click on the map to set coordinates
                </p>
            </div>
        </div>
    );
}