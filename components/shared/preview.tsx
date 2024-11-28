import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

interface PreviewProps {
  value: string; // This should be the compiled MDX content.
}

export const Preview = ({ value }: PreviewProps) => {
  const MdxContent = useMemo(() => {
    try {
      // Try to load the MDX component if value is properly formatted
      return getMDXComponent(value);
    } catch (error) {
      console.error("Failed to load MDX content:", error);
      return null; // Fallback component or null if there's an error
    }
  }, [value]);

  return (
    <div className="preview">
      {MdxContent ? <MdxContent /> : <p>Error loading content.</p>}
    </div>
  );
};
