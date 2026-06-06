import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const children = await prisma.child.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Panel de Administración</h1>

      <br />

      <a href="/child/new">
        Registrar nuevo ahijado
      </a>

      <br />
      <br />

      <h2>Ahijados registrados</h2>

      {children.length === 0 ? (
        <p>No existen ahijados registrados.</p>
      ) : (
        <ul>
          {children.map((child) => (
            <li key={child.id}>
              {child.firstName} {child.lastName}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}