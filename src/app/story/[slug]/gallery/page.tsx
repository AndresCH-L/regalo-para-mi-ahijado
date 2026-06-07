import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function GalleryPage({
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

  const photos = child.memories.flatMap(
    (memory) =>
      memory.media.filter(
        (media) => media.type === "PHOTO"
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
        📸 Fotos de {child.firstName}
      </h1>

      {photos.length === 0 ? (
        <p>
          Todavía no existen fotografías
          registradas.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(250px,1fr))",
            gap: "1rem",
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Image
                src={photo.fileUrl}
                alt={photo.fileName}
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
                  padding: "1rem",
                }}
              >
                {photo.fileName}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}