'use client';

import { QrCodeOptions } from "@/types/qr";
import { Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";

interface QrCustomizerProps {
    options: QrCodeOptions;
    onChange: (options: Partial<QrCodeOptions>) => void;
}

export function QrCustomizer({ options, onChange }: QrCustomizerProps) {
    const updateDotsOptions = (updates: Partial<QrCodeOptions['dotsOptions']>) => {
        onChange({
            dotsOptions: { ...options.dotsOptions, ...updates }
        });
    };

    const updateDotsColor = (color: string) => {
        const updates: Partial<QrCodeOptions['dotsOptions']> = { color };

        // If gradient is enabled, also update the first color stop
        if (options.dotsOptions.gradient) {
            const newColorStops = [...(options.dotsOptions.gradient.colorStops || [])];
            newColorStops[0] = { ...newColorStops[0], color };
            updates.gradient = { ...options.dotsOptions.gradient, colorStops: newColorStops };
        }

        updateDotsOptions(updates);
    };

    const updateBackgroundOptions = (updates: Partial<QrCodeOptions['backgroundOptions']>) => {
        onChange({
            backgroundOptions: { ...options.backgroundOptions, ...updates }
        });
    };

    const updateBackgroundColor = (color: string) => {
        updateBackgroundOptions({ color });
    };

    const updateGradientColor = (section: 'dots' | 'cornersSquare' | 'cornersDot', colorIndex: number, color: string) => {
        if (section === 'dots' && options.dotsOptions.gradient) {
            const newColorStops = [...(options.dotsOptions.gradient.colorStops || [])];
            newColorStops[colorIndex] = { ...newColorStops[colorIndex], color };
            updateDotsOptions({
                gradient: { ...options.dotsOptions.gradient, colorStops: newColorStops }
            });
        }
        // Add similar logic for corners if needed
    };

    const updateCornersSquareOptions = (updates: Partial<QrCodeOptions['cornersSquareOptions']>) => {
        const currentOptions = options.cornersSquareOptions || { color: '#000000', type: 'square' };
        onChange({
            cornersSquareOptions: { ...currentOptions, ...updates }
        });
    };

    const updateCornersSquareColor = (color: string) => {
        updateCornersSquareOptions({ color });
    };

    const updateCornersDotOptions = (updates: Partial<QrCodeOptions['cornersDotOptions']>) => {
        const currentOptions = options.cornersDotOptions || { color: '#000000', type: 'square' };
        onChange({
            cornersDotOptions: { ...currentOptions, ...updates }
        });
    };

    const updateCornersDotColor = (color: string) => {
        updateCornersDotOptions({ color });
    };

    const toggleGradient = (section: 'dots' | 'cornersSquare' | 'cornersDot', enabled: boolean) => {
        if (section === 'dots') {
            updateDotsOptions({
                gradient: enabled ? {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: options.dotsOptions.color },
                        { offset: 1, color: '#666666' }
                    ]
                } : undefined
            });
        } else if (section === 'cornersSquare') {
            updateCornersSquareOptions({
                gradient: enabled ? {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: options.cornersSquareOptions?.color || '#000000' },
                        { offset: 1, color: '#666666' }
                    ]
                } : undefined
            });
        } else if (section === 'cornersDot') {
            updateCornersDotOptions({
                gradient: enabled ? {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: options.cornersDotOptions?.color || '#000000' },
                        { offset: 1, color: '#666666' }
                    ]
                } : undefined
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle><div className="flex items-center gap-x-2">
                    <Palette className="w-5 h-5" />Customize QR Code</div></CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <Label htmlFor="correctLevel">Error Correction Level</Label>
                        <RadioGroup
                            defaultValue={options.correctLevel}
                            className="flex flex-row gap-x-2"
                            onValueChange={(value: 'L' | 'M' | 'Q' | 'H') => onChange({ correctLevel: value })}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="L" id="L" />
                                <Label htmlFor="L">Low (7%)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="M" id="M" />
                                <Label htmlFor="M">Medium (15%)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Q" id="Q" />
                                <Label htmlFor="Q">Quartile (25%)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="H" id="H" />
                                <Label htmlFor="H">High (30%)</Label>
                            </div>
                        </RadioGroup>
                        <p className="text-sm text-muted-foreground">
                            Higher levels provide better error recovery but create more complex QR codes
                        </p>
                    </div>
                </div>

                <Separator />

                {/** Shape Style and Colors */}
                <div className="space-y-4">
                    <h3 className="font-medium flex items-center gap-2">Shape Style</h3>
                    <div className="space-y-2">
                        <Select
                            value={options.dotsOptions.type}
                            onValueChange={(value: QrCodeOptions['dotsOptions']['type']) =>
                                updateDotsOptions({ type: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="square">Square</SelectItem>
                                <SelectItem value="dots">Dots</SelectItem>
                                <SelectItem value="rounded">Rounded</SelectItem>
                                <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                                <SelectItem value="classy">Classy</SelectItem>
                                <SelectItem value="classy-rounded">Classy Rounded</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="bg-accent rounded-xl gap-8 p-5 grid grid-cols-1 md:grid-cols-2">
                        <div className="flex flex-col gap-4">
                            <div className="space-y-5">
                                <Label htmlFor="bgColor">Background Color</Label>

                                <div className="flex gap-2">
                                    <Input
                                        id="bgColor"
                                        type="color"
                                        value={options.backgroundOptions.color}
                                        disabled={options.backgroundOptions.transparent}
                                        onChange={(e) =>
                                            updateBackgroundColor(e.target.value)
                                        }
                                        className="w-14 h-10 p-0.5 border bg-background rounded"
                                    />
                                    <Input
                                        value={options.backgroundOptions.color}
                                        onChange={(e) =>
                                            updateBackgroundColor(e.target.value)
                                        }
                                        placeholder="#ffffff"
                                        disabled={options.backgroundOptions.transparent}
                                        className="flex-1 bg-background h-10"
                                    />
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Switch
                                        id="transparent"
                                        checked={options.backgroundOptions.transparent}
                                        onCheckedChange={(checked) =>
                                            updateBackgroundOptions({ transparent: checked })
                                        }
                                    />
                                    <Label htmlFor="transparent">Transparent Background</Label>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="space-y-5">
                                <Label>Shape Color</Label>
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <Input
                                            id="dotsColor"
                                            type="color"
                                            value={options.dotsOptions.color}
                                            onChange={(e) => updateDotsColor(e.target.value)}
                                            className="w-14 h-10 p-0.5 border bg-background rounded"
                                        />
                                        <Input
                                            value={options.dotsOptions.color}
                                            onChange={(e) => updateDotsColor(e.target.value)}
                                            placeholder="#000000"
                                            className="flex-1 bg-background h-10"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Switch
                                        id="dotsGradient"
                                        className="bg-background"
                                        checked={!!options.dotsOptions.gradient}
                                        onCheckedChange={(checked) => toggleGradient('dots', checked)}
                                    />
                                    <Label htmlFor="dotsGradient">Use Gradient</Label>
                                </div>

                                {options.dotsOptions.gradient && (
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Second Color</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    type="color"
                                                    value={options.dotsOptions.gradient?.colorStops[1]?.color || '#000000'}
                                                    onChange={(e) => updateGradientColor('dots', 1, e.target.value)}
                                                    className="w-14 h-10 p-0.5 border bg-background rounded"
                                                />
                                                <Input
                                                    value={options.dotsOptions.gradient?.colorStops[1]?.color || '#000000'}
                                                    onChange={(e) => updateGradientColor('dots', 1, e.target.value)}
                                                    className="flex-1 bg-background h-10"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Gradient Type</Label>
                                            <Select
                                                value={options.dotsOptions.gradient?.type || 'linear'}
                                                onValueChange={(value: 'linear' | 'radial') =>
                                                    updateDotsOptions({
                                                        gradient: { ...options.dotsOptions.gradient!, type: value }
                                                    })
                                                }
                                            >
                                                <SelectTrigger className="bg-background">
                                                    <SelectValue placeholder="Select gradient type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="linear">Linear</SelectItem>
                                                    <SelectItem value="radial">Radial</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {options.dotsOptions.gradient?.type === 'linear' && (
                                            <div className="space-y-3">
                                                <Label>Rotation</Label>
                                                <Slider
                                                    min={0}
                                                    max={360}
                                                    step={15}
                                                    className="bg-background"
                                                    value={[options.dotsOptions.gradient?.rotation || 0]}
                                                    onValueChange={([value]) =>
                                                        updateDotsOptions({
                                                            gradient: { ...options.dotsOptions.gradient!, rotation: value }
                                                        })
                                                    }
                                                />
                                                <span className="text-sm text-muted-foreground">
                                                    {options.dotsOptions.gradient?.rotation || 0}°
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-medium">Corner Squares</h4>

                        <div className="bg-accent rounded-xl gap-3 md:gap-5 p-5 flex ">
                            <div className="space-y-3">
                                <Label>Style</Label>
                                <Select
                                    value={options.cornersSquareOptions?.type || 'square'}
                                    onValueChange={(value: 'square' | 'dot' | 'extra-rounded') =>
                                        updateCornersSquareOptions({ type: value })
                                    }
                                >
                                    <SelectTrigger className="bg-background">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="square">Square</SelectItem>
                                        <SelectItem value="dot">Dot</SelectItem>
                                        <SelectItem value="extra-rounded">Extra Rounded</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Color</Label>
                                <div className="flex gap-3">
                                    <Input
                                        type="color"
                                        value={options.cornersSquareOptions?.color || '#000000'}
                                        onChange={(e) => updateCornersSquareColor(e.target.value)}
                                        className="w-14 h-10 p-0.5 border rounded bg-background"
                                    />
                                    <Input
                                        value={options.cornersSquareOptions?.color || '#000000'}
                                        onChange={(e) => updateCornersSquareColor(e.target.value)}
                                        className="flex-1 bg-background h-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium">Corner Dots</h4>
                        <div className="bg-accent rounded-xl gap-3 md:gap-5 p-5 flex ">

                            <div className="space-y-3">
                                <Label>Style</Label>
                                <Select
                                    value={options.cornersDotOptions?.type || 'square'}
                                    onValueChange={(value: 'square' | 'dot') =>
                                        updateCornersDotOptions({ type: value })
                                    }
                                >
                                    <SelectTrigger className='bg-background'>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="square">Square</SelectItem>
                                        <SelectItem value="dot">Dot</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="color"
                                        value={options.cornersDotOptions?.color || '#000000'}
                                        onChange={(e) => updateCornersDotColor(e.target.value)}
                                        className="w-14 h-10 p-1 border rounded bg-background"
                                    />
                                    <Input
                                        value={options.cornersDotOptions?.color || '#000000'}
                                        onChange={(e) => updateCornersDotColor(e.target.value)}
                                        className="flex-1 bg-background h-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}