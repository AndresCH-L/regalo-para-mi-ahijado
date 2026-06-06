import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { createMemory } from "@/app/actions";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AddMemoryPage({
  params,
}: Props) {
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
    <main style={{ padding: "2rem" }}>
      <h1>
        Agregar recuerdo para {child.firstName}
      </h1>

      <form action={createMemory}>
        <input
          type="hidden"
          name="childId"
          value={child.id}
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
          <label>Fecha</label>
          <br />
          <input
            type="date"
            name="memoryDate"
            required
          />
        </div>

        <br />

        <div>
          <label>Categoría</label>
          <br />
          <select
            name="category"
            required
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
            rows={5}
          />
        </div>

        <br />

        <button type="submit">
          Guardar Recuerdo
        </button>
      </form>
    </main>
  );
}