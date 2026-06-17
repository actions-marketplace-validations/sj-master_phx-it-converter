import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(330 100% 65% / 0.07) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <main className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2"
              style={{ textShadow: '0 0 20px hsl(330 100% 65% / 0.3)' }}>
              Privacy Policy
            </h1>
            <p className="text-sm text-foreground/50">Last updated: June 17, 2026</p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Our Commitment to Privacy</h2>
              <p>
                At PHX-IT Converter, we take your privacy seriously. This Privacy Policy explains how we handle information when you use our free image conversion tool. Our core principle is simple: <strong>your images never leave your device.</strong>
              </p>
              <p>
                PHX-IT Converter is operated by PHX-IT Phoenix, a software and automation project by Skyler Jones.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
              
              <h3 className="text-base font-semibold text-foreground/90 mt-4">2.1 Images You Convert</h3>
              <p>
                <strong>We do NOT collect, store, transmit, or have access to the images you upload or convert.</strong> All image processing occurs entirely within your web browser using client-side JavaScript and HTML5 Canvas APIs. Your images are never sent to any server — they remain on your device at all times.
              </p>

              <h3 className="text-base font-semibold text-foreground/90 mt-4">2.2 Automatically Collected Information</h3>
              <p>
                Like most websites, our hosting infrastructure may collect standard, non-personally-identifiable technical data such as:
              </p>
              <ul>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URL</li>
                <li>Pages visited and time spent</li>
                <li>Anonymized IP address</li>
              </ul>
              <p>
                This information is used solely for analyzing site traffic and improving the Service. It cannot be used to identify individual users or access their images.
              </p>

              <h3 className="text-base font-semibold text-foreground/90 mt-4">2.3 Cookies</h3>
              <p>
                PHX-IT Converter does not use cookies for tracking or advertising. We may use essential technical cookies required for the platform infrastructure to function properly (such as load balancing). We do not use any third-party tracking cookies or analytics cookies that identify individual users.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Information</h2>
              <p>
                Since we do not collect personal data or images, there is minimal information to use. Any technical data collected by our hosting infrastructure is used only for:
              </p>
              <ul>
                <li>Ensuring the Service operates correctly</li>
                <li>Analyzing aggregate traffic patterns to improve performance</li>
                <li>Diagnosing technical issues</li>
                <li>Preventing abuse and securing the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Storage &amp; Security</h2>
              <p>
                Since image processing is entirely client-side, <strong>we store zero user images or files on our servers.</strong> There is no user database, no image repository, and no file storage associated with the PHX-IT Converter tool.
              </p>
              <p>
                Any converted files you download are saved directly to your device. We have no access to these files at any point in the process.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Third-Party Services</h2>
              
              <h3 className="text-base font-semibold text-foreground/90 mt-4">5.1 Hosting Platform</h3>
              <p>
                PHX-IT Converter is hosted on the Base44 platform, which provides the underlying web hosting infrastructure. Base44 may collect standard server logs as part of their hosting service. You can review Base44's privacy practices at their website.
              </p>

              <h3 className="text-base font-semibold text-foreground/90 mt-4">5.2 Buy Me a Coffee</h3>
              <p>
                Our website contains a link to Buy Me a Coffee (buymeacoffee.com), a third-party platform for voluntary donations. If you choose to visit Buy Me a Coffee, their privacy policy and terms apply to your interaction with their service. We do not share any data with them.
              </p>

              <h3 className="text-base font-semibold text-foreground/90 mt-4">5.3 No Advertising Networks</h3>
              <p>
                PHX-IT Converter does not use any advertising networks, ad trackers, or marketing pixels. We do not monetize through ads or sell user data to advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Children's Privacy</h2>
              <p>
                PHX-IT Converter is a general-audience tool. We do not knowingly collect personal information from children under 13. Since we do not collect any personal information from any users, this tool is safe for all ages.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Your Rights</h2>
              <p>
                Depending on your jurisdiction, you may have rights regarding your personal data, including:
              </p>
              <ul>
                <li><strong>Right to Access</strong> — Request information about data we hold about you.</li>
                <li><strong>Right to Erasure</strong> — Request deletion of your personal data.</li>
                <li><strong>Right to Object</strong> — Object to processing of your personal data.</li>
              </ul>
              <p>
                Since we do not collect personal data (including images, email addresses, or user accounts), there is typically no data to access or erase. If you have any concerns, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. International Data Transfers</h2>
              <p>
                PHX-IT Converter and its hosting infrastructure may be located in the United States. Since we do not collect or store personal data or images, no international data transfers of user content occur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. CCPA Compliance (California Residents)</h2>
              <p>
                Under the California Consumer Privacy Act (CCPA), California residents have the right to know what personal information is collected, request deletion, and opt out of the sale of personal information. Since PHX-IT Converter:
              </p>
              <ul>
                <li>Does not collect personal information</li>
                <li>Does not create user accounts</li>
                <li>Does not sell any data</li>
                <li>Processes all images client-side</li>
              </ul>
              <p>
                There is no personal information to disclose, delete, or opt out of selling.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. GDPR Compliance (EU/EEA Residents)</h2>
              <p>
                Under the General Data Protection Regulation (GDPR), EU/EEA residents have enhanced data protection rights. PHX-IT Converter's client-side architecture means:
              </p>
              <ul>
                <li>No personal data is collected or processed by us.</li>
                <li>No user profiles or accounts are created.</li>
                <li>Image processing occurs entirely on your device.</li>
                <li>No data is transferred to our servers for processing.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be indicated by updating the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">12. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact:
              </p>
              <p>
                <strong>PHX-IT Phoenix</strong><br />
                Software &amp; Automation by Skyler Jones<br />
                <a href="https://buymeacoffee.com/sj.master" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  buymeacoffee.com/sj.master
                </a>
              </p>
            </section>
          </div>

          <div className="pt-8 border-t border-primary/10">
            <a href="/" className="text-sm text-primary/60 hover:text-primary transition-colors">
              &larr; Back to PHX-IT Converter
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}