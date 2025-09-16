
export default function TechBadge({ name, Icon, href }) {
  const Comp = href ? "a" : "div";
  return (
    <Comp
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noreferrer" : undefined}
      className="flex items-center gap-2 border rounded-xl px-3 py-2 text-sm
                 hover:shadow-sm hover:bg-gray-50 transition hover:-translate-y-0.5"
      title={name}
    >
      <Icon className="w-5 h-5" />
      <span>{name}</span>
    </Comp>
  );
}
