import { useEffect } from "react";
import hljs from "highlight.js";
import DOMPurify from "isomorphic-dompurify";

type EditorViewerProps = {
  content: string;
  className?: string;
};

const EditorViewer = ({ content, className }: EditorViewerProps) => {
  useEffect(() => {
    const regex = /<pre><code(?:\s+class="[^"]*")?>([\s\S]*?)<\/code><\/pre>/g;
    if (!content.match(regex)) return;

    document.querySelectorAll("pre code:not([data-highlighted])").forEach((ele: Element) => {
      const element = ele as HTMLElement;

      if (!element.dataset.highlighted) {
        hljs.highlightElement(element);
        element.dataset.highlighted = "true";
      }
    });
  }, [content]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content),
      }}
      className={`tiptap ${className}`}
    ></div>
  );
};

export default EditorViewer;
