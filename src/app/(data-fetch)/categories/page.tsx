import CategoryListComponent, { type Category } from "@/components/category/CategoryListComponent";

export default function CategoryPage() {
  const apiUrl = process.env.FAKESTORE_PLAZI_API?.trim() ||
    "https://api.escuelajs.co/api/v1/categories";

  const category: Promise<Category[]> = fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch categories");
      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Categories API must return JSON. Check FAKESTORE_PLAZI_API.");
      }
      return response.json();
    })
    .then((categories) => {
      if (!Array.isArray(categories) || !categories.every((category) =>
        category !== null &&
        typeof category === "object" &&
        typeof category.id === "number" &&
        typeof category.name === "string" &&
        typeof category.image === "string"
      )) {
        throw new Error("Categories API returned an invalid category list");
      }
      return categories;
    });

  return <CategoryListComponent category={category} />;
}
