import React from 'react';
import { motion } from 'framer-motion';
import { Percent, FileEdit, Plus, Minus } from 'lucide-react';
import type { ComparisonResult } from '../types';

export const ComparisonView: React.FC<{ result: ComparisonResult }> = ({ result }) => {
  const { similarity_score, total_changes, additions, deletions, diff_blocks, processing_time_ms } = result;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={<Percent size={18} />} label="Similaridade" value={`${similarity_score.toFixed(1)}%`} />
        <Stat icon={<FileEdit size={18} />} label="Alterações" value={total_changes} />
        <Stat icon={<Plus size={18} />} label="Adições" value={additions} />
        <Stat icon={<Minus size={18} />} label="Remoções" value={deletions} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Panel title="Versão Original" headerClass="bg-blue-600">
          <div className="font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {diff_blocks.map((b, i) =>
              b.left_content ? (
                <span
                  key={`l-${i}`}
                  className={
                    b.type === 'deleted' || b.type === 'modified'
                      ? 'bg-red-100 text-red-800 line-through decoration-red-600 decoration-2 px-1 rounded'
                      : ''
                  }
                >
                  {b.left_content}
                </span>
              ) : null
            )}
          </div>
        </Panel>

        <Panel title="Versão Revisada" headerClass="bg-emerald-600">
          <div className="font-mono text-sm whitespace-pre-wrap leading-relaxed">
            {diff_blocks.map((b, i) =>
              b.right_content ? (
                <span
                  key={`r-${i}`}
                  className={
                    b.type === 'inserted' || b.type === 'modified'
                      ? 'bg-green-100 text-green-800 px-1 rounded border-b-2 border-green-600'
                      : ''
                  }
                >
                  {b.right_content}
                </span>
              ) : null
            )}
          </div>
        </Panel>
      </div>

      <div className="text-center text-sm text-gray-500">Processado em {processing_time_ms}ms</div>
    </div>
  );
};

const Panel: React.FC<{ title: string; headerClass: string; children: React.ReactNode }> = ({
  title,
  headerClass,
  children,
}) => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
    <div className={`${headerClass} px-6 py-4`}>
      <h3 className="text-white font-semibold">{title}</h3>
    </div>
    <div className="p-6 max-h-[600px] overflow-y-auto">{children}</div>
  </div>
);

const Stat: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({
  icon,
  label,
  value,
}) => (
  <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
    <div className="w-9 h-9 rounded-lg bg-gray-900 text-white flex items-center justify-center mb-3">{icon}</div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </motion.div>
);
