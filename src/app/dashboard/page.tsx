import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const children = await prisma.child.findMany();

  const memoriesCount = await prisma.memory.count();

  const lettersCount = await prisma.letter.count();

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>
        🎁 Panel de Administración
      </h1>

      <p>
        Bienvenido Andrés.
      </p>

      <br />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "1rem",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <h2>👶 Ahijados</h2>

          <h3>{children.length}</h3>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <h2>📖 Recuerdos</h2>

          <h3>{memoriesCount}</h3>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <h2>💌 Cartas</h2>

          <h3>{lettersCount}</h3>
        </div>
      </div>

      <br />
      <br />

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/child/new"
          style={{
            padding: "1rem",
            borderRadius: "12px",
            backgroundColor: "#ec4899",
            color: "white",
            textDecoration: "none",
          }}
        >
          ➕ Nuevo Ahijado
        </Link>
      </div>

      <br />

      <h2>Ahijados Registrados</h2>

      {children.length === 0 ? (
        <p>
          No existen ahijados registrados.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
          }}
        >
          {children.map((child) => (
            <div
              key={child.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              <h3>
                {child.firstName}
                {" "}
                {child.lastName}
              </h3>

              <p>
                Slug:
                {" "}
                {child.slug}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href={`/story/${child.slug}`}
                >
                  Ver Historia
                </Link>
                <Link
                  href={`/child/${child.id}/edit`}
                >
                  Editar
                </Link>
                <Link
                  href={`/story/${child.slug}/timeline`}
                >
                  Timeline
                </Link>

                <Link
                  href={`/story/${child.slug}/letters`}
                >
                  Cartas
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}