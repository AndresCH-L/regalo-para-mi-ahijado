import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateMemory } from "@/app/actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMemoryPage({
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
      <h1>✏️ Editar Recuerdo</h1>

      <form action={updateMemory}>
        <input
          type="hidden"
          name="id"
          value={memory.id}
        />

        <div>
          <label>Título</label>
          <br />
          <input
            type="text"
            name="title"
            defaultValue={memory.title}
            required
          />
        </div>

        <br />

        <div>
          <label>Fecha</label>
          <br />
          <input
            type="date"
            name="memoryDate"
            defaultValue={
              memory.memoryDate
                .toISOString()
                .split("T")[0]
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Categoría</label>
          <br />

          <select
            name="category"
            defaultValue={memory.category}
          >
            <option value="EMBARAZO">EMBARAZO</option>
            <option value="NACIMIENTO">NACIMIENTO</option>
            <option value="CUMPLEANOS">CUMPLEANOS</option>
            <option value="COLEGIO">COLEGIO</option>
            <option value="VIAJE">VIAJE</option>
            <option value="DEPORTE">DEPORTE</option>
            <option value="LOGRO">LOGRO</option>
            <option value="FAMILIA">FAMILIA</option>
            <option value="OTRO">OTRO</option>
          </select>
        </div>

        <br />

        <div>
          <label>Descripción</label>
          <br />

          <textarea
            name="description"
            rows={8}
            defaultValue={
              memory.description || ""
            }
          />
        </div>

        <br />

        <button type="submit">
          Guardar Cambios
        </button>
      </form>

      <hr
        style={{
          marginTop: "3rem",
          marginBottom: "3rem",
        }}
      />

      <h2>📸 Multimedia</h2>

      <p>
        Fotos, videos y audios asociados a este
        recuerdo.
      </p>

      <br />

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          href={`/memory/${memory.id}`}
        >
          👁️ Ver Recuerdo
        </Link>

        <Link
          href={`/story`}
        >
          📷 Agregar Foto
        </Link>

        <Link
          href={`/story`}
        >
          🎥 Agregar Video
        </Link>

        <Link
          href={`/story`}
        >
          🎵 Agregar Audio
        </Link>
      </div>

      <br />
      <br />

      <h3>
        Archivos registrados ({memory.media.length})
      </h3>

      {memory.media.length === 0 ? (
        <p>
          Todavía no existen archivos asociados.
        </p>
      ) : (
        <ul>
          {memory.media.map((item) => (
            <li key={item.id}>
              {item.fileName}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}