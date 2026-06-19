import {PRODUCTS} from "@/mock/data";
import ViewProductPage from "@/components/dynamic-view/view-product-page";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    pid: product.slug,
  }));
}

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ pid: string }>;
}) {
  const { pid } = await params;

  return(
    <ViewProductPage pid={pid} />
  )
}