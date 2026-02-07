export interface FileUploadResponse {
  file_id: string;
  filename: string;
  file_type: 'pdf' | 'docx';
  text_preview: string;
  char_count: number;
}

export interface DiffBlock {
  type: 'inserted' | 'deleted' | 'unchanged' | 'modified';
  left_content: string | null;
  right_content: string | null;
  left_start: number;
  left_end: number;
  right_start: number;
  right_end: number;
}

export interface ComparisonResult {
  similarity_score: number;
  total_changes: number;
  additions: number;
  deletions: number;
  modifications: number;
  diff_blocks: DiffBlock[];
  left_text: string;
  right_text: string;
  processing_time_ms: number;
}

export interface ComparisonState {
  leftFile: FileUploadResponse | null;
  rightFile: FileUploadResponse | null;
  result: ComparisonResult | null;
  loading: boolean;
  error: string | null;
}
