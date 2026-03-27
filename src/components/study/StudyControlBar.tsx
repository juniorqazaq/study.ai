const IcoChevronLeft = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
const IcoChevronRight = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoRotate = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.26"/></svg>;

interface StudyControlBarProps {
    current: number;
    total: number;
    onPrevious: () => void;
    onNext: () => void;
    onReset?: () => void;
    className?: string;
}

export function StudyControlBar({ current, total, onPrevious, onNext, onReset, className = '' }: StudyControlBarProps) {
    const progress = (current / total) * 100;

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {/* Progress Bar */}
            <div className="h-1 bg-white/10 rounded-full overflow-hidden w-full max-w-md mx-auto">
                <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex items-center justify-center gap-6">
                <button
                    onClick={onPrevious}
                    disabled={current === 1}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <IcoChevronLeft />
                </button>

                <div className="font-mono text-lg font-medium text-white min-w-[3ch] text-center">
                    {current} / {total}
                </div>

                <button
                    onClick={onNext}
                    disabled={current === total}
                    className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <IcoChevronRight />
                </button>

                {onReset && (
                    <button
                        onClick={onReset}
                        className="ml-4 p-3 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                        title="Reset"
                    >
                        <IcoRotate />
                    </button>
                )}
            </div>
        </div>
    );
}
