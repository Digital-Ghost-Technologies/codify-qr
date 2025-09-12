# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Package Management
This project uses pnpm with a workspace configuration (`pnpm-workspace.yaml`).

## Architecture

### Tech Stack
- **Framework**: Next.js 15.5.2 with App Router
- **UI Library**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS v4 with CSS variables
- **Icons**: Lucide React
- **QR Generation**: qr-code-styling library
- **Theme**: next-themes for dark/light mode

### Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components organized by category:
  - `ui/` - Base UI components (shadcn/ui)
  - `layout/` - Layout components (header, footer)
  - `features/` - Feature-specific components
  - `forms/` - Form components
- `lib/` - Utility functions and configurations
- `types/` - TypeScript type definitions
- `hooks/` - Custom React hooks

### Key Components
- **TypeSelector** (`components/features/type-selector.tsx`): QR code type selection with icons
- **QrForms** (`components/forms/qr-forms.tsx`): Dynamic forms based on selected QR type
- **Layout**: Header/Footer layout with theme switching

### Type System
The application uses a comprehensive type system for QR codes:
- `QrCodeType`: Union of supported QR types (url, text, email, phone, wifi, contact, calendar, location)
- `QrCodeData`: Discriminated union for type-specific data structures
- Each QR type has its own interface (UrlData, EmailData, etc.)

### Configuration
- **Path Aliases**: `@/*` maps to project root
- **shadcn/ui**: Configured with "new-york" style, Slate base color
- **Theme Provider**: Configured for light/dark mode switching with local storage