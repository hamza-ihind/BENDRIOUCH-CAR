"use client";

import React from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import LaTeX from "@/utils/LaTeX";

interface LaTeXRendererProps {
  htmlContent: string;
}

const LaTeXRenderer: React.FC<LaTeXRendererProps> = ({ htmlContent }) => {
  // Function to convert LaTeX spans to actual math components (inline or block)
  const renderMath = (content: string) => {
    // Regex to match <span latex="..."> tags with data-type="math"
    const regex = /<span latex="(.*?)" data-type="math">(.*?)<\/span>/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(content)) !== null) {
      const [fullMatch, latex, display] = match;

      // Push any non-matching content before the match (regular HTML)
      if (match.index > lastIndex) {
        parts.push(
          <span
            key={lastIndex}
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: content.slice(lastIndex, match.index),
            }}
          />
        );
      }

      // Check if the <span> is inside a block-level element (like <div> or <p>)
      const isInsideBlockElement =
        /<\/(div|p|section|article|main|footer)>/i.test(
          content.slice(0, match.index)
        );

      // Render InlineMath or BlockMath based on whether it's inside a block element
      if (isInsideBlockElement) {
        parts.push(
          <div key={match.index} className="prose dark:prose-invert">
            <LaTeX>
              <BlockMath math={latex} />
            </LaTeX>
          </div>
        );
      } else {
        parts.push(
          <div key={match.index} className="prose dark:prose-invert">
            <LaTeX>
              <BlockMath math={latex} />
            </LaTeX>
          </div>
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Push any remaining content after the last match
    if (lastIndex < content.length) {
      parts.push(
        <span
          className="prose dark:prose-invert"
          key={lastIndex}
          dangerouslySetInnerHTML={{ __html: content.slice(lastIndex) }}
        />
      );
    }

    return parts;
  };

  const renderedContent = renderMath(htmlContent);

  return <div className="prose dark:prose-invert">{renderedContent}</div>;
};

export default LaTeXRenderer;
