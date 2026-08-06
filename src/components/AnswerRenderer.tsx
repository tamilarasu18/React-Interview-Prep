'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

interface AnswerRendererProps {
  answer: string;
}

// react-markdown's component overrides are loosely typed; `any` on the render
// props here is the pragmatic choice rather than restating each node type.
export default function AnswerRenderer({ answer }: AnswerRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (inline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 font-mono text-[0.9em]"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return match ? (
              <CodeBlock language={match[1]} code={codeString} />
            ) : (
              <CodeBlock language="text" code={codeString} />
            );
          },

          a({ children, href, ...props }: any) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 hover:underline font-medium"
                {...props}
              >
                {children}
              </a>
            );
          },

          p({ children, ...props }: any) {
            return (
              <p className="text-gray-700 leading-relaxed mb-4" {...props}>
                {children}
              </p>
            );
          },

          ul({ children, ...props }: any) {
            return (
              <ul className="list-disc list-outside ml-6 mb-4 space-y-2" {...props}>
                {children}
              </ul>
            );
          },

          ol({ children, ...props }: any) {
            return (
              <ol className="list-decimal list-outside ml-6 mb-4 space-y-2" {...props}>
                {children}
              </ol>
            );
          },

          li({ children, ...props }: any) {
            return (
              <li className="text-gray-700 leading-relaxed" {...props}>
                {children}
              </li>
            );
          },

          h2({ children, ...props }: any) {
            return (
              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4" {...props}>
                {children}
              </h2>
            );
          },

          h3({ children, ...props }: any) {
            return (
              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props}>
                {children}
              </h3>
            );
          },

          strong({ children, ...props }: any) {
            return (
              <strong className="font-bold text-gray-900" {...props}>
                {children}
              </strong>
            );
          },

          em({ children, ...props }: any) {
            return (
              <em className="italic text-gray-800" {...props}>
                {children}
              </em>
            );
          },

          blockquote({ children, ...props }: any) {
            return (
              <blockquote
                className="border-l-4 border-primary-400 pl-4 py-2 my-4 bg-primary-50 text-gray-700"
                {...props}
              >
                {children}
              </blockquote>
            );
          },

          hr(props: any) {
            return <hr className="my-8 border-gray-300" {...props} />;
          },

          table({ children, ...props }: any) {
            return (
              <div className="not-prose overflow-x-auto my-6 shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-300 text-sm" {...props}>
                  {children}
                </table>
              </div>
            );
          },

          thead({ children, ...props }: any) {
            return (
              <thead className="bg-primary-600" {...props}>
                {children}
              </thead>
            );
          },

          tbody({ children, ...props }: any) {
            return (
              <tbody className="bg-white divide-y divide-gray-200" {...props}>
                {children}
              </tbody>
            );
          },

          tr({ children, ...props }: any) {
            return (
              <tr className="even:bg-gray-50 hover:bg-primary-50 transition-colors" {...props}>
                {children}
              </tr>
            );
          },

          th({ children, ...props }: any) {
            return (
              <th
                className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
                {...props}
              >
                {children}
              </th>
            );
          },

          td({ children, ...props }: any) {
            return (
              <td className="px-4 sm:px-6 py-3 text-sm text-gray-900 align-top" {...props}>
                {children}
              </td>
            );
          },
        }}
      >
        {answer}
      </ReactMarkdown>
    </div>
  );
}
