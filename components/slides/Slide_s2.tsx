import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Fit over force:** Define a narrow buyer, the job they want done, and the exact context where your solution wins
- **JTBD checklist:** Functional + Emotional + Social jobs; plus anxieties, habits, and situational triggers
- **Offer design formula:** Product + Proof + Price + Terms + Risk reversal + Urgency + Bonus; reduce perceived risk before price
- **Reframe the “impossible”:** Salt→sell deterrent to gardeners; Sahara heaters→night/cold use cases; Ketchup popsicle→white-glove PR/demo prop
- **Proof > claims:** Pilots with success criteria, ROI math, reference calls; close with a Mutual Action Plan
\`\`\`mermaid
flowchart LR
A["Discovery"] --> B["Define JTBD"]
B --> C["Value hypothesis"]
C --> D["Offer design"]
D --> E["Proof & risk reversal"]
E --> F["Mutual Action Plan"]
F --> G["Decision & win"]
\`\`\`
\`\`\`yaml
# Value hypothesis + offer sketch
buyer: "Sahara resort GM"
job_to_be_done:
  functional: "Extend outdoor dining hours despite cold nights"
  emotional: "Confidence guests stay comfortable and happy"
  social: "Maintain luxury brand standards outdoors"
assumptions:
  - "Night temps drop to 8–10°C; patio empties early"
impact: 
  revenue_gain: "+$8.4k per night with +2 hours seating"
offer:
  bundle: ["heaters", "safety training", "fuel logistics", "aesthetic-matched units"]
  risk_reversal: "2-week pilot with opt-out and uptime SLA"
  urgency: "High-occupancy season; limited fleet availability"
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Fit Over Force: Jobs-To-Be-Done and Offer Design Basics</h1>
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