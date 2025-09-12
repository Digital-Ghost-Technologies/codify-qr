'use client';

import { CalendarData, ContactData, EmailData, LocationData, PhoneData, QrCodeData, QrCodeType, TextData, UrlData, WifiData } from '@/types/qr';
import { TextCursorInput } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { EmailForm, PhoneForm, TextForm, UrlForm } from './basic-forms';
import { CalendarForm } from './calendar-form';
import { ContactForm } from './contact-form';
import { LocationForm } from './location-form';
import { WifiForm } from './wifi-form';

interface QrFormsProps {
    selectedType: QrCodeType;
    data: QrCodeData;
    onDataChange: (data: Partial<QrCodeData>) => void;
}

export function QrForms({ selectedType, data, onDataChange }: QrFormsProps) {
    const getFormTitle = (type: QrCodeType): string => {
        switch (type) {
            case 'url': return 'Website URL';
            case 'text': return 'Plain Text';
            case 'email': return 'Email Message';
            case 'phone': return 'Phone Number';
            case 'wifi': return 'WiFi Network';
            case 'contact': return 'Contact Information';
            case 'calendar': return 'Calendar Event';
            case 'location': return 'Location Details';
            default: return 'QR Code Data';
        }
    };

    const renderForm = () => {
        switch (selectedType) {
            case 'url':
                return <UrlForm urlData={data as UrlData} onChange={onDataChange} />;
            case 'text':
                return <TextForm textData={data as TextData} onChange={onDataChange} />;
            case 'email':
                return <EmailForm emailData={data as EmailData} onChange={onDataChange} />;
            case 'phone':
                return <PhoneForm phoneData={data as PhoneData} onChange={onDataChange} />;
            case 'wifi':
                return <WifiForm wifiData={data as WifiData} onChange={onDataChange} />;
            case 'contact':
                return <ContactForm contactData={data as ContactData} onChange={onDataChange} />;
            case 'calendar':
                return <CalendarForm calendarData={data as CalendarData} onChange={onDataChange} />;
            case 'location':
                return <LocationForm locationData={data as LocationData} onChange={onDataChange} />;
            default:
                return (
                    <div className="text-center py-8">
                        <p className="text-muted-foreground">Select a QR code type to see the form.</p>
                    </div>
                );
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-x-2">
                        <TextCursorInput className='w-5 h-5' />{getFormTitle(selectedType)}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {renderForm()}
            </CardContent>
        </Card>
    );
}