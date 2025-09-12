'use client';

import { useDebounce } from "@/hooks/use-debounce";
import { QrCodeData, QrCodeOptions } from "@/types/qr";
import { Copy, Download, Eye, Image as ImageIcon } from "lucide-react";
import QRCodeStyling from "qr-code-styling";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface QrPreviewProps {
    data: QrCodeData;
    options: QrCodeOptions;
}

export function QrPreview({ data, options }: QrPreviewProps) {
    const ref = useRef<HTMLDivElement>(null);
    const qrCode = useRef<QRCodeStyling | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [downloadSize, setDownloadSize] = useState(300);
    const [containerKey, setContainerKey] = useState(0);

    // Debounce simple form types (url, text, phone) for 500ms
    const debouncedData = useDebounce(data, 500);

    // Check if complex forms have required fields
    const isComplexFormValid = useMemo(() => {
        switch (data.type) {
            case 'email':
                return data.email.trim().length > 0;
            case 'wifi':
                return data.ssid.trim().length > 0;
            case 'contact':
                return data.firstName.trim().length > 0 && data.lastName.trim().length > 0;
            case 'calendar':
                return data.title.trim().length > 0 && data.startDate.trim().length > 0;
            case 'location':
                return data.latitude.trim().length > 0 && data.longitude.trim().length > 0;
            default:
                return true;
        }
    }, [data]);

    // Check if simple forms have required content and types match
    const isSimpleFormValid = useMemo(() => {
        // Ensure the debounced data type matches the current data type
        if (debouncedData.type !== data.type) return false;

        switch (debouncedData.type) {
            case 'url':
                return debouncedData.url.trim().length > 0;
            case 'text':
                return debouncedData.text.trim().length > 0;
            case 'phone':
                return debouncedData.phoneNumber.trim().length > 0;
            default:
                return true;
        }
    }, [debouncedData, data.type]);

    // Determine which data to use for QR generation
    const effectiveData = useMemo(() => {
        const simpleTypes = ['url', 'text', 'phone'];
        if (simpleTypes.includes(data.type)) {
            return isSimpleFormValid ? debouncedData : null;
        } else {
            return isComplexFormValid ? data : null;
        }
    }, [data, debouncedData, isSimpleFormValid, isComplexFormValid]);

    // Convert QR data to text format for the QR code
    const generateQrText = (data: QrCodeData): string => {
        switch (data.type) {
            case 'url':
                return data.url;
            case 'text':
                return data.text;
            case 'email':
                const emailParts = [`mailto:${data.email}`];
                if (data.subject) emailParts.push(`subject=${encodeURIComponent(data.subject)}`);
                if (data.body) emailParts.push(`body=${encodeURIComponent(data.body)}`);
                return emailParts.length > 1 ? `${emailParts[0]}?${emailParts.slice(1).join('&')}` : emailParts[0];
            case 'phone':
                return `tel:${data.phoneNumber}`;
            case 'wifi':
                return `WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};H:${data.hidden ? 'true' : 'false'};;`;
            case 'contact':
                const vcardLines = [
                    'BEGIN:VCARD',
                    'VERSION:3.0',
                    `FN:${data.firstName} ${data.lastName}`,
                    `N:${data.lastName};${data.firstName};;;`
                ];
                if (data.organization) vcardLines.push(`ORG:${data.organization}`);
                if (data.title) vcardLines.push(`TITLE:${data.title}`);
                if (data.phone) vcardLines.push(`TEL:${data.phone}`);
                if (data.email) vcardLines.push(`EMAIL:${data.email}`);
                if (data.website) vcardLines.push(`URL:${data.website}`);
                if (data.address) vcardLines.push(`ADR:;;${data.address};;;;`);
                vcardLines.push('END:VCARD');
                return vcardLines.join('\n');
            case 'calendar':
                const eventLines = [
                    'BEGIN:VEVENT',
                    `SUMMARY:${data.title}`,
                    `DTSTART:${data.startDate.replace(/-/g, '')}${data.startTime ? 'T' + data.startTime.replace(':', '') + '00' : ''}`
                ];
                if (data.endDate) {
                    eventLines.push(`DTEND:${data.endDate.replace(/-/g, '')}${data.endTime ? 'T' + data.endTime.replace(':', '') + '00' : ''}`);
                }
                if (data.location) eventLines.push(`LOCATION:${data.location}`);
                if (data.description) eventLines.push(`DESCRIPTION:${data.description}`);
                eventLines.push('END:VEVENT');
                return eventLines.join('\n');
            case 'location':
                if (data.latitude && data.longitude) {
                    return `geo:${data.latitude},${data.longitude}`;
                }
                return '';
            default:
                return '';
        }
    };

    // Validate hex color format
    const isValidHex = (color: string): boolean => {
        return /^#[0-9A-Fa-f]{6}$/.test(color);
    };

    // Safe color that falls back to default if invalid
    const safeColor = useCallback((color: string, fallback: string): string => {
        return isValidHex(color) ? color : fallback;
    }, []);

    // Force clear all QR-related DOM elements
    const forceCleanContainer = () => {
        if (!ref.current) return;
        
        // Remove all SVG elements specifically
        const svgs = ref.current.querySelectorAll('svg');
        svgs.forEach(svg => svg.remove());
        
        // Remove all canvas elements
        const canvases = ref.current.querySelectorAll('canvas');
        canvases.forEach(canvas => canvas.remove());
        
        // Clear all children
        while (ref.current.firstChild) {
            ref.current.removeChild(ref.current.firstChild);
        }
        
        ref.current.innerHTML = '';
    };

    // Force re-mount container when type changes
    useEffect(() => {
        qrCode.current = null;
        setIsGenerating(false);
        setContainerKey(prev => prev + 1);
    }, [data.type]);

    useEffect(() => {
        if (!ref.current) return;
        
        if (!effectiveData) {
            // Clear QR code if no effective data
            forceCleanContainer();
            qrCode.current = null;
            return;
        }

        const qrText = generateQrText(effectiveData);
        if (!qrText.trim()) {
            // Clear QR code if no valid text
            forceCleanContainer();
            qrCode.current = null;
            return;
        }

        setIsGenerating(true);

        try {
            // Force clear the container before creating new QR code
            forceCleanContainer();
            qrCode.current = null;
            
            // Create QR code styling options - preview uses fixed size and margin
            const qrOptions = {
                width: 200,
                height: 200,
                type: "svg" as const,
                data: qrText,
                margin: 4,
                qrOptions: {
                    typeNumber: 0 as const,
                    mode: "Byte" as const,
                    errorCorrectionLevel: options.correctLevel
                },
                imageOptions: {
                    hideBackgroundDots: true,
                    imageSize: 0.4,
                    margin: 0,
                    crossOrigin: "anonymous" as const
                },
                dotsOptions: {
                    color: options.dotsOptions.gradient ? undefined : safeColor(options.dotsOptions.color, '#000000'),
                    gradient: options.dotsOptions.gradient ? {
                        ...options.dotsOptions.gradient,
                        colorStops: options.dotsOptions.gradient.colorStops?.map(stop => ({
                            ...stop,
                            color: safeColor(stop.color, '#000000')
                        }))
                    } : undefined,
                    type: options.dotsOptions.type
                },
                backgroundOptions: {
                    color: options.backgroundOptions.transparent ? "transparent" : safeColor(options.backgroundOptions.color, '#ffffff')
                },
                cornersSquareOptions: options.cornersSquareOptions ? {
                    color: options.cornersSquareOptions.gradient ? undefined : safeColor(options.cornersSquareOptions.color, '#000000'),
                    gradient: options.cornersSquareOptions.gradient ? {
                        ...options.cornersSquareOptions.gradient,
                        colorStops: options.cornersSquareOptions.gradient.colorStops?.map(stop => ({
                            ...stop,
                            color: safeColor(stop.color, '#000000')
                        }))
                    } : undefined,
                    type: options.cornersSquareOptions.type
                } : undefined,
                cornersDotOptions: options.cornersDotOptions ? {
                    color: options.cornersDotOptions.gradient ? undefined : safeColor(options.cornersDotOptions.color, '#000000'),
                    gradient: options.cornersDotOptions.gradient ? {
                        ...options.cornersDotOptions.gradient,
                        colorStops: options.cornersDotOptions.gradient.colorStops?.map(stop => ({
                            ...stop,
                            color: safeColor(stop.color, '#000000')
                        }))
                    } : undefined,
                    type: options.cornersDotOptions.type
                } : undefined
            };

            // Always create a fresh QR code instance
            qrCode.current = new QRCodeStyling(qrOptions);

            // Append new QR code to the cleared container
            qrCode.current.append(ref.current);
        } catch (error) {
            console.error('Error generating QR code:', error);
        } finally {
            setIsGenerating(false);
        }
    }, [effectiveData, options, safeColor]);

    // Cleanup on unmount
    useEffect(() => {
        const currentRef = ref.current;
        return () => {
            if (currentRef) {
                // Remove all SVG elements specifically
                const svgs = currentRef.querySelectorAll('svg');
                svgs.forEach(svg => svg.remove());
                
                // Remove all canvas elements
                const canvases = currentRef.querySelectorAll('canvas');
                canvases.forEach(canvas => canvas.remove());
                
                // Clear all children
                while (currentRef.firstChild) {
                    currentRef.removeChild(currentRef.firstChild);
                }
                
                currentRef.innerHTML = '';
            }
            qrCode.current = null;
        };
    }, []);

    const downloadQR = (format: 'png' | 'svg' | 'jpeg') => {
        if (!qrCode.current || !effectiveData) return;

        const qrText = generateQrText(effectiveData);
        if (!qrText.trim()) return;

        // Create a separate QR code instance for download with download size
        const downloadQrOptions = {
            width: downloadSize,
            height: downloadSize,
            type: "svg" as const,
            data: qrText,
            margin: 4,
            qrOptions: {
                typeNumber: 0 as const,
                mode: "Byte" as const,
                errorCorrectionLevel: options.correctLevel
            },
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 0,
                crossOrigin: "anonymous" as const
            },
            dotsOptions: {
                color: options.dotsOptions.gradient ? undefined : safeColor(options.dotsOptions.color, '#000000'),
                gradient: options.dotsOptions.gradient ? {
                    ...options.dotsOptions.gradient,
                    colorStops: options.dotsOptions.gradient.colorStops?.map(stop => ({
                        ...stop,
                        color: safeColor(stop.color, '#000000')
                    }))
                } : undefined,
                type: options.dotsOptions.type
            },
            backgroundOptions: {
                color: options.backgroundOptions.transparent ? "transparent" : safeColor(options.backgroundOptions.color, '#ffffff')
            },
            cornersSquareOptions: options.cornersSquareOptions ? {
                color: options.cornersSquareOptions.gradient ? undefined : safeColor(options.cornersSquareOptions.color, '#000000'),
                gradient: options.cornersSquareOptions.gradient ? {
                    ...options.cornersSquareOptions.gradient,
                    colorStops: options.cornersSquareOptions.gradient.colorStops?.map(stop => ({
                        ...stop,
                        color: safeColor(stop.color, '#000000')
                    }))
                } : undefined,
                type: options.cornersSquareOptions.type
            } : undefined,
            cornersDotOptions: options.cornersDotOptions ? {
                color: options.cornersDotOptions.gradient ? undefined : safeColor(options.cornersDotOptions.color, '#000000'),
                gradient: options.cornersDotOptions.gradient ? {
                    ...options.cornersDotOptions.gradient,
                    colorStops: options.cornersDotOptions.gradient.colorStops?.map(stop => ({
                        ...stop,
                        color: safeColor(stop.color, '#000000')
                    }))
                } : undefined,
                type: options.cornersDotOptions.type
            } : undefined
        };

        const downloadQr = new QRCodeStyling(downloadQrOptions);
        const fileName = `qr-code.${format}`;
        downloadQr.download({ name: fileName, extension: format });
    };

    const copyQRText = async () => {
        if (!effectiveData) return;
        const qrText = generateQrText(effectiveData);
        try {
            await navigator.clipboard.writeText(qrText);
            toast.success("QR code data copied to clipboard!");
        } catch (error) {
            console.error('Failed to copy text:', error);
            toast.error("Failed to copy QR code data");
        }
    };

    const copyQRImage = async () => {
        if (!qrCode.current || !effectiveData) return;

        try {
            // Get the SVG element from the QR code
            const svgElement = ref.current?.querySelector('svg');
            if (!svgElement) return;

            // Create a canvas to convert SVG to PNG
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Set canvas size to match QR code
            canvas.width = 200;
            canvas.height = 200;

            // Convert SVG to data URL
            const svgData = new XMLSerializer().serializeToString(svgElement);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);

            // Create image and draw to canvas
            const img = new Image();
            img.onload = async () => {
                ctx.drawImage(img, 0, 0);
                
                // Convert canvas to blob
                canvas.toBlob(async (blob) => {
                    if (blob) {
                        try {
                            await navigator.clipboard.write([
                                new ClipboardItem({ 'image/png': blob })
                            ]);
                            toast.success("QR code image copied to clipboard!");
                        } catch (error) {
                            console.error('Failed to copy QR code image:', error);
                            toast.error("Failed to copy QR code image");
                        }
                    }
                }, 'image/png');
                
                URL.revokeObjectURL(url);
            };
            img.src = url;
        } catch (error) {
            console.error('Failed to copy QR code image:', error);
            toast.error("Failed to copy QR code image");
        }
    };

    const hasValidData = effectiveData && generateQrText(effectiveData).trim().length > 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle><div className="gap-x-2 flex items-center"><Eye className="w-5 h-5" />QR Code Preview</div></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center min-h-[200px] bg-muted rounded-lg p-4">
                    {isGenerating ? (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                            <p className="text-sm text-muted-foreground">Generating QR code...</p>
                        </div>
                    ) : hasValidData ? (
                        <div key={containerKey} ref={ref} className="flex items-center justify-center" />
                    ) : (
                        <div className="text-center">
                            <p className="text-muted-foreground">
                                {data.type === 'url' || data.type === 'text' || data.type === 'phone'
                                    ? "Fill out the form to generate QR code"
                                    : "Complete all required fields to generate QR code"
                                }
                            </p>
                        </div>
                    )}
                </div>

                {hasValidData && !isGenerating && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="downloadSize">Download Size</Label>
                            <Slider
                                id="downloadSize"
                                min={50}
                                max={1000}
                                step={50}
                                value={[downloadSize]}
                                onValueChange={([value]) => setDownloadSize(value)}
                                className="w-full"
                            />
                            <span className="text-sm text-muted-foreground">{downloadSize}x{downloadSize} px</span>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <Button
                                onClick={() => downloadQR('png')}
                                variant="outline"
                                size="sm"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                PNG
                            </Button>
                            <Button
                                onClick={() => downloadQR('svg')}
                                variant="outline"
                                size="sm"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                SVG
                            </Button>
                            <Button
                                onClick={() => downloadQR('jpeg')}
                                variant="outline"
                                size="sm"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                JPEG
                            </Button>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={copyQRImage}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                <ImageIcon className="w-4 h-4 mr-2" />
                                Copy Image
                            </Button>
                            <Button
                                onClick={copyQRText}
                                variant="outline"
                                size="sm"
                                className="flex-1"
                            >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Data
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}