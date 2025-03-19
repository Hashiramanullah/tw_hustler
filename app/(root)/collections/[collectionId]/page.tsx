import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import Image from "next/image";
import React from "react";
import CollectionClient from "./collection"; // Import client component

const CollectionDetails = async ({ params }: { params: { collectionId: string } }) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);
  
  return (
    <CollectionClient collectionDetails={collectionDetails} />
  );
};

export default CollectionDetails;
export const dynamic = "force-dynamic";
