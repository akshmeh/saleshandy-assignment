import { LoaderCircle } from "lucide-react";

export default function Loader(){
    return (
        <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle size={80} className="stroke-brand-blue animate-spin" />
      </div>
    )
}