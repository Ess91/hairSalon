import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="productCard">
      <div className="productMedia">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="productCategory">{product.category}</span>
      </div>
      <div className="productInfo">
        <h3>{product.name}</h3>
        {product.length && <span className="productLength">{product.length}</span>}
        <div className="productFooter">
          <span className="productPrice">£{product.price}</span>
          <button className="btn small caramel" onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}
