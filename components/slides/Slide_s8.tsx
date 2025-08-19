import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Slide() {
  const markdown = `- **Price to outcomes, not features**: anchor high with 3 tiers; quantify ROI and TCO; trade concessions for commitments
- **Guarantees + risk reversal**: pilots with success criteria, opt-outs, SLAs/warranties; performance-based fees where feasible
- **Social proof that matches the job**: peer logos, role-specific case studies, reference calls, quantified ROI snapshots
- **Frictionless packaging**: bundles, bonuses, compliance/InfoSec packet ready; procurement-friendly terms and clear renewal
- **Apply to the “impossible”**: Sahara heaters—2-week pilot + uptime SLA; Slug “salt”—eco guarantee + plot demo; Ketchup popsicle—PR metrics guarantee + cleanup protocol
\`\`\`mermaid
flowchart TD
D["Discovery"] --> Q["Quantify outcomes"] --> P["Price options: anchor high"] --> R["Risk reversal: pilot, SLA, opt-out"] --> S["Social proof: logos, ROI, refs"] --> C["Commitment: MAP and close"]
\`\`\`
\`\`\`json
{
  "tiers": [
    {"name": "Best", "price": "$X", "includes": ["full bundle", "priority SLA 99.9%", "pilot credit"]},
    {"name": "Better", "price": "$Y", "includes": ["core bundle", "standard SLA"]},
    {"name": "Good", "price": "$Z", "includes": ["starter", "no pilot credit"]}
  ],
  "guarantee": "If pilot success metrics aren't met, cancel with no fee.",
  "riskReversal": ["opt-out clause", "return/rollback plan", "performance holdback"],
  "proof": ["Sahara resort: +15% RevPAR", "logo wall", "reference calls"]
}
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
      <h1>Offer Architecture: Pricing, Guarantees, Risk Reversal, and Social Proof</h1>
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