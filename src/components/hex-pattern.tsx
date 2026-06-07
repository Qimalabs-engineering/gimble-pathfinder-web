export function HexPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hex" width="40" height="34.64" patternUnits="userSpaceOnUse">
          <polygon
            points="20,0 40,11.55 40,23.09 20,34.64 0,23.09 0,11.55"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#hex)" />
    </svg>
  );
}
