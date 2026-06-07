import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TimelinePage({
  params,
}: Props) {
  const { slug } = await params;

  const child = await prisma.child.findUnique({
    where: {
      slug,
    },
    include: {
      memories: {
        orderBy: {
          memoryDate: "desc",
        },
      },
    },
  });

  if (!child) {
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
      <h1>
        Historia de {child.firstName}
      </h1>

      {child.memories.length === 0 ? (
        <p>
          Todavía no existen recuerdos registrados.
        </p>
      ) : (
        child.memories.map((memory) => (
          <Link
            key={memory.id}
            href={`/memory/${memory.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "1rem",
                marginBottom: "1rem",
                cursor: "pointer",
              }}
            >
              <h2>{memory.title}</h2>

              <p>{memory.description}</p>

              <small>
                {new Date(
                  memory.memoryDate
                ).toLocaleDateString()}
              </small>

              <p
                style={{
                  marginTop: "1rem",
                  color: "#ec4899",
                }}
              >
                Ver recuerdo →
              </p>
            </div>
          </Link>
        ))
      )}
    </main>
  );
}