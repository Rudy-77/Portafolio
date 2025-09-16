// src/components/Button/Button.jsx

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const variants = {
  primary:
    // negro por defecto, un poco más oscuro al hover
    "bg-gray-900 text-white hover:bg-gray-950 focus-visible:ring-gray-900",
  secondary:
    // blanco por defecto; en hover se vuelve negro
    "border border-gray-300 bg-white hover:bg-gray-900 hover:text-white hover:border-gray-900 focus-visible:ring-gray-900",
  ghost:
    // transparente por defecto; en hover se vuelve negro
    "bg-transparent hover:bg-gray-900 hover:text-white focus-visible:ring-gray-900",
  link:
    // link visual (no cambia a negro); si quieres que también se ponga negro, dímelo
    "bg-transparent text-blue-600 hover:underline px-0 py-0 focus-visible:ring-blue-500",
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-12 px-5 text-lg",
};

function Button({
  children,
  variant = "secondary",
  size = "md",
  href,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  loading = false,
  className = "",
  ...props
}) {
  const Comp = href ? "a" : "button";

  return (
    <Comp
      href={href}
      className={cn(
        // base
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium",
        "transition-colors duration-200 focus:outline-none",
        // animación de tamaño al hover
        "transition-transform duration-200 ease-out hover:scale-105 active:scale-100",
        "focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {LeadingIcon ? <LeadingIcon className="w-4 h-4" /> : null}
          <span>{children}</span>
          {TrailingIcon ? <TrailingIcon className="w-4 h-4" /> : null}
        </>
      )}
    </Comp>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
    </svg>
  );
}

export default Button;
