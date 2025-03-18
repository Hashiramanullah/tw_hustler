'use client'
import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { div } from "framer-motion/client";

const CollectionDetails = async ({
params,
}: {
  params: { collectionId: string };
}) => {
  const router = useRouter();

  const collectionDetails = await getCollectionDetails(params.collectionId);
  
  return (
  <div>
  <nav className="p-4 bg-gray-600 shadow-md text-sm text-white">
        <span className="cursor-pointer hover:text-gray-700" onClick={() => router.push("/")}>Home</span> 
        <span className="mx-2"> / </span>
        <span className="font-semibold text-gray-800 capitalize">{collectionDetails.title}</span>
      </nav>

      <div className="px-10 py-5 flex flex-col items-center gap-8">
      
      <Image
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <p className="text-heading3-bold text-grey-2">{collectionDetails.title}</p>
      <p className="text-body-normal text-grey-2 text-center max-w-[900px]">{collectionDetails.description}</p>
      <div className="flex flex-wrap gap-16 justify-center">
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";

