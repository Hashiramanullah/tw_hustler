import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

import Image from "next/image";
import MovingCard from "../homeComponents/famousProduct";
import Banner from "../homeComponents/banner";
import CategorySlider from "@/components/NewCollection";
import HomepageSection from "../homeComponents/banner";
import ProductCard from "@/components/ProductCard";
import ProductCategoriesSlider from "../homeComponents/banner";
import Product from "../homeComponents/Product";
import Test from "../homeComponents/Test";

export default function Home() {
  return (
    <>
      {/* <Image src="/banner.png" alt="banner" width={2000} height={1000} className="w-screen" /> */}
      {/* <Banner/> */}
      {/* <HomepageSection/> */}
      <ProductCategoriesSlider/>
      <CategorySlider/>
      <Test/>
      <Product/>
      {/* <Collections /> */}
      {/* <MovingCard/> */}
      {/* <ProductList /> */}
    </>
  );
}

export const dynamic = "force-dynamic";

