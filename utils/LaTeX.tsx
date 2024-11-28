import React, { ReactNode } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

interface LaTeXProps {
  children: ReactNode;
}

const LaTeX: React.FC<LaTeXProps> = ({ children }) => {
  return (
    <MathJaxContext>
      <MathJax>{children}</MathJax>
    </MathJaxContext>
  );
};

export default LaTeX;
