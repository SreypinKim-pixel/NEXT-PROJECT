import CategoryComponent, { type CategoryInter } from "./CategoryComponent";

export interface Category extends CategoryInter {
  id: number;
}

export default async function CategoryListComponent({
  category,
}: {
  category: Promise<Category[]>;
}) {
  const categories = await category;

  if (categories.length === 0) return <p>No categories available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((item) => (
        <CategoryComponent key={item.id} name={item.name} image={item.image} />
      ))}
    </div>
  );
}
