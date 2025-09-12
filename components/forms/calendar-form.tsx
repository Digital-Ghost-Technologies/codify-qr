'use client';

import { CalendarData } from "@/types/qr";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

interface CalendarFormProps {
    calendarData: CalendarData;
    onChange: (partial: Partial<CalendarData>) => void;
}

export function CalendarForm({ calendarData, onChange }: CalendarFormProps) {
    return (
        <div className="space-y-5">
            <div className="flex flex-col gap-3">
                <Label htmlFor="title">Event Title</Label>
                <Input
                    id="title"
                    placeholder="Meeting with Team"
                    value={calendarData.title}
                    onChange={(e) => onChange({ title: e.target.value })}
                />
            </div>

            <div className="flex items-center gap-3">
                <Label htmlFor="allDay">All Day Event</Label>
                <Switch
                    id="allDay"
                    checked={calendarData.allDay ?? false}
                    onCheckedChange={(checked) => onChange({ allDay: checked })}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                        id="startDate"
                        type="date"
                        value={calendarData.startDate}
                        onChange={(e) => onChange({ startDate: e.target.value })}
                    />
                </div>

                {!calendarData.allDay && (
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                            id="startTime"
                            type="time"
                            value={calendarData.startTime ?? ""}
                            onChange={(e) => onChange({ startTime: e.target.value })}
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                    <Label htmlFor="endDate">End Date (Optional)</Label>
                    <Input
                        id="endDate"
                        type="date"
                        value={calendarData.endDate ?? ""}
                        onChange={(e) => onChange({ endDate: e.target.value })}
                    />
                </div>

                {!calendarData.allDay && (
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="endTime">End Time (Optional)</Label>
                        <Input
                            id="endTime"
                            type="time"
                            value={calendarData.endTime ?? ""}
                            onChange={(e) => onChange({ endTime: e.target.value })}
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                    id="location"
                    placeholder="Conference Room A"
                    value={calendarData.location ?? ""}
                    onChange={(e) => onChange({ location: e.target.value })}
                />
            </div>

            <div className="flex flex-col gap-3">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                    id="description"
                    placeholder="Meeting agenda and details..."
                    value={calendarData.description ?? ""}
                    onChange={(e) => onChange({ description: e.target.value })}
                    rows={3}
                />
            </div>
        </div>
    );
}