import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StoryPage({
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
      letters: true,
    },
  });

  if (!child) {
    notFound();
  }

  const memoriesCount =
    child.memories.length;

  const lettersCount =
    child.letters.length;

  const photosCount =
    child.memories.reduce(
      (total, memory) =>
        total + memory.media.length,
      0
    );

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
        background:
          "linear-gradient(to bottom, #fdf2f8, #ffffff)",
      }}
    >
      <Image
        src={
          child.profileImageUrl ||
          "/uploads/children/mael.jpeg"
        }
        alt={child.firstName}
        width={250}
        height={250}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "2rem",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.15)",
        }}
      />

      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "1rem",
        }}
      >
        Hola {child.firstName} ❤️
      </h1>

      <p
        style={{
          fontSize: "1.3rem",
          maxWidth: "700px",
        }}
      >
        Esta historia fue creada especialmente
        para ti.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "12px",
            minWidth: "180px",
          }}
        >
          <h2>{memoriesCount}</h2>
          <p>📖 Recuerdos</p>
        </div>

        <div
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "12px",
            minWidth: "180px",
          }}
        >
          <h2>{lettersCount}</h2>
          <p>💌 Cartas</p>
        </div>

        <div
          style={{
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "12px",
            minWidth: "180px",
          }}
        >
          <h2>{photosCount}</h2>
          <p>📸 Fotografías</p>
        </div>
      </div>

      <p
        style={{
          marginTop: "2rem",
          maxWidth: "700px",
          lineHeight: "1.8",
        }}
      >
        Tu padrino y tu familia han estado
        guardando recuerdos, fotografías,
        cartas y momentos importantes para que
        algún día puedas recorrer tu propia
        historia paso a paso.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Link
          href={`/story/${child.slug}/timeline`}
          style={{
            padding: "1rem 2rem",
            borderRadius: "12px",
            backgroundColor: "#ec4899",
            color: "white",
            textDecoration: "none",
          }}
        >
          📖 Mi Historia
        </Link>

        <Link
          href={`/story/${child.slug}/letters`}
          style={{
            padding: "1rem 2rem",
            borderRadius: "12px",
            backgroundColor: "#8b5cf6",
            color: "white",
            textDecoration: "none",
          }}
        >
          💌 Cartas para mí
        </Link>

        <Link
          href={`/story/${child.slug}/gallery`}
          style={{
            padding: "1rem 2rem",
            borderRadius: "12px",
            backgroundColor: "#06b6d4",
            color: "white",
            textDecoration: "none",
          }}
        >
          📸 Mis Fotos
        </Link>

        <Link
          href={`/story/${child.slug}/videos`}
          style={{
            padding: "1rem 2rem",
            borderRadius: "12px",
            backgroundColor: "#f59e0b",
            color: "white",
            textDecoration: "none",
          }}
        >
          🎥 Mis Videos
        </Link>

        <Link
          href={`/story/${child.slug}/audios`}
          style={{
            padding: "1rem 2rem",
            borderRadius: "12px",
            backgroundColor: "#10b981",
            color: "white",
            textDecoration: "none",
          }}
        >
          🎵 Mis Audios
        </Link>
      </div>

      <div
        style={{
          marginTop: "4rem",
          maxWidth: "800px",
        }}
      >
        <h2>Sobre ti</h2>

        <p
          style={{
            lineHeight: "1.8",
          }}
        >
          {child.biography}
        </p>
      </div>
    </main>
  );
}