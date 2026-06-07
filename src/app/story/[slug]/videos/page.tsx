import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function VideosPage({
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

  const videos = child.memories.flatMap(
    (memory) =>
      memory.media.filter(
        (media) => media.type === "VIDEO"
      )
  );

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>
        🎥 Videos de {child.firstName}
      </h1>

      {videos.length === 0 ? (
        <p>
          Todavía no existen videos registrados.
        </p>
      ) : (
        videos.map((video) => (
          <div
            key={video.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{video.fileName}</h3>

            <video
              controls
              width="100%"
            >
              <source
                src={video.fileUrl}
              />
            </video>
          </div>
        ))
      )}
    </main>
  );
}