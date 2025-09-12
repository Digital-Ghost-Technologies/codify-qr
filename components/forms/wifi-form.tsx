'use client';

import { WifiData } from "@/types/qr";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";

interface WifiFormProps {
    wifiData: WifiData;
    onChange: (partial: Partial<WifiData>) => void;
}

export function WifiForm({ wifiData, onChange }: WifiFormProps) {
    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-3">
                <Label htmlFor="ssid">Network Name (SSID)</Label>
                <Input
                    id="ssid"
                    placeholder="My WiFi Network"
                    value={wifiData.ssid}
                    onChange={(e) => onChange({ ssid: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="WiFi password"
                    value={wifiData.password}
                    onChange={(e) => onChange({ password: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="encryption">Security Type</Label>
                <Select
                    value={wifiData.encryption}
                    onValueChange={(value: 'WPA' | 'WEP' | 'nopass') => onChange({ encryption: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select security type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="WPA">WPA/WPA2</SelectItem>
                        <SelectItem value="WEP">WEP</SelectItem>
                        <SelectItem value="nopass">Open (No Password)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-3">
                <Label htmlFor="hidden">Hidden Network</Label>
                <Switch
                    id="hidden"
                    checked={wifiData.hidden}
                    onCheckedChange={(checked) => onChange({ hidden: checked })}
                />
            </div>
        </div>
    );
}