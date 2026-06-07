import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>👥 Usuarios</h1>

      <br />

      <Link href="/users/new">
        ➕ Nuevo Usuario
      </Link>

      <br />
      <br />

      {users.length === 0 ? (
        <p>No existen usuarios registrados.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
          }}
        >
          {users.map((user) => (
            <div
              key={user.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              <h3>{user.name}</h3>

              <p>{user.email}</p>

              <strong>{user.role}</strong>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}