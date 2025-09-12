# Codify QR

A modern QR code generator built with Next.js 15 and Tailwind CSS. Create stylized QR codes for various data types including URLs, text, contacts, WiFi, and more.

## Features

- **Multiple QR Types**: URL, Text, Email, Phone, WiFi, Contact (vCard), Calendar, Location
- **Custom Styling**: Control colors, gradients, corner styles, and dot patterns
- **Real-time Preview**: Live QR code generation with debounced updates
- **Multiple Export Formats**: Download as PNG, SVG, or JPEG
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark/Light Theme**: Toggle between themes with persistent settings
- **Copy to Clipboard**: Copy QR code data or image directly

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router and Turbopack
- **UI Library**: Radix UI primitives with shadcn/ui components  
- **Styling**: Tailwind CSS v4 with CSS variables
- **Icons**: Lucide React
- **QR Generation**: qr-code-styling library
- **Theme**: next-themes for dark/light mode
- **Maps**: Leaflet and React Leaflet for location QR codes

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended)

### Installation

```bash
git clone <repository-url>
cd codify-qr
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

## Project Structure

```
├── app/                    # Next.js App Router pages and layouts
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Main QR generator page
│   ├── policy/            # Privacy policy page
│   └── terms/             # Terms of service page
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── layout/           # Layout components (header, footer)
│   ├── features/         # Feature-specific components
│   └── forms/            # Form components
├── lib/                  # Utility functions and configurations
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

## Key Components

- **TypeSelector**: QR code type selection interface
- **QrForms**: Dynamic forms based on selected QR type
- **QrPreview**: Real-time QR code preview with styling options
- **QrStyler**: QR code appearance customization controls

## QR Code Types

1. **URL** - Web links with automatic protocol detection
2. **Text** - Plain text content
3. **Email** - mailto links with subject and body
4. **Phone** - tel links for phone numbers
5. **WiFi** - Network credentials (SSID, password, encryption)
6. **Contact** - vCard format with name, phone, email, etc.
7. **Calendar** - vCalendar events with date, time, location
8. **Location** - Geographic coordinates for mapping apps

## Styling Options

- **Colors**: Foreground, background, and corner customization
- **Gradients**: Linear and radial gradient support
- **Patterns**: Square, circle, rounded, and extra-rounded dots
- **Corner Styles**: Various corner square and dot designs
- **Error Correction**: Multiple levels for reliability vs. capacity

## Development Notes

- Uses TypeScript for type safety
- Implements debounced updates for performance
- Supports both light and dark themes
- Mobile-responsive design with touch-friendly interactions
- Accessibility features included

## License

This project is private and not licensed for public use.