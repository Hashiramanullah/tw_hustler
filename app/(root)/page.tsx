import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

import Image from "next/image";
import MovingCard from "../homeComponents/famousProduct";
import Banner from "../homeComponents/banner";

export default function Home() {
  return (
    <>
      {/* <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" /> */}
      <Banner/>
      <Collections />
      <ProductList />
      <MovingCard/>
    </>
  );
}

export const dynamic = "force-dynamic";

