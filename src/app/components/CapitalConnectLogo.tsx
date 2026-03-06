/**
 * Capital Connect logo — SVG recreation of the C-shaped network graph mark.
 * Usage: <CapitalConnectLogo size={40} /> or <CapitalConnectLogoFull />
 */

export function CapitalConnectLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ccGrad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#56CCF2" />
          <stop offset="100%" stopColor="#2F80ED" />
        </linearGradient>
      </defs>

      {/* Edges — lines between nodes */}
      <line x1="40" y1="8"  x2="20" y2="18" stroke="url(#ccGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="18" x2="10" y2="36" stroke="url(#ccGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="36" x2="14" y2="56" stroke="url(#ccGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="56" x2="30" y2="68" stroke="url(#ccGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="68" x2="52" y2="72" stroke="url(#ccGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="8"  x2="58" y2="14" stroke="url(#ccGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="18" x2="10" y2="36" stroke="url(#ccGrad)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="52" y1="72" x2="62" y2="58" stroke="url(#ccGrad)" strokeWidth="2.5" strokeLinecap="round" />
      {/* Inner cross-edges */}
      <line x1="20" y1="18" x2="30" y2="38" stroke="url(#ccGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="10" y1="36" x2="30" y2="38" stroke="url(#ccGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="30" y1="38" x2="14" y2="56" stroke="url(#ccGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
      <line x1="30" y1="38" x2="30" y2="68" stroke="url(#ccGrad)" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

      {/* Nodes */}
      {/* Top center */}
      <circle cx="40" cy="8"  r="5" fill="url(#ccGrad)" />
      {/* Top right */}
      <circle cx="58" cy="14" r="4" fill="url(#ccGrad)" opacity="0.8" />
      {/* Upper left */}
      <circle cx="20" cy="18" r="5" fill="url(#ccGrad)" />
      {/* Far left middle */}
      <circle cx="10" cy="36" r="5.5" fill="url(#ccGrad)" />
      {/* Center */}
      <circle cx="30" cy="38" r="4" fill="url(#ccGrad)" opacity="0.75" />
      {/* Lower left */}
      <circle cx="14" cy="56" r="5" fill="url(#ccGrad)" />
      {/* Bottom center */}
      <circle cx="30" cy="68" r="5" fill="url(#ccGrad)" />
      {/* Bottom right — large anchor */}
      <circle cx="52" cy="72" r="7" fill="url(#ccGrad)" />
      {/* Bottom far right */}
      <circle cx="62" cy="58" r="4" fill="url(#ccGrad)" opacity="0.8" />
    </svg>
  );
}

/** Full lockup: icon + "Capital Connect" wordmark */
export function CapitalConnectLogoFull({
  size = 40,
  textSize = "text-xl",
  subtextSize = "text-xs",
  subtext,
  dark = false,
}: {
  size?: number;
  textSize?: string;
  subtextSize?: string;
  subtext?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <CapitalConnectLogo size={size} />
      <div>
        <div className={`${textSize} font-bold leading-tight ${dark ? "text-white" : "text-gray-900 dark:text-white"}`}>
          Capital Connect
        </div>
        {subtext && (
          <div className={`${subtextSize} text-blue-400 font-medium leading-tight`}>{subtext}</div>
        )}
      </div>
    </div>
  );
}
