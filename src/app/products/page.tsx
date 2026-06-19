import ViewProductsPage from "@/components/dynamic-view/view-products-page";
import Loader from "@/components/layout/Loader";
import { Suspense } from "react";


export default function ProductPage(){

  return(
    <Suspense fallback={<Loader />}>
        <ViewProductsPage />
    </Suspense>
  )
}