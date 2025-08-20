import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- **Fit the deal by design**: Multi-thread early, co-author a Mutual Action Plan (MAP), and front-load procurement to remove risk and delay
- **Multi-threading**: Map roles (champion, economic buyer, technical, legal, finance); trade insight for access; create two champions; document decision criteria (MEDDICC)
- **MAP**: One shared plan with tasks, owners, dates, and success metrics; show pilot exit criteria and executive checkpoints; update after every touch
- **Procurement readiness**: Ship a complete packet (security, legal, compliance, insurance, pricing tiers, SLAs, DPIA/SOC2) and propose standard fallback terms to speed redlines
- **Apply to the “impossible” deals**: Sahara heaters—F&B + Ops + Safety + Finance; Slug “salt”—Facilities + Sustainability + Purchasing; Ketchup popsicle—Brand + Legal + PR
\`\`\`mermaid
flowchart TD
A[Discovery] --> B[Stakeholder Map]
B --> C["Champion + Economic buyer"]
C --> D["Mutual Action Plan"]
D --> E["Pilot/Proof"]
E --> F["Procurement (InfoSec, Legal, Finance)"]
F --> G["Paperwork (MSA, DPA, SOW)"]
G --> H[Close + Kickoff]
\`\`\`
\`\`\`yaml
# MAP mini-template
goal: Extend outdoor dining revenue by +15% in 30 days
success_metrics:
  - RevPAR_delta: ">= 15%"
  - CSAT_delta: "+0.3"
owners:
  champion: Alex Rivera (F&B Director)
  economic_buyer: Priya Shah (CFO)
  vendor: Jordan Lee (AE)
milestones:
  - name: Security review
    owner: InfoSec
    due: 2025-09-05
  - name: 2-week pilot on 30 seats
    owner: F&B Ops
    due: 2025-09-19
  - name: Executive readout
    owner: AE + Champion
    due: 2025-09-21
exit_criteria:
  - pilot_meets_targets: true
  - pricing_option_selected: "Better"
  - redlines_closed: true
next_meeting: 2025-08-28 10:00 with CFO + Champion
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Discovery-to-Close Playbook: Multi-Threading, MAPs, and Procurement Readiness</h1>
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