'use client';

import { ContactData } from "@/types/qr";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface ContactFormProps {
    contactData: ContactData;
    onChange: (partial: Partial<ContactData>) => void;
}

export function ContactForm({ contactData, onChange }: ContactFormProps) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                        id="firstName"
                        placeholder="John"
                        value={contactData.firstName}
                        onChange={(e) => onChange({ firstName: e.target.value })}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                        id="lastName"
                        placeholder="Doe"
                        value={contactData.lastName}
                        onChange={(e) => onChange({ lastName: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="organization">Organization (Optional)</Label>
                <Input
                    id="organization"
                    placeholder="Company Name"
                    value={contactData.organization ?? ""}
                    onChange={(e) => onChange({ organization: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="title">Job Title (Optional)</Label>
                <Input
                    id="title"
                    placeholder="Software Engineer"
                    value={contactData.title ?? ""}
                    onChange={(e) => onChange({ title: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="contactPhone">Phone (Optional)</Label>
                <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+1-555-123-4567"
                    value={contactData.phone ?? ""}
                    onChange={(e) => onChange({ phone: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="contactEmail">Email (Optional)</Label>
                <Input
                    id="contactEmail"
                    type="email"
                    placeholder="john@example.com"
                    value={contactData.email ?? ""}
                    onChange={(e) => onChange({ email: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                    id="website"
                    type="url"
                    placeholder="https://johndoe.com"
                    value={contactData.website ?? ""}
                    onChange={(e) => onChange({ website: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="address">Address (Optional)</Label>
                <Textarea
                    id="address"
                    placeholder="123 Main St, City, State 12345"
                    value={contactData.address ?? ""}
                    onChange={(e) => onChange({ address: e.target.value })}
                    rows={3}
                />
            </div>
        </div>
    );
}