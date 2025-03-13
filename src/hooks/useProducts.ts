import { useState, useEffect } from "react";
import { getAllProducts } from "../services/product";

interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  image: string;
}

interface SortOrder {
  price: "asc" | "desc";
  stock: "asc" | "desc";
}

type SortableColumns = "price" | "stock";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>({ price: "asc", stock: "asc" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error while fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSort = (column: SortableColumns) => {
    const newSortOrder = sortOrder[column] === "asc" ? "desc" : "asc";

    setSortOrder((prevOrder) => {
      const newOrder = { ...prevOrder, [column]: newSortOrder };
      if (column === "price") {
        newOrder.stock = "asc";
      } else if (column === "stock") {
        newOrder.price = "asc";
      }
      return newOrder;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a[column] < b[column] ? -1 : 1;
      } else {
        return a[column] > b[column] ? -1 : 1;
      }
    });

    setFilteredProducts(sortedProducts);
  };

  return {
    products,
    filteredProducts,
    setFilteredProducts,
    sortOrder,
    handleSort,
  };
};
