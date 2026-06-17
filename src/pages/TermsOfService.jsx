import React from 'react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
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
              Terms of Service
            </h1>
            <p className="text-sm text-foreground/50">Last updated: June 17, 2026</p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-6 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using PHX-IT Converter ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
              </p>
              <p>
                PHX-IT Converter is a free, client-side image conversion tool provided by PHX-IT Phoenix, operated by Skyler Jones ("we," "us," or "our"). These Terms apply to all visitors and users of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
              <p>
                PHX-IT Converter is a web-based tool that converts images between various icon and image formats including ICO, PNG, JPG, WebP, BMP, and generates favicons, Apple touch icons, and Android app icons. All image processing is performed entirely within your browser using client-side technology. No images are uploaded to any server.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. User Responsibilities</h2>
              <p>By using the Service, you agree that:</p>
              <ul>
                <li>You will not use the Service for any unlawful purpose or in violation of any applicable laws.</li>
                <li>You are solely responsible for the images you convert and the resulting output files.</li>
                <li>You own or have the necessary rights to any images you process through the Service.</li>
                <li>You will not use the Service to process any content that is illegal, infringing, harmful, or violates the rights of others.</li>
                <li>You will not attempt to disrupt, overload, or interfere with the Service's operation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
              <p>
                The PHX-IT Converter software, design, user interface, branding, and underlying code are the intellectual property of PHX-IT Phoenix and Skyler Jones. All rights not expressly granted are reserved.
              </p>
              <p>
                You retain all ownership rights to the images you upload and the converted files you download. The Service does not claim any ownership over your content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Privacy &amp; Data</h2>
              <p>
                PHX-IT Converter operates entirely within your browser. Images are never uploaded to our servers. We do not collect, store, transmit, or have access to the images you convert. For full details on data handling, please refer to our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Disclaimer of Warranties</h2>
              <p>
                The Service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that:
              </p>
              <ul>
                <li>The Service will be uninterrupted, secure, or error-free.</li>
                <li>Any defects or errors will be corrected.</li>
                <li>The converted files will meet your specific requirements or expectations.</li>
              </ul>
              <p>
                We disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by applicable law, PHX-IT Phoenix, Skyler Jones, and any affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of or inability to use the Service, including but not limited to:
              </p>
              <ul>
                <li>Loss of data, images, or files.</li>
                <li>Errors or defects in converted output files.</li>
                <li>Any issues arising from the use of converted icons or images in other applications.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Third-Party Links</h2>
              <p>
                The Service may contain links to third-party websites or services (such as Buy Me a Coffee). We do not endorse and are not responsible for the content, privacy practices, or terms of any third-party sites. You access them at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. Material changes will be indicated by updating the "Last updated" date at the top of this page. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States and the State of Arizona, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Maricopa County, Arizona.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us at:
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