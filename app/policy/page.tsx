import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - Codify QR",
    description: "Privacy policy for Codify QR, our free QR code generator service. Learn how we handle your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl">
            <div className="bg-background rounded-xl border-border p-8">
                <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

                <p className="text-muted-foreground mb-8">
                    Last updated: 11th September 2025
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Analytics: We use Google Analytics to collect anonymous usage statistics (e.g., device type, pages visited, time on site).</li>
                    </ul>
                    <h3 className="text-xl font-medium mb-2">Information We Do NOT Collect:</h3>
                    <ul className="list-disc pl-6 mb-4">
                        <li>QR code content or data you generate</li>
                        <li>Personal information</li>
                        <li>Contact details</li>
                        <li>Location data</li>
                        <li>Usage analytics or tracking data</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. How Our Service Works</h2>
                    <p className="mb-4">
                        Codify QR operates entirely in your web browser. All QR code generation happens locally on your device using client-side JavaScript. Your data never leaves your device or gets sent to our servers.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Third-Party Services</h2>
                    <p className="mb-4">
                        Our service may use third-party services for basic functionality:
                    </p>
                    <h3 className="text-xl font-medium mb-2">Map Services (for Location QR Codes):</h3>
                    <p className="mb-4">
                        When you use the location QR code feature, we use OpenStreetMap&apos;s Nominatim service for address geocoding. This service may log IP addresses and search queries according to their own privacy policy.
                    </p>
                    <h3 className="text-xl font-medium mb-2">Font Services:</h3>
                    <p className="mb-4">
                        We use Google Fonts to load web fonts. Google may collect usage data according to their privacy policy.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                    <p className="mb-4">
                        Since we don&apos;t collect or store any of your data, there is no risk of your QR code data being compromised through our service. All processing happens locally in your browser.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Cookies and Local Storage</h2>
                    <p className="mb-4">
                        We may use browser local storage to save your preferences (such as theme settings) locally on your device. This data is not transmitted to our servers and remains on your device.
                    </p>
                    <p className="mb-4">Google Analytics may set cookies to track usage. You can opt out of Google Analytics tracking by using Google’s <a className="text-primary underline" href="https://tools.google.com/dlpage/gaoptout" target="new">opt-out tool</a>.</p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. Childrens Privacy</h2>
                    <p className="mb-4">
                        Our service does not collect any personal information from anyone, including children under 13. Since we don&apos;t collect any data, there are no special considerations needed for children&apos;s privacy.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
                    <p className="mb-4">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">8. International Users</h2>
                    <p className="mb-4">
                        Since our service processes all data locally in your browser and doesn&apos;t transmit personal data to our servers, there are no international data transfer concerns.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">9. Your Rights</h2>
                    <p className="mb-4">
                        Since we don&apos;t collect or store your personal data, there is no data for you to access, update, or delete from our systems. You have complete control over your data as it never leaves your device.
                    </p>
                </section>
            </div>
        </div>
    );
}