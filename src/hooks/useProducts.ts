import { useState, useEffect, useMemo } from "react";
import { getAllProducts } from "../services/product";
import { IProduct } from "../interfaces/Product";


export interface ISortOrder {
  price: "asc" | "desc";
  stock: "asc" | "desc";
}

type SortableColumns = "price" | "stock";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [sortOrder, setSortOrder] = useState<ISortOrder>({ price: "asc", stock: "asc" });

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

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const column = sortOrder.price === "asc" ? "price" : "stock";
      const order = sortOrder[column];
      if (order === "asc") {
        return a[column] < b[column] ? -1 : 1;
      } else {
        return a[column] > b[column] ? -1 : 1;
      }
    });
  }, [filteredProducts, sortOrder]);

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
