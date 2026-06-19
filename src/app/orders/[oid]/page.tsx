import ViewOrderPage from "@/components/dynamic-view/view-order-page";
import {INITIAL_ORDERS} from "@/mock/data";


export async function generateStaticParams() {
  return INITIAL_ORDERS.map((order) => ({
    oid: order.id,
  }));
}

export default async function SingleOrderPage({
  params,
}: {
  params: Promise<{ oid: string }>;
}) {
  const { oid } = await params;

    return(
      <ViewOrderPage oid={oid} />
    )
}