import React from 'react';
import type { DiffBlock } from '../types';

export const DiffHighlighter: React.FC<{ block: DiffBlock }> = ({ block }) => {
  const content = block.left_content ?? block.right_content ?? '';
  const cls =
    block.type === 'deleted'
      ? 'bg-red-100 text-red-800 line-through'
      : block.type === 'inserted'
      ? 'bg-green-100 text-green-800'
      : block.type === 'modified'
      ? 'bg-yellow-100 text-yellow-800'
      : '';
  return <span className={`px-1 rounded ${cls}`}>{content}</span>;
};
