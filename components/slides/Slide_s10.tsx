import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Five moves to apply today**
- **Define** a tight ICP slice + JTBD; write a 1-sentence value hypothesis (Sahara nights, slug-safe gardens, white-glove PR demo)
- **Upgrade discovery**: prep 6 SPIN/Challenger questions; end every call with a calendar invite
- **Redesign your offer**: good/better/best tiers + risk reversal (pilot, guarantee) + clear outcomes
- **Prove fast**: 2-week pilot with success criteria; capture logos, ROI, and references
- **Control the process**: build a Mutual Action Plan; map stakeholders, dates, and procurement
\`\`\`mermaid
flowchart LR
Start["Today"] --> D["Discovery upgrade"]
D --> O["Offer design: tiers + risk reversal"]
O --> P["Proof fast: pilot + social proof"]
P --> M["Mutual Action Plan"]
M --> W["Win + handoff"]
\`\`\`
\`\`\`yaml
RecapEmail:
  Subject: Recap & next step
  Goals: [Outcome1, Outcome2]
  AgreedMetrics: {Baseline: X, Target: Y, Date: YYYY-MM-DD}
  NextMeeting: {Date: YYYY-MM-DD, Time: HH:MM, Agenda: [Review pilot plan, Confirm stakeholders]}
  Owners: {Seller: Name, Champion: Name}
MAP:
  Milestones:
    - Discover: Stakeholders mapped, criteria documented
    - Prove: Pilot start, mid-check, success review
    - Decide: Economic buyer meeting, commercial terms
    - Procure: Security review, legal, PO
  Risks: [No-decision, Access to power]
  Mitigations: [Executive brief, Risk reversal]
Resources:
  Toolkit:
    - DiscoveryQuestionSet: /toolkit/discovery.pdf
    - ROIModel: /toolkit/roi.xlsx
    - MAPTemplate: /toolkit/map.docx
  Reading:
    - Influence (Cialdini)
    - SPIN Selling (Rackham)
    - The Challenger Sale (Dixon & Adamson)
    - Competing Against Luck (Christensen)
    - Play Bigger (Ramadan et al.)
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Actionable Next Steps: Five Moves to Apply Today and Resources</h1>
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