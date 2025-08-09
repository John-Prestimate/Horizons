import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, ChevronsRight, HelpCircle } from 'lucide-react';

const IFRAME_EXAMPLE = `<iframe src="https://www.prestimate.io/Mapview/index.html?customer=CUSTOMER_ID_HERE" width="100%" height="600" style="border:none;border-radius:12px;"></iframe>`;
const SCRIPT_EXAMPLE = `<script src="https://www.prestimate.io/widget.js" data-customer="CUSTOMER_ID_HERE"></script>`;

const CodeBlock = ({ code }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'Copied to clipboard!',
      description: 'The embed code has been copied.',
    });
  };

  return (
    <div className="relative bg-gray-800 text-white p-4 rounded-lg my-4">
      <pre className="whitespace-pre-wrap break-all text-sm">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-gray-400 hover:text-white"
        onClick={handleCopy}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

const sections = [
  {
    id: 'general',
    title: 'General Instructions',
    content: (
      <>
        <p>Embedding the Prestimate tool is simple. First, you need your unique <strong>Customer ID</strong>. You'll replace <code>CUSTOMER_ID_HERE</code> in the code snippets with your ID.</p>
        <p className="mt-4">Choose one of the two embed methods below. The <strong>Floating Button</strong> is recommended for most users as it's less intrusive.</p>
        <h4 className="font-bold mt-4">Floating Button (Script)</h4>
        <p>This adds a button to the bottom-right of your site that opens the tool in a popup.</p>
        <CodeBlock code={SCRIPT_EXAMPLE} />
        <h4 className="font-bold mt-4">Direct Embed (Iframe)</h4>
        <p>This displays the tool directly within your page content, like an embedded video.</p>
        <CodeBlock code={IFRAME_EXAMPLE} />
      </>
    )
  },
  {
    id: 'wordpress',
    title: 'WordPress',
    content: (
      <>
        <p>WordPress offers several editors. Find yours below:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li><strong>Elementor:</strong> Drag the `HTML` widget onto your page and paste your chosen embed code into it.</li>
          <li><strong>Gutenberg (Block Editor):</strong> Add a `Custom HTML` block to your page and paste the code inside.</li>
          <li><strong>Classic Editor:</strong> Switch to the "Text" tab (instead of "Visual") and paste the code where you want it to appear.</li>
        </ul>
      </>
    )
  },
  {
    id: 'wix',
    title: 'Wix',
    content: <p>In the Wix editor, click the `+` (Add Elements) button, go to `Embed Code`, and choose `Embed HTML`. Paste your code snippet into the text box.</p>
  },
  {
    id: 'squarespace',
    title: 'Squarespace',
    content: <p>On your Squarespace page, add a new block and select `Code Block` (or `Embed` on some versions). Make sure it's set to `HTML` mode and paste your code.</p>
  },
  {
    id: 'shopify',
    title: 'Shopify',
    content: <p>You can add the tool to a specific page or your theme. Go to the page in your Shopify Admin, click the `&lt;&gt;` (Show HTML) button in the content editor, and paste the code. The `iframe` method is generally more reliable here.</p>
  },
  {
    id: 'webflow',
    title: 'Webflow',
    content: <p>From the `Add Elements` panel (`+`), drag an `Embed` element onto your page. Paste your code snippet into the HTML embed code editor that appears.</p>
  },
  {
    id: 'godaddy',
    title: 'GoDaddy Website Builder',
    content: <p>Add a new section to your page and choose the `HTML` section. This will give you a dedicated area to paste your custom embed code.</p>
  },
  {
    id: 'html',
    title: 'HTML/Coding Users',
    content: <p>If you're managing your own HTML, paste the `iframe` code where you want the tool to appear in your layout. For the script method, paste it just before the closing `&lt;/body&gt;` tag for best performance.</p>
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Styling',
    content: (
      <>
        <p><strong>Widget not appearing?</strong></p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li>Double-check that you've replaced <code>CUSTOMER_ID_HERE</code> with your actual ID.</li>
          <li>Clear your website's cache (and your browser cache) to ensure you're seeing the latest version.</li>
          <li>Some website builders block scripts on free plans. You may need to upgrade or use the `iframe` method.</li>
        </ul>
        <p className="mt-4"><strong>Styling the Iframe:</strong></p>
        <p>You can adjust the `width` and `height` attributes in the `iframe` code to fit your layout. For a responsive design, setting `width="100%"` is recommended.</p>
      </>
    )
  }
];

const TableOfContents = () => (
  <div className="sticky top-24">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">On this page</h3>
    <ul className="space-y-2">
      {sections.map(section => (
        <li key={section.id}>
          <a href={`#${section.id}`} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ChevronsRight className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{section.title}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const InstructionSection = ({ id, title, children }) => (
  <motion.section 
    id={id} 
    className="mb-12 scroll-mt-24"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-200">{title}</h2>
    <div className="prose max-w-none text-gray-700">
      {children}
    </div>
  </motion.section>
);

export default function EmbedInstructionsPage() {
  return (
    <>
      <Helmet>
        <title>Embed Instructions - Prestimate</title>
        <meta name="description" content="How to embed the Prestimate measuring tool on your website. Instructions for WordPress, Wix, Squarespace, and more." />
      </Helmet>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <header className="text-center mb-16">
              <h1 className="text-5xl font-extrabold text-gray-800">Embed Prestimate on Your Site</h1>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                Follow these instructions to add the Prestimate tool to your website in minutes.
              </p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              <aside className="hidden lg:block lg:col-span-1">
                <TableOfContents />
              </aside>

              <main className="lg:col-span-3">
                {sections.map(section => (
                  <InstructionSection key={section.id} id={section.id} title={section.title}>
                    {section.content}
                  </InstructionSection>
                ))}
              </main>
            </div>

            <footer className="mt-16">
              <Card className="bg-blue-50 border-blue-200 shadow-lg">
                <CardContent className="p-8 flex items-center justify-center text-center">
                  <HelpCircle className="h-8 w-8 text-blue-600 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Need Help?</h3>
                    <p className="text-gray-600 mt-1">
                      If you have any questions, contact our support team at{' '}
                      <a href="mailto:support@prestimate.io" className="text-blue-600 font-semibold hover:underline">
                        support@prestimate.io
                      </a>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </footer>
          </motion.div>
        </div>
      </div>
    </>
  );
}