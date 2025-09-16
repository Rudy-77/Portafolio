// Autor: Paulo César Pérez Martínez
import { useEffect, useMemo, useState } from "react";
import Button from "./components/Button/Button";
import TechBadge from "./components/tech/techbadge";
import {
  HtmlIcon,
  CssIcon,
  JsIcon,
  ReactIcon,
  NextIcon,
  TailwindIcon,
  GitIcon,
  PostgresIcon,
  SpringIcon,
} from "./components/tech/techicons";

function Chip({ children }) {
  return <span className="px-3 py-1 rounded-full border text-sm">{children}</span>;
}
function SectionTitle({ children }) {
  return <h2 className="text-2xl font-bold mb-4">{children}</h2>;
}
function NavLink({ href, label, active }) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={
        "rounded-xl px-3 py-1.5 transition-all duration-300 focus:outline-none " +
        "focus-visible:ring-2 focus-visible:ring-blue-500 " +
        (active ? "bg-gray-900 text-white shadow-sm" : "hover:bg-gray-100 hover:shadow-sm")
      }
    >
      {label}
    </a>
  );
}

const contactos = [
  {
    name: "Email",
    href: "mailto:pau876171@gmail.com",
    icon: "/mail.svg",
    label: "pau876171@gmail.com",
  },
  {
    name: "GitHub",
    href: "https://github.com/Rudy-77",
    icon: "/github.svg",
    label: "github.com/Rudy-77",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/paulo-c-p%C3%A9rez-mtz-34734b302/",
    icon: "/linkdl.svg",
    label: "Perfil de LinkedIn",
  },
];

const tecnologias = [
  { name: "HTML", Icon: HtmlIcon },
  { name: "CSS", Icon: CssIcon },
  { name: "JavaScript", Icon: JsIcon },
  { name: "React", Icon: ReactIcon },
  { name: "Next.js", Icon: NextIcon },
  { name: "Tailwind CSS", Icon: TailwindIcon },
  { name: "Git/GitHub", Icon: GitIcon },
  { name: "PostgreSQL", Icon: PostgresIcon },
  { name: "Spring Boot", Icon: SpringIcon },
];

const proyectos = [
  {
    titulo: "Projexus — Página gestora de concursos escolares",
    anio: "2025",
    descripcion:
      "Plataforma para gestionar concursos escolares: registro, inscripciones y administración de participaciones.",
    image: "/Projexus.jpg",
    tech: ["Next.js", "SpringBoot", "PostgreSQL"],
    codigo: "https://github.com/TonyMed12/ProjeXus", 
    
  },
];

export default function App() {
  const sections = useMemo(
    () => [
      { id: "hero", label: "Inicio" },
      { id: "proyectos", label: "Proyectos" },
      { id: "tecnologias", label: "Tecnologías" },
      { id: "contacto", label: "Contacto" },
    ],
    []
  );

  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin: "0px 0px -60% 0px", threshold: [0.25, 0.5, 0.75] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-white text-gray-900">
      {/* Header */}
      <header
        className={
          "sticky top-0 z-50 bg-white/80 backdrop-blur border-b transition-shadow " +
          (scrolled ? "shadow-sm" : "")
        }
      >
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">
            Paulo César Pérez Martínez
          </a>
          <nav className="flex items-center gap-2 text-sm">
            {sections.map((s) => (
              <NavLink key={s.id} href={`#${s.id}`} label={s.label} active={active === s.id} />
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="max-w-5xl mx-auto px-5">
        {/* HERO */}
        <section id="hero" className="py-12 md:py-16 grid md:grid-cols-[1.1fr,0.9fr] items-center gap-8">
          {/* Texto */}
          <div>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-sm border mb-4">
              Estudiante de Ing. en Sistemas
            </span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Hola, soy <span className="text-blue-600">Paulo</span>.<br />
              Me gusta construir interfaces simples y claras.
            </h1>
            <p className="mt-4 text-gray-600">
              Aquí comparto proyectos en los que he trabajado y las tecnologías que uso.
            </p>

            {/* Botones */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="https://github.com/Rudy-77">GitHub</Button>
              <Button href="https://www.linkedin.com/in/paulo-c-p%C3%A9rez-mtz-34734b302/">LinkedIn</Button>
              <Button href="mailto:pau876171@gmail.com">Email</Button>
            </div>
          </div>          
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="py-8">
          <SectionTitle>Proyectos</SectionTitle>
          <div className="grid md:grid-cols-2 gap-5">
            {proyectos.map((p, i) => (
              <article
                key={i}
                className="rounded-2xl border shadow-sm bg-white overflow-hidden hover:shadow-md transition"
              >
                {/* Imagen del proyecto */}
                <figure className="relative aspect-video bg-gray-100">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`Imagen del proyecto ${p.titulo}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-gray-400">
                      <svg viewBox="0 0 24 24" className="w-10 h-10">
                        <path
                          d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 0l6.5 6.5a1 1 0 0 0 1.4 0L16 8l5 5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="sr-only">Sin imagen</span>
                    </div>
                  )}
                </figure>

                {/* Contenido */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{p.titulo}</h3>
                      <p className="mt-1 text-gray-600 text-sm">{p.descripcion}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-sm border">
                      {p.anio}
                    </span>
                  </div>

                  <ul className="mt-3 flex flex-wrap gap-2 text-sm">
                    {p.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center gap-3">
                    {p.demo && (
                      <Button variant="secondary" href={p.demo} target="_blank" rel="noreferrer">
                        Demo
                      </Button>
                    )}
                    {p.codigo && (
                      <Button variant="primary" href={p.codigo} target="_blank" rel="noreferrer">
                        Código
                      </Button>
                    )}
                  </div>
                </div>
              </article>

            ))}
          </div>
        </section>

        {/* TECNOLOGÍAS */}
        <section id="tecnologias" className="py-8">
          <SectionTitle>Tecnologías</SectionTitle>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            aria-label="Listado de tecnologías"
          >
            {tecnologias.map((t) => (
              <TechBadge key={t.name} name={t.name} Icon={t.Icon} />
            ))}
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="py-10">
          <SectionTitle>Contacto</SectionTitle>
          <ul className="mt-4 space-y-3 max-w-md">
            {contactos.map((c) => (
              <li key={c.name}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-xl border p-3
                             transition transform hover:scale-[1.02] active:scale-100
                             hover:bg-gray-900 hover:text-white hover:shadow-sm"
                >
                  <img
                    src={c.icon}
                    alt={c.name}
                    className="w-6 h-6 bg-white rounded p-[2px] group-hover:bg-white"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-sm text-gray-600 group-hover:text-white/90">
                      {c.label}
                    </span>
                  </div>
                  {/* Flechita a la derecha */}
                  <svg
                    viewBox="0 0 24 24"
                    className="ml-auto w-4 h-4 opacity-60 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t py-6 mt-10">
        <div className="max-w-5xl mx-auto px-5 text-sm text-gray-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Paulo César Pérez Martínez</p>
          <Button href="#top" size="sm" className="border">
            Volver arriba
          </Button>
        </div>
      </footer>
    </div>
  );
}
