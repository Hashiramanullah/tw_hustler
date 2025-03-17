import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

import Image from "next/image";
import MovingCard from "../famous/famousProduct";

export default function Home() {
  return (
    <>
      <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" />
      {/* <Collections /> */}
      <ProductList />
      <MovingCard/>
    </>
  );
}

export const dynamic = "force-dynamic";

