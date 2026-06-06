import { createChild } from "@/app/actions";

export default function NewChildPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Registrar Ahijado</h1>

      <form action={createChild}>
        <div>
          <label>Nombre</label>
          <br />
          <input
            type="text"
            name="firstName"
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
          />
        </div>

        <br />

        <div>
          <label>Fecha de nacimiento</label>
          <br />
          <input
            type="date"
            name="birthDate"
          />
        </div>

        <br />

        <div>
          <label>Biografía</label>
          <br />
          <textarea
            name="biography"
            rows={5}
          />
        </div>

        <br />

        <button type="submit">
          Guardar
        </button>
      </form>
    </main>
  );
}