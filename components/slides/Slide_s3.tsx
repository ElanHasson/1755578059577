import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Slide() {
  const markdown = `- **Control the deal by sequencing frameworks:** SPIN for discovery, Challenger to reframe, MEDDICC to qualify/control, Cialdini to ethically influence, all glued by a Mutual Action Plan
- **SPIN uncovers real jobs-to-be-done:** Sahara heaters = extend profitable outdoor hours; “slug salt” = garden protection; ketchup popsicle = PR-grade stain demo
- **Challenger turns insight into action:** Teach a surprising truth, tailor ROI to their KPIs, take control with a pilot and a written MAP
- **MEDDICC prevents no-decision:** Quantify Metrics, secure Economic Buyer, lock Decision Criteria/Process, identify Pain, build a Champion, map Competition/Procurement
- **Cialdini—used ethically—reduces perceived risk:** Authority + social proof, reciprocity via tailored value, commitment with small next steps, urgency tied to real events
\`\`\`mermaid
flowchart LR
A["SPIN Discovery"] --> B["Challenger: Teach-Tailor-Take Control"]
B --> C["MEDDICC Qualification & Deal Control"]
C --> D["Cialdini Levers (Ethical)"]
D --> E["Offer Design + Risk Reversal"]
E --> F["Mutual Action Plan & Close"]
\`\`\`
\`\`\`yaml
meddicc_checklist:
  metrics: "+2 hrs/night outdoor seating -> +$8.4k/night capacity; pilot target: +15% RevPAR"
  economic_buyer: "VP Operations (owns P&L for resort properties)"
  decision_criteria: ["Guest safety certifications", "Uptime SLA", "Aesthetic fit", "ROI < 6 weeks"]
  decision_process: "Pilot -> Exec review -> Procurement -> Legal -> Launch"
  identify_pain: "Cold nights shrink patio revenue; negative reviews on comfort"
  champion: "F&B Director who benefits from higher covers"
  competition_procurement: "Event rentals; in-house heaters; procurement needs SOC2-like safety docs"
next_step_map:
  owners:
    seller: "Send recap + ROI model + pilot success criteria by EOD"
    buyer: "Book EB review; intro to Safety Officer"
  dates:
    pilot_start: "Oct 1"
    EB_review: "Oct 10"
  exit_criteria: 
    pilot_success: ["+12% RevPAR", "+0.3 CSAT outdoor", "100% uptime"]
\`\`\``;
  const mermaidRef = useRef(0);
  
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#667eea',
        primaryTextColor: '#fff',
        primaryBorderColor: '#7c3aed',
        lineColor: '#5a67d8',
        secondaryColor: '#764ba2',
        tertiaryColor: '#667eea',
        background: '#1a202c',
        mainBkg: '#2d3748',
        secondBkg: '#4a5568',
        tertiaryBkg: '#718096',
        textColor: '#fff',
        nodeTextColor: '#fff',
      }
    });
    
    // Find and render mermaid diagrams
    const renderDiagrams = async () => {
      const diagrams = document.querySelectorAll('.language-mermaid');
      for (let i = 0; i < diagrams.length; i++) {
        const element = diagrams[i];
        const graphDefinition = element.textContent;
        const id = `mermaid-${mermaidRef.current++}`;
        
        try {
          const { svg } = await mermaid.render(id, graphDefinition);
          element.innerHTML = svg;
          element.classList.remove('language-mermaid');
          element.classList.add('mermaid-rendered');
        } catch (error) {
          console.error('Mermaid rendering error:', error);
        }
      }
    };
    
    renderDiagrams();
  }, [markdown]);
  
  return (
    <div className="slide markdown-slide">
      <h1>Frameworks That Control Deals: SPIN, Challenger, MEDDICC, and Cialdini in Practice</h1>
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
                <pre className="language-mermaid">
                  <code>{String(children).replace(/\n$/, '')}</code>
                </pre>
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