import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../../components/Mermaid';

export default function Slide() {
  const markdown = `- Draft a 30-second value hypothesis for a real deal or an "impossible" scenario (Sahara heaters, slug control, ketchup popsicle PR)
- Quantify one outcome and add risk reversal (pilot, guarantee, opt-out)
- Write a concrete next step with date, owner, and success metric
- Drop your draft in chat: persona, job, quantified outcome, next step
\`\`\`text
For [persona] who need to [job-to-be-done], we [unique value/differentiator] so they can [measurable outcome].
Unlike [status quo/alternative], we [proof + risk reversal].
Next step: [pilot/demo/executive brief] on [date/time], owned by [you/us]; success = [metric].
\`\`\`
\`\`\`mermaid
flowchart LR
D["Discovery insights"] --> H["30s Value Hypothesis"]
H --> P["Proof or pilot + risk reversal"]
P --> N["Ask for 1 concrete next step"]
N --> C["Calendar invite + MAP update"]
\`\`\``;
  
  return (
    <div className="slide markdown-slide">
      <h1>Micro-Exercise: Draft Your 30-Second Value Hypothesis and Next Step</h1>
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