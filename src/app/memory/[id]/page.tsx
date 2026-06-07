import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

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

<Link
  href={`/memory/${memory.id}/edit`}
>
  ✏️ Editar Recuerdo
</Link>

      <p>
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
        <div>
          {memory.media.map((item) => (
            <div key={item.id}>
              {item.fileName}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}