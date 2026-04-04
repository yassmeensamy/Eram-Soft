/**
 * Shared page-level ambient decoration layer.
 * Replaces duplicated glow/grain/dots/streak divs across About, Contact, Careers, etc.
 */

interface PageAmbientProps {
  /** CSS class prefix for scoped styling (e.g. "ab", "ct", "ca") */
  prefix: string;
  /** Show diagonal light streak (default: false) */
  streak?: boolean;
  /** Show dot grid (default: true) */
  dots?: boolean;
}

export default function PageAmbient({
  prefix,
  streak = false,
  dots = true,
}: PageAmbientProps) {
  return (
    <>
      <div className={`${prefix}-glow ${prefix}-glow--a`} aria-hidden="true" />
      <div className={`${prefix}-glow ${prefix}-glow--b`} aria-hidden="true" />
      <div className={`${prefix}-glow ${prefix}-glow--c`} aria-hidden="true" />
      {streak && <div className={`${prefix}-streak`} aria-hidden="true" />}
      <div className={`${prefix}-grain`} aria-hidden="true" />
      {dots && <div className={`${prefix}-dots`} aria-hidden="true" />}
    </>
  );
}
