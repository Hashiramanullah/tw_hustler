export const getCollections = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
    if (!res.ok) {
      throw new Error(`Failed to fetch collections: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching collections:", error);
    return null;
  }
};

export const getCollectionDetails = async (collectionId:any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch collection details: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching collection details:", error);
    return null;
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getProductDetails = async (productId:any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product details: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching product details:", error);
    return null;
  }
};

export const getSearchedProducts = async (query:any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch searched products: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching searched products:", error);
    return null;
  }
};

export const getOrders = async (customerId:any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch orders: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

export const getRelatedProducts = async (productId:any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`);
    if (!res.ok) {
      throw new Error(`Failed to fetch related products: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching related products:", error);
    return null;
  }
};