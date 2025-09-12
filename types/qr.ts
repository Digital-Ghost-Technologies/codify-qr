export type QrCodeType = 
    | 'url' 
    | 'text' 
    | 'email' 
    | 'phone' 
    | 'wifi' 
    | 'contact' 
    | 'calendar'
    | 'location';

export interface QrCodeOptions {
    text: string;
    correctLevel: 'L' | 'M' | 'Q' | 'H'; // Error correction level
    
    // Background options
    backgroundOptions: {
        color: string;
        transparent: boolean;
    };
    
    // Dots (modules) options
    dotsOptions: {
        color: string;
        gradient?: {
            type: 'linear' | 'radial';
            rotation: number;
            colorStops: Array<{ offset: number; color: string; }>;
        };
        type: 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
    };
    
    // Corners square options
    cornersSquareOptions?: {
        color: string;
        gradient?: {
            type: 'linear' | 'radial';
            rotation: number;
            colorStops: Array<{ offset: number; color: string; }>;
        };
        type: 'square' | 'dot' | 'extra-rounded';
    };
    
    // Corner dots options
    cornersDotOptions?: {
        color: string;
        gradient?: {
            type: 'linear' | 'radial';
            rotation: number;
            colorStops: Array<{ offset: number; color: string; }>;
        };
        type: 'square' | 'dot';
    };
}

// QR Form data types
export type UrlData = {
    type: 'url';
    url: string;
};

export type TextData = {
    type: 'text';
    text: string;
};

export type EmailData = {
    type: 'email';
    email: string;
    subject?: string;
    body?: string;
};

export type PhoneData = {
    type: 'phone';
    phoneNumber: string;
};

export type WifiData = {
    type: 'wifi';
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden: boolean;
};

export type ContactData = {
    type: 'contact';
    firstName: string;
    lastName: string;
    organization?: string;
    title?: string;
    phone?: string;
    email?: string;
    address?: string;
    website?: string;
};

export type CalendarData = {
    type: 'calendar';
    title: string;
    startDate: string; // ISO date string
    startTime?: string; // ISO time string
    endDate?: string; // ISO date string
    endTime?: string; // ISO time string
    location?: string;
    description?: string;
    allDay?: boolean;
};

export type LocationData = {
    type: 'location';
    latitude: string;
    longitude: string;
    address?: string;
};  

// QR Code Data union type
export type QrCodeData = 
    | UrlData
    | TextData
    | EmailData
    | PhoneData
    | WifiData
    | ContactData
    | CalendarData
    | LocationData;


// QR Code State
export interface QrCodeState {
    type: QrCodeType;
    data: QrCodeData;
    options: QrCodeOptions;
}

// Type mapping for QR code types to their corresponding data interfaces
export type QrDataMap = {
  url: UrlData;
  text: TextData;
  email: EmailData;
  phone: PhoneData;
  contact: ContactData;
  location: LocationData;
  wifi: WifiData;
  calendar: CalendarData;
};
