import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AudiosPage({
  params,
}: Props) {
  const { slug } = await params;

  const child = await prisma.child.findUnique({
    where: {
      slug,
    },
    include: {
      memories: {
        include: {
          media: true,
        },
      },
    },
  });

  if (!child) {
    notFound();
  }

  const audios = child.memories.flatMap(
    (memory) =>
      memory.media.filter(
        (media) => media.type === "AUDIO"
      )
  );

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>
        🎵 Audios de {child.firstName}
      </h1>

      {audios.length === 0 ? (
        <p>
          Todavía no existen audios registrados.
        </p>
      ) : (
        audios.map((audio) => (
          <div
            key={audio.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{audio.fileName}</h3>

            <audio controls>
              <source
                src={audio.fileUrl}
              />
            </audio>
          </div>
        ))
      )}
    </main>
  );
}