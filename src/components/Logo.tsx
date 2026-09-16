import logo from "../assets/images/logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={logo}
        alt="Heart AI"
        className="absolute left-[-6.6%] top-[-117%] h-[337%] w-[112%] max-w-none"
      />
    </div>
  );
}
