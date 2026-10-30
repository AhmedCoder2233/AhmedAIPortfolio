export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#0E1726" />
      <path d="M7 29 L13.5 11 L20 29" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.6 23.2 H17.4" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 29 V11 L26.5 22 L33 11 V29" stroke="#6C8BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
