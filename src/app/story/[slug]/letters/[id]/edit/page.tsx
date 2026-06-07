import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateLetter } from "@/app/actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditLetterPage({
  params,
}: Props) {
  const { id } = await params;

  const letter = await prisma.letter.findUnique({
    where: {
      id,
    },
  });

  if (!letter) {
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
      <h1>💌 Editar Carta</h1>

      <form action={updateLetter}>
        <input
          type="hidden"
          name="id"
          value={letter.id}
        />

        <div>
          <label>Título</label>
          <br />
          <input
            type="text"
            name="title"
            defaultValue={letter.title}
            required
          />
        </div>

        <br />

        <div>
          <label>Autor</label>
          <br />
          <input
            type="text"
            name="author"
            defaultValue={letter.author}
            required
          />
        </div>

        <br />

        <div>
          <label>Fecha de desbloqueo</label>
          <br />
          <input
            type="date"
            name="unlockDate"
            defaultValue={
              letter.unlockDate
                .toISOString()
                .split("T")[0]
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Carta</label>
          <br />
          <textarea
            name="content"
            rows={12}
            defaultValue={letter.content}
            required
          />
        </div>

        <br />

        <button type="submit">
          Guardar Cambios
        </button>
      </form>
    </main>
  );
}