import { useState, useEffect } from "react";
import { IProduct } from "../../interfaces/Product";

interface ProductFilterProps {
  products: IProduct[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

function ProductFilter({ products, setFilteredProducts }: ProductFilterProps) {
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [filterText, products, setFilteredProducts]);

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Filtrar por nombre del producto"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  );
}

export default ProductFilter;

