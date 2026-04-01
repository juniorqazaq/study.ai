import { useCallback, useState } from 'react';
import { Code, FileText, Link as LinkIcon, Upload } from 'lucide-react';

import { createBook, uploadBookFile } from '@/shared/api/endpoints/books.api';
import { getApiErrorMessage } from '@/shared/util/authHelpers';

type UploadRow = {
  id: string;
  name: string;
  displaySize: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
};

function newRowId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'files' | 'url' | 'github'>('files');
  const [rows, setRows] = useState<UploadRow[]>([]);

  const handleFiles = useCallback((fileList: FileList) => {
    const list = Array.from(fileList);
    list.forEach((file) => {
      const rowId = newRowId();
      const displaySize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      setRows((previous) => [
        {
          id: rowId,
          name: file.name,
          displaySize,
          progress: 0,
          status: 'uploading',
        },
        ...previous,
      ]);

      void (async () => {
        try {
          const ext = file.name.split('.').pop()?.toLowerCase() ?? 'unknown';
          const title = file.name.replace(/\.[^/.]+$/, '') || 'Untitled';
          const book = await createBook({ title, type: ext });
          await uploadBookFile(book.id, file, (pct) => {
            setRows((previous) =>
              previous.map((row) => (row.id === rowId ? { ...row, progress: pct } : row)),
            );
          });
          setRows((previous) =>
            previous.map((row) =>
              row.id === rowId ? { ...row, progress: 100, status: 'success' as const } : row,
            ),
          );
        } catch (err) {
          const message = getApiErrorMessage(err);
          setRows((previous) =>
            previous.map((row) =>
              row.id === rowId ? { ...row, status: 'error' as const, error: message } : row,
            ),
          );
        }
      })();
    });
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);

      if (event.dataTransfer.files) {
        handleFiles(event.dataTransfer.files);
      }
    },
    [handleFiles],
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className="app-shell px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="app-muted-label mb-3">Upload</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">Upload Resources</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8d8d8d] lg:text-base">
            Upload books, documents, or import content from URLs and GitHub repositories.
          </p>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {[
            { id: 'files', icon: Upload, label: 'Files' },
            { id: 'url', icon: LinkIcon, label: 'URL' },
            { id: 'github', icon: Code, label: 'GitHub' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as 'files' | 'url' | 'github')}
              className={`app-panel flex items-center justify-center gap-3 px-6 py-5 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-[#1f1f1f] text-white' : 'text-[#8d8d8d] hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="app-panel p-3">
          <div
            className={`flex min-h-[420px] flex-col items-center justify-center rounded-[22px] border border-dashed px-8 py-12 text-center transition-colors ${
              isDragging ? 'border-[#3a3a3a] bg-[#181818]' : 'border-[#2a2a2a] bg-[#121212]'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {activeTab === 'files' && (
              <>
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#2a2a2a] bg-[#1a1a1a]">
                  <Upload className="h-10 w-10 text-[#0066FF]" />
                </div>
                <h2 className="mt-8 text-3xl font-semibold tracking-tight text-white">Drag and drop your files here</h2>
                <p className="mt-3 text-base text-[#8d8d8d]">or click to browse from your computer</p>

                <input
                  type="file"
                  multiple
                  onChange={(event) => event.target.files && handleFiles(event.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="app-primary-button mt-8 cursor-pointer">
                  Browse Files
                </label>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  {['PDF', 'EPUB', 'TXT', 'DOCX', 'PPTX', 'Images'].map((ext) => (
                    <span key={ext} className="rounded-full border border-[#2a2a2a] bg-[#181818] px-4 py-2 text-sm text-[#a1a1aa]">
                      {ext}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm text-[#6b6b6b]">Max file size: 50MB</p>
              </>
            )}

            {activeTab === 'url' && (
              <div className="w-full max-w-2xl">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#2a2a2a] bg-[#1a1a1a]">
                  <LinkIcon className="h-10 w-10 text-[#0066FF]" />
                </div>
                <h2 className="mt-8 text-3xl font-semibold tracking-tight text-white">Import from URL</h2>
                <p className="mt-3 text-base text-[#8d8d8d]">Enter a web link to import its content directly.</p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <input type="url" placeholder="https://example.com/document.pdf" className="app-input flex-1" readOnly />
                  <button type="button" className="app-primary-button opacity-60" disabled>
                    Import
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'github' && (
              <div className="w-full max-w-2xl">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#2a2a2a] bg-[#1a1a1a]">
                  <Code className="h-10 w-10 text-[#0066FF]" />
                </div>
                <h2 className="mt-8 text-3xl font-semibold tracking-tight text-white">Import from GitHub</h2>
                <p className="mt-3 text-base text-[#8d8d8d]">Enter a repository path to import documentation.</p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <input type="text" placeholder="username/repository" className="app-input flex-1" readOnly />
                  <button type="button" className="app-primary-button opacity-60" disabled>
                    Connect
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {rows.length > 0 && (
          <div className="app-panel mt-8 p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[16px] border border-[#2a2a2a] bg-[#1a1a1a]">
                <FileText className="h-5 w-5 text-[#0066FF]" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Recent Uploads</h2>
            </div>

            <div className="space-y-3">
              {rows.map((file) => (
                <div key={file.id} className="rounded-[20px] border border-[#262626] bg-[#141414] p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#2a2a2a] bg-[#1a1a1a] text-[#0066FF]">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{file.name}</div>
                        <div className="mt-1 text-sm text-[#7c7c7c]">
                          {file.displaySize} • {file.status === 'success' ? 'Uploaded' : file.status === 'error' ? 'Failed' : 'Uploading'}
                        </div>
                        {file.error && <p className="mt-2 text-sm text-red-300">{file.error}</p>}
                      </div>
                    </div>

                    {file.status === 'success' ? (
                      <span className="rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#d7d7d7]">
                        Processed
                      </span>
                    ) : file.status === 'error' ? (
                      <span className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-200">
                        Error
                      </span>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="h-2 w-32 rounded-full bg-[#212121]">
                          <div className="h-full rounded-full bg-[#0066FF]" style={{ width: `${file.progress}%` }} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a9a9a]">Uploading</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
