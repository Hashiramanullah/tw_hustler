import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

import Image from "next/image";
import MovingCard from "../homeComponents/famousProduct";
import Banner from "../homeComponents/banner";
import CategorySlider from "@/components/NewCollection";

export default function Home() {
  return (
    <>
      {/* <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" /> */}
      <Banner/>
      <CategorySlider/>
      <Collections />
      <MovingCard/>
      <ProductList />
    </>
  );
}

export const dynamic = "force-dynamic";

