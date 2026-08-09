export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <h1 className="text-2xl font-semibold text-foreground">
        Product #{id}
      </h1>
      <p className="text-muted mt-2">Product details coming soon.</p>
    </main>
  );
}