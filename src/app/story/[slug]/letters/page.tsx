import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LettersPage({
  params,
}: Props) {
  const { slug } = await params;

  const child = await prisma.child.findUnique({
    where: {
      slug,
    },
    include: {
      letters: {
        orderBy: {
          unlockDate: "asc",
        },
      },
    },
  });

  if (!child) {
    return <div>Ahijado no encontrado</div>;
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
        💌 Cartas para {child.firstName}
      </h1>

      <Link
        href={`/story/${child.slug}/letters/new`}
      >
        ➕ Nueva carta
      </Link>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gap: "1rem",
        }}
      >
        {child.letters.map((letter) => {
          const unlocked =
            new Date(letter.unlockDate) <= new Date();

          return (
            <div
              key={letter.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              <h3>{letter.title}</h3>
            <div
              style={{
                marginBottom: "1rem",
              }}
            >
              <Link
                href={`/letters/${letter.id}/edit`}
              >
                ✏️ Editar Carta
              </Link>
            </div>
              {!unlocked ? (
                <>
                  <p>
                    🔒 Esta carta fue escrita para
                    tu futuro.
                  </p>

                  <p>
                    Disponible:
                    {" "}
                    {new Date(
                      letter.unlockDate
                    ).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>De:</strong>{" "}
                    {letter.author}
                  </p>

                  <p>{letter.content}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}