import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `**What we're actually selling**
- Not a snack: a PR and proof asset that dramatizes stain resistance
- Buyer: brand/PR managers in cleaning or stain-proof apparel
- Job-to-be-done: generate buzz and credible proof on camera
- Value: earned media, engagement lift, and trust via a bold "white-glove test"

**Demo: offer design in 60 seconds**
- Activation kit: co-brandable popsicles, staging, signage, cleanup protocol
- Proof package: before/after content capture, testimonials, usage rights
- Options: good/better/best bundles with content licensing and influencer add-ons
- Risk reversal: single-event pilot, opt-out clause, insurance, safety checklist

**Metrics that make it real**
- Success criteria: UGC count, dwell time, press mentions, branded search lift
- Baselines and targets: agree upfront; dashboard shared live
- Timeline & urgency: align to event calendar; limited activation slots
- MAP: owners, dates, legal review, go/no-go gates

**Micro talk track**
\`\`\`text
You’re not buying a popsicle. You’re buying the most watchable way to prove your product works.
We host a 30-minute activation, capture before/after, and deliver licensed clips within 48 hours.
If we miss the agreed UGC and press targets, you pay only hard costs—no fee.
Shall we pilot this at your next launch event and co-author the metrics today?
\`\`\`

\`\`\`mermaid
flowchart TD
A["Perceived Liability: 'ketchup popsicle' + 'white gloves'"] --> B["Reframe Job: 'ultimate stain stress test'"]
B --> C["Buyer: PR/Brand Manager (cleaning, stain-proof apparel)"]
C --> D["Discovery: outcomes = buzz, proof; risks = mess, brand safety"]
D --> E["Offer Design: activation kit + metrics + risk reversal"]
E --> F["Pilot Event: 1 activation with success criteria"]
F --> G["Capture Proof: UGC, press, before/after"]
G --> H["Commercial Close: bundle + options + MAP"]
H --> I["Scale: franchise the stunt, license assets"]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Ketchup Popsicles and White Gloves: Turning a Liability into a PR and Proof Asset</h1>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code({node, inline, className, children, ...props}: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            // Handle inline code
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            
            // Handle mermaid diagrams
            if (language === 'mermaid') {
              return (
                <Mermaid chart={String(children).replace(/\n$/, '')} />
              );
            }
            
            // Handle code blocks with syntax highlighting
            if (language) {
              return (
                <SyntaxHighlighter
                  language={language}
                  style={atomDark}
                  showLineNumbers={true}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              );
            }
            
            // Default code block without highlighting
            return (
              <pre>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}