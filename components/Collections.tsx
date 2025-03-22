// Collections.jsx (Server Component)
import { getCollections } from "@/lib/actions/actions";
import CollectionClient from "@/app/homeComponents/CollectionCard";

const Collections = async () => {
  const collections = await getCollections();
  console.log(collections, 'collections data');

  return (
    <CollectionClient collections={collections} />
  );
};

export default Collections;