import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type Side = 'left' | 'right';

interface FileUploaderProps {
  side: Side;
  onUpload: (file: File) => void;
  uploadedFile: { filename: string; char_count: number } | null;
  isUploading: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  side,
  onUpload,
  uploadedFile,
  isUploading,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) onUpload(acceptedFiles[0]);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxFiles: 1,
    disabled: isUploading,
  });

  const accent = side === 'left' ? 'text-blue-600' : 'text-emerald-600';
  const title = side === 'left' ? 'Documento Original' : 'Documento Revisado';

  return (
    <div className="w-full">
      <div className={`mb-3 flex items-center justify-between ${accent}`}>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText size={20} />
          {title}
        </h3>
        {uploadedFile && (
          <span className="text-xs bg-white px-3 py-1 rounded-full shadow-sm text-gray-600">
            {uploadedFile.char_count.toLocaleString()} caracteres
          </span>
        )}
      </div>

      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={[
            'relative rounded-2xl border-2 border-dashed p-8 cursor-pointer transition',
            isDragActive ? 'border-gray-700 bg-gray-50' : 'border-gray-300 bg-white',
            isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md',
          ].join(' ')}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3 text-center">
            <motion.div
              animate={isDragActive ? { scale: 1.08, rotate: 3 } : { scale: 1, rotate: 0 }}
              className={`p-3 rounded-full bg-gray-50 ${accent}`}
            >
              <Upload size={28} />
            </motion.div>

            <div>
              <p className="text-base font-medium text-gray-800">
                {isDragActive ? 'Solte o arquivo aqui' : 'Arraste e solte um arquivo'}
              </p>
              <p className="text-sm text-gray-500">ou clique para selecionar</p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOCX ou DOC (máx. 50MB)</p>
            </div>
          </div>

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-4 border-gray-800 border-t-transparent rounded-full"
              />
            </div>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${side === 'left' ? 'bg-blue-100' : 'bg-emerald-100'}`}>
              <FileText className={accent} size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-gray-800 truncate">{uploadedFile.filename}</div>
              <div className="mt-2 flex items-center gap-2 text-green-600">
                <CheckCircle size={16} />
                <span className="text-sm">Pronto para comparar</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
