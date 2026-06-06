import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;

  const child = await prisma.child.findUnique({
    where: {
      slug,
    },
  });

  if (!child) {
    notFound();
  }

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
          "/uploads/children/mael.jpg"
        }
        alt={child.firstName}
        width={250}
        height={250}
        style={{
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
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
        Esta es tu historia.
      </p>

      <p
        style={{
          marginTop: "1rem",
          maxWidth: "700px",
          lineHeight: "1.8",
        }}
      >
        Este espacio fue creado especialmente para ti.
        Aquí encontrarás fotografías, recuerdos,
        videos, cartas y momentos importantes que
        hemos guardado durante toda tu vida.
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