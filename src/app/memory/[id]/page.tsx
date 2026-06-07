import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { deleteMemory } from "@/app/actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MemoryPage({
  params,
}: Props) {
  const { id } = await params;

  const memory = await prisma.memory.findUnique({
    where: {
      id,
    },
    include: {
      media: true,
    },
  });

  if (!memory) {
    notFound();
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>{memory.title}</h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Link
          href={`/memory/${memory.id}/edit`}
          style={{
            color: "#ec4899",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ✏️ Editar Recuerdo
        </Link>

        <form action={deleteMemory}>
          <input
            type="hidden"
            name="id"
            value={memory.id}
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
            🗑 Eliminar Recuerdo
          </button>
        </form>
      </div>

      <p
        style={{
          marginTop: "1rem",
        }}
      >
        {new Date(
          memory.memoryDate
        ).toLocaleDateString()}
      </p>

      <hr />

      <br />

      <p
        style={{
          lineHeight: "1.8",
        }}
      >
        {memory.description}
      </p>

      <br />

      <h2>Fotos y recuerdos</h2>

      {memory.media.length === 0 ? (
        <p>
          Todavía no existen archivos para este recuerdo.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {memory.media.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Image
                src={item.fileUrl}
                alt={item.fileName}
                width={400}
                height={300}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "0.5rem",
                }}
              >
                {item.fileName}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}