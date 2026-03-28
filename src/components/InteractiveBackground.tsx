export function InteractiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 dot-grid-bg" />
    </div>
  );
}
