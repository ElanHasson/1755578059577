import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Slide() {
  const markdown = `- **Fit over force**: Don’t sell to the slug; redefine the buyer as the gardener/facilities manager whose job is protecting beds with pet-safe, eco-safe methods
- **Reposition the product**: From “salt” commodity to an eco-safe slug deterrent system—precision mineral micro-dosing, moisture-aware application, and plant-safe barrier gel
- **Design a de-risked offer**: Pilot on 2 plots, independent proof, performance guarantee, simple tiered pricing and refills
- **Discovery talk tracks (SPIN + JTBD)**: Map current pest control, quantify damage, surface constraints (kids, pets, runoff), agree on success metrics
- **MAP to close**: 14-day pilot → review damage reduction & runoff tests → finalize bundle, training, and service terms
\`\`\`yaml
offer_blueprint:
  ICP: "Home & municipal gardeners, facilities crews; pet- and pollinator-conscious"
  JTBD:
    functional: "Reduce slug damage on seedlings by >80%"
    emotional: "Protect garden pride without harming pets/wildlife"
    social: "Be the eco-friendly neighbor/brand"
  Positioning: "Eco-safe slug deterrent system (not commodity salt)"
  Components:
    - precision_applicator: "Targets slugs, spares soil/roots"
    - moisture_sensor: "Avoids over-application; auto-prompts after rain"
    - barrier_gel: "Plant-safe perimeter, biodegradable"
  Proof:
    - before_after_plots
    - horticulture_lab_validation
    - customer_testimonials
  Risk_reversal:
    - pilot: "14 days, 2 plots, success = 70%+ damage reduction"
    - guarantee: "Refund if threshold not met"
  Pricing:
    starter_kit: 89
    refill_pack: 29
    municipal_bundle: "volume + training + seasonal service"
  MAP:
    - kickoff: "Baseline damage photos + runoff test"
    - mid_pilot: "Adjust dosage via sensor data"
    - review: "Results, ROI, scale decision"
\`\`\`
\`\`\`mermaid
flowchart TD
A["Old framing: Sell salt to a slug"] --> B["Reframe buyer: Gardener / Facilities"]
B --> C["JTBD: 'Protect seedlings; avoid harm to pets/soil'"]
C --> D["Position: Eco-safe slug deterrent system"]
D --> E["Offer design: Proof + Risk reversal + Pricing"]
E --> F["MAP: 14-day pilot → Review → Scale"]
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
      <h1>Salt to a Slug: Redefining the Buyer and Positioning an Eco-Safe Solution</h1>
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