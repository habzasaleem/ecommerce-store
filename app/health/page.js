async function getStatus() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch health data");
  }

  return res.json();
}

export default async function HealthPage() {
  const data = await getStatus();

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <h1 className="text-2xl font-semibold text-foreground">
        Health Check
      </h1>
      <p className="text-muted mt-2">
        Server status:{" "}
        <span className="text-accent font-medium">Online</span>
      </p>

      <div className="mt-6 bg-surface border border-black/10 rounded-md p-4 max-w-md">
        <p className="text-sm text-muted">Sample fetched data:</p>
        <pre className="text-sm text-foreground mt-2 whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </main>
  );
}