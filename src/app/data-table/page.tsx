import type { Product } from "@/app/data-table/columns";
import { DataTable } from "@/app/data-table/data-table";
import { getProductsApiUrl } from "@/lib/api";

async function getData(): Promise<Product[]> {
  const response = await fetch(getProductsApiUrl(), { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch products. Please try again.");

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error("The products API returned invalid data.");

  return data.map((item) => {
    if (
      item === null || typeof item !== "object" ||
      typeof item.id !== "number" || typeof item.image !== "string" ||
      typeof item.title !== "string" || typeof item.price !== "number" ||
      typeof item.category !== "string" || typeof item.rating?.rate !== "number"
    ) {
      throw new Error("The products API returned invalid data.");
    }

    return {
      id: item.id,
      images: item.image,
      title: item.title,
      price: item.price,
      category: item.category,
      rate: item.rating.rate,
    };
  });
}

export default async function ProductTablePage() {
  const data = await getData();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Products</h1>
      <p className="mb-6 mt-2 text-muted-foreground">Browse {data.length} products.</p>
      <DataTable data={data} />
    </div>
  );
}
