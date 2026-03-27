import { useNavigate } from 'react-router-dom';
const IcoChevronLeft = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoX = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

interface StudyHeaderProps {
    title: string;
    progress?: string;
    onBack?: () => void;
    className?: string;
}

export function StudyHeader({ title, progress, onBack, className = '' }: StudyHeaderProps) {
    const navigate = useNavigate();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={`sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between ${className}`}>
            <div className="flex items-center gap-4">
                <button
                    onClick={handleBack}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                >
                    <IcoChevronLeft />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-white leading-tight">{title}</h1>
                    {progress && <p className="text-sm text-gray-400">{progress}</p>}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Utility buttons can go here if needed, or close button */}
                <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    title="Exit Study Mode"
                >
                    <IcoX />
                </button>
            </div>
        </div>
    );
}
