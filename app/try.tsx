"use client";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setText("");

    fetch("/api/extractTextPDF", {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type") || "";
        const payload = contentType.includes("application/json")
          ? ((await response.json()) as {
              text?: string;
              error?: string;
            })
          : { error: await response.text() };

        if (!response.ok) {
          throw new Error(payload.error || "No se pudo extraer el texto.");
        }

        setText(payload.text || "");
      })
      .catch((fetchError: unknown) => {
        setError(fetchError instanceof Error ? fetchError.message : "Error desconocido.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Upload PDF</h1>
      <input onChange={onFileChange} type="file" id="file" name="file" accept=".pdf" />
      {loading ? <p>Extrayendo texto...</p> : null}
      {error ? <p>{error}</p> : null}
      {text ? <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre> : null}
    </main>
  );
}
