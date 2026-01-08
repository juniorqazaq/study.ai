import { useState, useCallback, useEffect } from 'react';
import { Upload, FileText, Link as LinkIcon, Code } from 'lucide-react';
import { storageService, FileMetadata } from '@/shared/services/storage.service';

type UploadedFile = FileMetadata;

export function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<'files' | 'url' | 'github'>('files');
  const [files, setFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    const savedFiles = storageService.getFiles();
    setFiles(savedFiles);
  }, []);

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file, index) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const typeMap: Record<string, string> = {
        pdf: 'pdf',
        epub: 'epub',
        txt: 'txt',
        doc: 'docx',
        docx: 'docx',
        ppt: 'pptx',
        pptx: 'pptx',
      };

      return {
        id: Date.now().toString() + index,
        name: file.name,
        type: (typeMap[ext] || 'txt') as FileMetadata['type'],
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        status: 'uploading' as const,
        progress: 0,
        uploadedAt: 'Just now'
      };
    });

    setFiles(prev => [...newFiles, ...prev]);

    newFiles.forEach((newFileMetadata, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 90) {
          setFiles(prev => prev.map(f =>
            f.id === newFileMetadata.id ? { ...f, progress } : f
          ));
        } else {
          clearInterval(interval);
          const uploadedFile = {
            ...newFileMetadata,
            progress: 100,
            status: 'success' as const
          };
          storageService.saveFile(uploadedFile);
          setFiles(prev => prev.map(f =>
            f.id === newFileMetadata.id ? { ...f, progress: 100, status: 'success' } : f
          ));
        }
      }, 200 + index * 100);
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-black text-white relative overflow-hidden">
      {/* Liquid Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1, left: '20%', top: '10%' }} />
        <div className="liquid-blob liquid-blob-3" style={{ opacity: 0.1, right: '20%', bottom: '10%' }} />
      </div>

      <div className="max-w-6xl mx-auto pt-4 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 liquid-glass squircle-lg shrink-0">
              <UploadCloudIcon />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Upload Resources
            </h1>
          </div>
          <p className="text-gray-400 text-lg">Upload books, documents, or import content from URLs and GitHub repositories</p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { id: 'files', icon: Upload, label: 'Files' },
            { id: 'url', icon: LinkIcon, label: 'URL' },
            { id: 'github', icon: Code, label: 'GitHub' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center justify-center gap-3 px-8 py-5 squircle-lg font-bold transition-all duration-500 relative overflow-hidden ${activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'liquid-glass text-gray-500 hover:text-white hover:bg-white/10'
                }`}
            >
              <tab.icon className="w-6 h-6" />
              {tab.label}

            </button>
          ))}
        </div>

        {/* Upload Area */}
        <div
          className={`liquid-glass squircle-xl p-2 mb-12 transition-all duration-700 ${isDragging ? 'shadow-[0_0_50px_rgba(59,130,246,0.2)] scale-[1.01]' : ''}`}
        >
          <div
            className={`w-full h-[400px] squircle-xl flex flex-col items-center justify-center p-12 transition-all duration-700 bg-black/40 ${isDragging ? 'bg-blue-500/5' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {activeTab === 'files' && (
              <>
                <div className="w-24 h-28 bg-blue-500/10 squircle-lg flex items-center justify-center mb-8 mx-auto">
                  <Upload size={48} className="text-blue-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Drag & drop your files here</h3>
                <p className="text-gray-500 text-lg mb-10">or click to browse from your computer</p>

                <input
                  type="file"
                  multiple
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white squircle-lg font-bold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-blue-600/20 active:scale-95"
                >
                  Browse Files
                </label>

                <div className="flex flex-wrap justify-center gap-3 mt-12">
                  {['PDF', 'EPUB', 'TXT', 'DOCX', 'PPTX', 'Images'].map(ext => (
                    <span key={ext} className="px-5 py-2 liquid-glass squircle-lg text-sm text-gray-400 font-bold hover:text-white transition-colors cursor-default">
                      {ext}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-6 font-medium">Max file size: 50MB</p>
              </>
            )}
            {activeTab === 'url' && (
              <div className="w-full max-w-2xl text-center">
                <div className="w-24 h-28 bg-blue-500/10 squircle-lg flex items-center justify-center mb-8 mx-auto">
                  <LinkIcon size={48} className="text-blue-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Import from URL</h3>
                <p className="text-gray-500 mb-10">Enter any web link to import content directly</p>
                <div className="flex gap-4 relative">
                  <input
                    type="url"
                    placeholder="https://example.com/document.pdf"
                    className="w-full bg-white/5 border border-white/10 squircle-lg px-6 py-5 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-lg"
                  />
                  <button className="px-10 py-5 bg-blue-600 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg active:scale-95 whitespace-nowrap">
                    Import
                  </button>
                </div>
              </div>
            )}
            {activeTab === 'github' && (
              <div className="w-full max-w-2xl text-center">
                <div className="w-24 h-28 bg-blue-500/10 squircle-lg flex items-center justify-center mb-8 mx-auto">
                  <Code size={48} className="text-blue-500" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Import from GitHub</h3>
                <p className="text-gray-500 mb-10">Enter a repository path to import its documentation</p>
                <div className="flex gap-4 relative">
                  <input
                    type="text"
                    placeholder="username/repository"
                    className="w-full bg-white/5 border border-white/10 squircle-lg px-6 py-5 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-lg"
                  />
                  <button className="px-10 py-5 bg-blue-600 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg active:scale-95 whitespace-nowrap">
                    Connect
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Uploads */}
        {files.length > 0 && (
          <div className="liquid-glass squircle-xl p-10">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              Recent Uploads
            </h2>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 squircle-lg hover:bg-white/[0.07] transition-all duration-300 group">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 squircle-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/10 group-hover:scale-105 transition-transform">
                      <FileText size={28} />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-white mb-1">{file.name}</div>
                      <div className="text-sm font-medium text-gray-500">{file.size} • Uploaded just now</div>
                    </div>
                  </div>
                  <div>
                    {file.status === 'success' ? (
                      <span className="px-5 py-2 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                        PROCESSED
                      </span>
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                        <span className="text-blue-500 text-xs font-bold">UPLOADING</span>
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


function UploadCloudIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-upload">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  )
}
