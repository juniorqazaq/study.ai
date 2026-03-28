export function InteractiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-[#101010]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02),transparent_24%)]" />
    </div>
  );
}
