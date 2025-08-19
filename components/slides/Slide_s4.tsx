import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Slide() {
  const markdown = `**Reframe the job-to-be-done**
- Nights drop to 5–10°C; wind makes patios unusable
- Goal: unlock 2–3 extra outdoor hours with safe, branded comfort
- Buyer: resort ops/events/oil camps; care about RevPAR, CSAT, safety
**Quantify ROI in minutes**
- Example: 120 seats, +2 hours, $35 cover, +15% occupancy
- Estimate: +$8.4k/night capacity; payback in days, not months
- Co-build assumptions with the buyer; document baselines
**Design a risk-free offer**
- Bundle: heaters + fuel/electrical plan + safety training + maintenance
- Risk reversal: 2-week pilot, opt-out clause, uptime SLAs
- Urgency: upcoming high-occupancy season; limited fleet
**Pilot success criteria**
- Metrics: RevPAR lift, CSAT +0.3, safety incidents = 0
- Scope: 30-seat zone, 2 weeks, exec review booked Day 14
- MAP: owners, dates, decision checkpoints
**Mini ROI calculator**
\`\`\`python
seats = 120
pilot_zone = 30
avg_cover = 35
hours_extended = 2
turn_time_min = 60
nights = 14
baseline_occ = 0.60
lift = 0.15
upfront = 9800
covers_per_seat = hours_extended * (60/turn_time_min)
rev_gain = pilot_zone * (baseline_occ + lift) * covers_per_seat * avg_cover * nights
payback_days = upfront / (rev_gain / nights)
print({"rev_gain": round(rev_gain, 0), "payback_days": round(payback_days, 1)})
\`\`\`
\`\`\`mermaid
flowchart TD
A["Discovery: outdoor seating underused at night"] --> B["Teach & Reframe: nights drop; guest comfort gap"]
B --> C["Value Hypothesis: +2 hours, +15% RevPAR"]
C --> D["Pilot Design: 30-seat zone, safety plan"]
D --> E["Execute 2 weeks: heaters + CSAT surveys"]
E --> F{"Met criteria?"}
F -->|Yes| G["Expand per MAP: 120 seats + contract"]
F -->|No| H["Adjust variables or opt-out (risk reversal)"]
\`\`\`
\`\`\`mermaid
gantt
dateFormat  YYYY-MM-DD
title Sahara Heater Pilot (14 Days)
section Prep
Baseline & Safety Review :a1, 2025-09-01, 2d
Install & Training :a2, after a1, 1d
section Run
Pilot Live (capture RevPAR/CSAT) :b1, after a2, 9d
section Wrap
Analysis & ROI Model :c1, after b1, 1d
Executive Review & Decision :c2, after c1, 1d
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
      <h1>Sahara Heaters: Reframing Context, Quantifying ROI, and Designing a Pilot</h1>
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