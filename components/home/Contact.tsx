import Image from "next/image";

const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/c/573245655193",
    icon: "/Redes/Whatsapp.png",
    label: "@ideal_core",
    color: "#25D366",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ideal_core?igsh=MXN1OHlldGVyYmg5dA==",
    icon: "/Redes/instagram.png",
    label: "@ideal_core",
    color: "#E1306C",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/18epsAvGtE/",
    icon: "/Redes/facebook.png",
    label: "Ideal Core",
    color: "#1877F2",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@ideal_core?_r=1&_t=ZS-97ATsuzdDLl",
    icon: "/Redes/tik-tok.png",
    label: "@ideal_core",
    color: "#010101",
  },
];

export function Contact() {
  return (
    <section className="py-20 px-4 sm:px-6" id="contacto">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Contáctanos
        </h2>
        <p
          className="text-base sm:text-lg mb-12 max-w-xl mx-auto"
          style={{ color: "var(--foreground)", opacity: 0.6 }}
        >
          Estamos en todas las redes. Escríbenos y con gusto te ayudamos a
          encontrar el regalo perfecto.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-soft)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center p-3 transition-transform group-hover:scale-110"
                style={{ background: s.color + "1A" }}
              >
                <Image
                  src={s.icon}
                  alt={s.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <p
                  className="font-semibold text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {s.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--foreground)", opacity: 0.5 }}
                >
                  {s.label}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
