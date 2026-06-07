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
  });

  if (!memory) {
    notFound();
  }

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>Editar Recuerdo</h1>

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
            <option value="EMBARAZO">
              EMBARAZO
            </option>

            <option value="NACIMIENTO">
              NACIMIENTO
            </option>

            <option value="CUMPLEANOS">
              CUMPLEANOS
            </option>

            <option value="COLEGIO">
              COLEGIO
            </option>

            <option value="VIAJE">
              VIAJE
            </option>

            <option value="DEPORTE">
              DEPORTE
            </option>

            <option value="LOGRO">
              LOGRO
            </option>

            <option value="FAMILIA">
              FAMILIA
            </option>

            <option value="OTRO">
              OTRO
            </option>
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
    </main>
  );
}