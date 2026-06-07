import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateChild } from "@/app/actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditChildPage({
  params,
}: Props) {
  const { id } = await params;

  const child = await prisma.child.findUnique({
    where: {
      id,
    },
  });

  if (!child) {
    notFound();
  }

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>
        Editar Ahijado
      </h1>

      <form action={updateChild}>
        <input
          type="hidden"
          name="id"
          value={child.id}
        />

        <div>
          <label>Nombre</label>
          <br />
          <input
            type="text"
            name="firstName"
            defaultValue={child.firstName}
            required
          />
        </div>

        <br />

        <div>
          <label>Apellido</label>
          <br />
          <input
            type="text"
            name="lastName"
            defaultValue={child.lastName || ""}
          />
        </div>

        <br />

        <div>
          <label>
            Fecha de nacimiento
          </label>
          <br />
          <input
            type="date"
            name="birthDate"
            defaultValue={
              child.birthDate
                ? child.birthDate
                    .toISOString()
                    .split("T")[0]
                : ""
            }
          />
        </div>

        <br />

        <div>
          <label>Biografía</label>
          <br />
          <textarea
            name="biography"
            rows={6}
            defaultValue={
              child.biography || ""
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