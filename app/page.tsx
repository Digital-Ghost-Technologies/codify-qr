'use client';

import { QrCustomizer } from "@/components/features/qr-customizer";
import { QrPreview } from "@/components/features/qr-preview";
import { TypeSelector } from "@/components/features/type-selector";
import { QrForms } from "@/components/forms/qr-forms";
import { QrCodeData, QrCodeOptions, QrCodeType } from "@/types/qr";
import { useCallback, useState } from "react";

export default function Home() {
  const [selectedType, setSelectedType] = useState<QrCodeType>("url");
  const [data, setData] = useState<QrCodeData>({ type: "url", url: "" });
  const [qrOptions, setQrOptions] = useState<QrCodeOptions>({
    text: "",
    correctLevel: 'M',
    backgroundOptions: {
      color: '#ffffff',
      transparent: false
    },
    dotsOptions: {
      color: '#000000',
      type: 'square'
    },
    cornersSquareOptions: {
      color: '#000000',
      type: 'square'
    },
    cornersDotOptions: {
      color: '#000000',
      type: 'square'
    }
  });

  const updateData = useCallback((newData: Partial<QrCodeData>) => {
    setData(prev => ({
      ...prev, ...newData
    } as QrCodeData))
  }, []);

  const updateQrOptions = useCallback((newOptions: Partial<QrCodeOptions>) => {
    setQrOptions(prev => ({
      ...prev, ...newOptions
    }));
  }, []);

  const handleTypeChange = useCallback((newType: QrCodeType) => {
    setSelectedType(newType);
    // Reset data structure to match the new type
    switch (newType) {
      case 'url':
        setData({ type: 'url', url: '' });
        break;
      case 'text':
        setData({ type: 'text', text: '' });
        break;
      case 'email':
        setData({ type: 'email', email: '', subject: '', body: '' });
        break;
      case 'phone':
        setData({ type: 'phone', phoneNumber: '' });
        break;
      case 'wifi':
        setData({ type: 'wifi', ssid: '', password: '', encryption: 'WPA', hidden: false });
        break;
      case 'contact':
        setData({ type: 'contact', firstName: '', lastName: '', organization: '', title: '', phone: '', email: '', website: '', address: '' });
        break;
      case 'calendar':
        setData({ type: 'calendar', title: '', startDate: '', startTime: '', endDate: '', endTime: '', location: '', description: '', allDay: false });
        break;
      case 'location':
        setData({ type: 'location', latitude: '', longitude: '', address: '' });
        break;
      default:
        setData({ type: 'url', url: '' });
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Type Selection */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <TypeSelector
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
          />
        </div>

        <div className="lg:col-span-4 order-3 lg:order-2">
          <div className="flex flex-col gap-6">
            {/* Form Section */}

            <QrForms
              selectedType={selectedType}
              data={data}
              onDataChange={updateData}
            />
            {/* Customization Section */}

            <QrCustomizer
              options={qrOptions}
              onChange={updateQrOptions}
            />
          </div>


        </div>

        {/* Preview Section */}
        <div className="lg:col-span-2 order-1 lg:order-3">
          <QrPreview
            data={data}
            options={qrOptions}
          />
        </div>
      </div>
    </div>
  );
}
