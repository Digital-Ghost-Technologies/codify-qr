import { QrDataMap } from "@/types/qr";

const defaultData: QrDataMap = {
  url: {
      url: '',
      type: "url"
  },
  text: {
      text: '',
      type: "text"
  },
  email: {
      email: '', 
      subject: '', 
      body: '',
      type: "email"
  },
  phone: {
      phoneNumber: '',
      type: "phone"
  },
  contact: {
   type: 'contact',
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    phone: '',
    email: '',
    address: '',
    website: '',
  },
  location: {
      latitude: '',
      longitude: '',
      address: '',
      type: "location"
  },
  wifi: {
      ssid: '',
      password: '',
      encryption: 'WPA',
      hidden: false,
      type: "wifi"
  },
  calendar: {
      title: '',
      description: '',
      location: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      allDay: false,
      type: "calendar"
  },
};
