import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getProductsApiUrl } from "@/lib/api";
import ProductDetailClient from "./product-detail-client";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  if (!/^[1-9]\d*$/.test(slug)) notFound();

  const previousImages = (await parent).openGraph?.images || [];
  const fallback: Metadata = {
    title: "Product details",
    openGraph: { images: previousImages },
  };

  // Metadata must not crash the page when the upstream API is unavailable.
  try {
    const response = await fetch(`${getProductsApiUrl()}/${slug}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return fallback;

    const product: unknown = await response.json();
    if (!product || typeof product !== "object" ||
      !("title" in product) || typeof product.title !== "string") {
      return fallback;
    }

    const image = "image" in product && typeof product.image === "string"
      && /^https?:\/\//.test(product.image) ? product.image : undefined;
    const description = "description" in product && typeof product.description === "string"
      ? product.description : undefined;

    return {
      title: product.title,
      description,
      openGraph: {
        title: product.title,
        description,
        images: image ? [image, ...previousImages] : previousImages,
      },
    };
  } catch {
    return fallback;
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!/^[1-9]\d*$/.test(slug)) notFound();
  return <ProductDetailClient key={slug} slug={slug} />;
}
