import { notFound } from "next/navigation";
import ProductDetailClient from "./product-detail-client";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!/^[1-9]\d*$/.test(slug)) notFound();
  return <ProductDetailClient key={slug} slug={slug} />;
}
