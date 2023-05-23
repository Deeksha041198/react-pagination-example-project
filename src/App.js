import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();
    setProducts(data.products);
    setTotalPages(data.total / 10);
  };

  const selectPage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <ul className="product__list">
        {products.map((product) => (
          <li key={product.id} className="product__item">
            <img src={product.thumbnail} alt={product.title} />
            <span>{product.title}</span>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {page !== 1 && <span onClick={() => selectPage(page - 1)}>⇦</span>}
        {[...Array(totalPages)].map((_, index) => (
          <span
            className={page === index + 1 ? "pagination__selected" : ""}
            onClick={() => selectPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        {page !== totalPages && (
          <span onClick={() => selectPage(page + 1)}>⇨</span>
        )}
      </div>
    </div>
  );
}
