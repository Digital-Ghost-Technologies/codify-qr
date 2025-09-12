'use client';

import { EmailData, PhoneData, TextData, UrlData } from "@/types/qr";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export function UrlForm({ urlData, onChange }: { urlData: UrlData; onChange: (partial: Partial<UrlData>) => void }) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
                id="url"
                type="url"
                placeholder="https://www.example.com"
                value={urlData.url}
                onChange={(e) => onChange({ url: e.target.value })} />
        </div>
    );
}

export function TextForm({ textData, onChange }: { textData: TextData; onChange: (partial: Partial<TextData>) => void }) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="text">Text Content</Label>
            <Textarea
                id="text"
                placeholder="Enter your text here..."
                value={textData.text}
                onChange={(e) => onChange({ text: e.target.value })}
                rows={4}
            />
        </div>
    );
}

export function EmailForm({ emailData, onChange }: { emailData: EmailData; onChange: (partial: Partial<EmailData>) => void }) {
    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="contact@example.com"
                    value={emailData.email}
                    required
                    onChange={(e) => onChange({ email: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="subject">Subject (Optional)</Label>
                <Input
                    id="subject"
                    placeholder="Email subject"
                    value={emailData.subject ?? ""}
                    onChange={(e) => onChange({ subject: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label htmlFor="body">Body (Optional)</Label>
                <Textarea
                    id="body"
                    placeholder="Email message body..."
                    value={emailData.body ?? ""}
                    onChange={(e) => onChange({ body: e.target.value })}
                    rows={3}
                />
            </div>
        </div>
    );
}

export function PhoneForm({ phoneData, onChange }: { phoneData: PhoneData; onChange: (partial: Partial<PhoneData>) => void }) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
                id="phoneNumber"
                type="tel"
                placeholder="555-123-4567"
                value={phoneData.phoneNumber}
                onChange={(e) => onChange({ phoneNumber: e.target.value })}
            />
        </div>
    );
}