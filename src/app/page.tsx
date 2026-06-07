import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
        background:
          "linear-gradient(to bottom, #fdf2f8, #ffffff)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "1rem",
          }}
        >
          🎁 Mi Historia
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            lineHeight: "1.8",
          }}
        >
          La historia de una vida,
          contada recuerdo por recuerdo.
        </p>

        <p
          style={{
            marginTop: "1.5rem",
            lineHeight: "1.8",
          }}
        >
          Conserva fotografías, videos,
          audios, recuerdos y cartas para
          las personas más importantes de tu vida.
        </p>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              padding: "1rem 2rem",
              borderRadius: "12px",
              backgroundColor: "#ec4899",
              color: "white",
              textDecoration: "none",
            }}
          >
            Panel de Administración
          </Link>

          <Link
            href="/child/new"
            style={{
              padding: "1rem 2rem",
              borderRadius: "12px",
              backgroundColor: "#8b5cf6",
              color: "white",
              textDecoration: "none",
            }}
          >
            Registrar Ahijado
          </Link>
        </div>
      </div>
    </main>
  );
}