import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitCompare } from 'lucide-react';
import { FileUploader } from './components/FileUploader';
import { ComparisonView } from './components/ComparisonView';
import { uploadFile, compareDocuments } from './services/api';
import type { FileUploadResponse, ComparisonResult } from './types';

export default function App() {
  const [leftFile, setLeftFile] = useState<FileUploadResponse | null>(null);
  const [rightFile, setRightFile] = useState<FileUploadResponse | null>(null);
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState({ upload: false, compare: false });
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (side: 'left' | 'right', file: File) => {
    setLoading((p) => ({ ...p, upload: true }));
    setError(null);
    try {
      const res = await uploadFile(file);
      if (side === 'left') setLeftFile(res);
      else setRightFile(res);
    } catch {
      setError('Erro ao fazer upload do arquivo');
    } finally {
      setLoading((p) => ({ ...p, upload: false }));
    }
  };

  const handleCompare = async () => {
    if (!leftFile || !rightFile) return;
    setLoading((p) => ({ ...p, compare: true }));
    setError(null);
    try {
      const comparison = await compareDocuments(leftFile.file_id, rightFile.file_id);
      setResult(comparison);
    } catch {
      setError('Erro ao comparar documentos');
    } finally {
      setLoading((p) => ({ ...p, compare: false }));
    }
  };

  const canCompare = !!leftFile && !!rightFile && !loading.upload;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="bg-gray-900 p-2 rounded-xl">
            <GitCompare className="text-white" size={26} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">DocCompare</h1>
            <p className="text-xs text-gray-500">Comparação de documentos (PDF/DOCX)</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Compare documentos em segundos</h2>
                <p className="text-gray-600">
                  Envie a versão original e a revisada para ver inserções (verde) e remoções (vermelho).
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FileUploader
                  side="left"
                  onUpload={(file) => handleUpload('left', file)}
                  uploadedFile={leftFile}
                  isUploading={loading.upload}
                />
                <FileUploader
                  side="right"
                  onUpload={(file) => handleUpload('right', file)}
                  uploadedFile={rightFile}
                  isUploading={loading.upload}
                />
              </div>

              {error && (
                <div className="max-w-md mx-auto p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
                  {error}
                </div>
              )}

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleCompare}
                  disabled={!canCompare || loading.compare}
                  className={[
                    'px-8 py-4 rounded-2xl font-semibold text-lg shadow-md transition',
                    canCompare
                      ? 'bg-gray-900 text-white hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed',
                  ].join(' ')}
                >
                  {loading.compare ? 'Comparando...' : 'Comparar Documentos'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Resultado da Comparação</h2>
                <button
                  onClick={() => {
                    setResult(null);
                    setLeftFile(null);
                    setRightFile(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
                >
                  Nova comparação
                </button>
              </div>
              <ComparisonView result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
