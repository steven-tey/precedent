import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

export default function Card({
  title,
  description,
  demo,
  large,
  isFirstCard, // Flag to identify if it's the first card
}: {
  title: string;
  description: string;
  demo: ReactNode;
  large?: boolean;
  isFirstCard?: boolean; // Optional prop
}) {
  // Classes for the text container depending on if it's the first card or not
  const textContainerClass = isFirstCard
    ? "absolute inset-0 flex flex-col items-center justify-center p-4 bg-black bg-opacity-80 text-white z-10"
    : "mx-auto max-w-md p-4 text-center";

  // Classes for title depending on if it's the first card or not
  const titleClass = isFirstCard
    ? "text-xl font-bold text-white md:text-3xl"
    : "font-display text-xl font-bold bg-gradient-to-br from-black to-stone-500 bg-clip-text text-transparent md:text-3xl";

  // Classes for description depending on if it's the first card or not
  const descriptionClass = isFirstCard
    ? "mt-2 text-white prose-sm [text-wrap:balance] md:prose"
    : "prose-sm mt-3 text-gray-500 [text-wrap:balance] md:prose";

  return (
    <div className={`relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 shadow-md ${large ? "md:col-span-2" : ""}`}>
      {/* Render the demo (image or other content) */}
      <div className={`${isFirstCard ? "absolute inset-0 z-0" : "flex h-60 items-center justify-center"}`}>
        {demo}
      </div>

      {/* Text content, conditionally using absolute positioning for the first card */}
      <div className={textContainerClass}>
        <h2 className={titleClass}>
          {title}
        </h2>
        <div className={`mt-2 prose-sm [text-wrap:balance] md:prose ${isFirstCard ? "text-white" : ""}`}
     style={isFirstCard ? { color: 'white' } : undefined}>
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                  className={`font-medium underline transition-colors ${isFirstCard ? "hover:text-gray-300" : "text-gray-800"}`}
                />
              ),
              code: ({ node, ...props }) => (
                <code
                  {...props}
                  // @ts-ignore
                  inline={true.toString()}
                  className={`rounded-sm px-1 py-0.5 font-mono font-medium ${isFirstCard ? "text-white" : "bg-gray-100 text-gray-800"}`}
                />
              ),
            }}
          >
            {description}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
