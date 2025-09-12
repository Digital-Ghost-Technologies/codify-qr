'use client';

import { QrCodeType } from '@/types/qr';
import { Calendar, Contact, FileText, Link, Mail, MapPin, Phone, QrCode, Wifi } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TypeSelectorProps {
    selectedType: QrCodeType;
    onTypeChange: (type: QrCodeType) => void;
}

const qrTypes: { type: QrCodeType; label: string; icon: typeof Calendar }[] = [
    { type: 'url' as const, label: 'URL', icon: Link },
    { type: 'text' as const, label: 'Text', icon: FileText },
    { type: 'email' as const, label: 'Email', icon: Mail },
    { type: 'phone' as const, label: 'Phone', icon: Phone },
    { type: 'wifi' as const, label: 'WiFi', icon: Wifi },
    { type: 'contact' as const, label: 'Contact', icon: Contact },
    { type: 'calendar' as const, label: 'Calendar', icon: Calendar },
    { type: 'location' as const, label: 'Location', icon: MapPin },
];

export function TypeSelector({ selectedType, onTypeChange }: TypeSelectorProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="gap-x-2 flex items-center"><QrCode className="w-5 h-5" />QR Code Type</div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {qrTypes.map(({ type, label, icon: Icon }) => (
                        <Button
                            key={type}
                            onClick={() => onTypeChange(type)}
                            variant={selectedType === type ? "default" : "ghost"}
                            className="cursor-pointer type-select-button"
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>

    );
}