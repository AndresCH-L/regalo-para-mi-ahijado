import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteChild } from "@/app/actions";

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

        <Link
          href="/users"
          style={{
            padding: "1rem",
            borderRadius: "12px",
            backgroundColor: "#6366f1",
            color: "white",
            textDecoration: "none",
          }}
        >
          👥 Usuarios
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
                borderRadius: "16px",
                padding: "1rem",
                display: "flex",
                gap: "1.5rem",
                alignItems: "center",
              }}
            >
              <Image
                src={
                  child.profileImageUrl ||
                  "/uploads/children/mael.jpeg"
                }
                alt={child.firstName}
                width={100}
                height={100}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <div>
                <h3>
                  {child.firstName}{" "}
                  {child.lastName}
                </h3>

                <p>
                  Slug: {child.slug}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginTop: "0.5rem",
                  }}
                >
                  <Link
                    href={`/story/${child.slug}`}
                  >
                    📖 Ver Historia
                  </Link>

                  <Link
                    href={`/child/${child.id}/edit`}
                  >
                    ✏️ Editar
                  </Link>

                  <Link
                    href={`/story/${child.slug}/timeline`}
                  >
                    🕒 Timeline
                  </Link>

                  <Link
                    href={`/story/${child.slug}/letters`}
                  >
                    💌 Cartas
                  </Link>

                  <form action={deleteChild}>
                    <input
                      type="hidden"
                      name="id"
                      value={child.id}
                    />

                    <button
                      type="submit"
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "red",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      🗑 Eliminar Ahijado
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}