import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem 2rem",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        href="/"
        style={{
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: "#111827",
        }}
      >
        🎁 Mi Historia
      </Link>

      <div
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link href="/">Inicio</Link>

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/child/new">
          Nuevo Ahijado
        </Link>
      </div>
    </nav>
  );
}