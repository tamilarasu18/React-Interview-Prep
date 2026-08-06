'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  language: string;
  code: string;
  className?: string;
}

export default function CodeBlock({ language, code, className = '' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers without the async clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Copy failed:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className={`not-prose rounded-lg overflow-hidden shadow-lg my-6 ${className}`}>
      {/* Header bar with language label and copy button */}
      <div className="flex items-center justify-between bg-gray-800 px-4 h-12">
        <span className="font-mono text-sm uppercase tracking-wide text-primary-300">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium text-gray-200 hover:bg-gray-700 transition-colors duration-200"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code area with syntax highlighting */}
      <div className="code-scroll max-h-96 overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            backgroundColor: '#1e1e1e',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
