import { getProductsApiUrl } from "@/lib/api";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("query")?.trim().toLowerCase();
  if (!query) return Response.json([]);

  try {
    const response = await fetch(getProductsApiUrl());
    if (!response.ok) throw new Error("Failed to fetch products");

    const products: unknown = await response.json();
    if (!Array.isArray(products)) throw new Error("Invalid products response");

    const results = products.map((product: unknown) => {
      if (
        !product || typeof product !== "object" ||
        !("id" in product) || typeof product.id !== "number" ||
        !("title" in product) || typeof product.title !== "string"
      ) {
        throw new Error("Invalid product response");
      }
      return { id: String(product.id), name: product.title };
    }).filter((product) => product.name.toLowerCase().includes(query));

    return Response.json(results);
  } catch {
    return Response.json({ error: "Failed to fetch products" }, { status: 502 });
  }
}
