import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Codify QR",
  description: "Terms and conditions for using Codify QR, our free QR code generator service.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div className="max-w-none bg-background rounded-xl border-border p-8">
        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

        <p className="text-muted-foreground mb-8">
          Last updated: 11th September 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            By accessing and using Codify QR, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            Codify QR is a free online QR code generator that allows users to create QR codes for various purposes including URLs, text, contact information, WiFi credentials, and more.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
          <p className="mb-4">
            Permission is granted to temporarily use Codify QR for personal and commercial use. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>modify or copy the materials</li>
            <li>use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
            <li>attempt to decompile or reverse engineer any software contained on the website</li>
            <li>remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
          <p className="mb-4">
            The materials on Codify QR are provided on an 'as is' basis. Codify QR makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
          <p className="mb-4">
            In no event shall Codify QR or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Codify QR, even if Codify QR or its authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Accuracy of Materials</h2>
          <p className="mb-4">
            The materials appearing on Codify QR could include technical, typographical, or photographic errors. Codify QR does not warrant that any of the materials on its website are accurate, complete, or current.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Links</h2>
          <p className="mb-4">
            Codify QR has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Codify QR of the site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
          <p className="mb-4">
            Codify QR may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
          <p className="mb-4">
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
          </p>
        </section>
      </div>
    </div>
  );
}