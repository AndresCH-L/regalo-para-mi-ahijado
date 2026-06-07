import { createUser } from "@/app/actions";

export default function NewUserPage() {
  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>👤 Nuevo Usuario</h1>

      <form action={createUser}>
        <div>
          <label>Nombre</label>
          <br />
          <input
            type="text"
            name="name"
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            required
          />
        </div>

        <br />

        <div>
          <label>Rol</label>
          <br />
          <select
            name="role"
            required
          >
            <option value="OWNER">
              OWNER
            </option>

            <option value="FATHER">
              FATHER
            </option>

            <option value="MOTHER">
              MOTHER
            </option>

            <option value="GODFATHER">
              GODFATHER
            </option>

            <option value="GODMOTHER">
              GODMOTHER
            </option>

            <option value="FAMILY">
              FAMILY
            </option>
          </select>
        </div>

        <br />

        <button type="submit">
          Guardar Usuario
        </button>
      </form>
    </main>
  );
}