import { createLetter } from "@/app/actions";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewLetterPage({
  params,
}: Props) {
  const { slug } = await params;

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>💌 Nueva Carta</h1>

      <p>
        Escribe una carta para el futuro de tu ahijado.
      </p>

      <form action={createLetter}>
        <input
          type="hidden"
          name="slug"
          value={slug}
        />

        <div>
          <label>Título</label>
          <br />
          <input
            type="text"
            name="title"
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
            required
          />
        </div>

        <br />

        <div>
          <label>Contenido de la carta</label>
          <br />
          <textarea
            name="content"
            rows={12}
            required
          />
        </div>

        <br />

        <button type="submit">
          Guardar Carta
        </button>
      </form>
    </main>
  );
}