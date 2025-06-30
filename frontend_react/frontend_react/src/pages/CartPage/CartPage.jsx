import FormButton from "../../components/formButton/FormButton";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";
import { useLayout } from "../../context/LayoutContext";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/productCard/ProductCard";
import ProductList from "../../services/ProductList";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"
import orderAPI from "../../services/Api/OrderAPI";

import "./cartPage.css";

function CartPage() {

  const { updateLayout } = useLayout();
  const { cart, quantity, addProduct, setSelectedProductId, cleanCart } = useCart();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    updateLayout(LAYOUT_CONFIG.CART_PAGE);
    const data = ProductList.instance.filterById(Object.keys(cart));

    setTotalPrice(getTotalPrice(cart, data));
    setProducts(data ?? []);
  }, [])

  useEffect(() => {
    const data = ProductList.instance.filterById(Object.keys(cart));
    setTotalPrice(getTotalPrice(cart, data));
  }, [quantity])

  const getTotalPrice = (cart, selectedProducts) => {
    let total = 0;

    for(const product of selectedProducts) {
      let price = Number(product.price);
      let productQuantity = Number(cart[product.id]);

      total += (price * productQuantity);
    }

    return total;
  }

  const placeOrder = async () => {
    if(quantity <= 0)
      return;

    if(!token) {
      navigate("/login");
      return;
    }

    const order = {
      total: getTotalPrice(cart, products),
      products: cart
    };

    await orderAPI.placeOrder(order);  

    setProducts([]);
    cleanCart();
  }

  return (
    <section className="cart-page">
      <div className="cart-page__content">
        <div className="cart-page__title">
          <div className="cart-page__category-logo">
            <img
              src="/assets/img/diamondIcon.svg"
              className="cart-page__logo-diamond"
            />
            <div className="cart-page__logo-line"></div>
          </div>

          <h1 className="cart-page__title-content">My cart</h1>

          <div className="cart-page__category-logo">
            <div className="cart-page__logo-line"></div>
            <img
              src="/assets/img/diamondIcon.svg"
              className="cart-page__logo-diamond"
            />
          </div>
        </div>

        <div className="cart-page__information">
          { products.map(product => (
            <ProductCard 
              key={product.id} 
              id={product.id} 
              title={product.name} 
              src={product.imageUrl} 
              price={`${product.price} X ${cart[product.id]} = $${Number(product.price) * Number(cart[product.id])}`} 
              vegetarian={product.vegetarian}
              description={product.description}
              onCardClick={() => {
                updateLayout({ backgroundUrl: product.imageUrl, backgroundWidth: '928px', title: product.name, showAddbutton: true });
                setSelectedProductId(product.id);
              }}
              onAddClick={() => {
                addProduct(product.id);
              }}
            />
          ))}

          { quantity > 0 && (
            <div className="cart-page__total-info-main">
              <div className="cart-page__total-skeleton">

              </div>

              <div className="cart-page__total-info">
                  <h5 className="cart-page__total_title">
                      Total
                  </h5>
                  <div className="cart-page__total-line"></div>
                  <h5 className="cart-page__total-price">
                    { totalPrice }
                  </h5>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="cart-page__form-button">
        <FormButton title="Place order" onClick={placeOrder}></FormButton>
      </div>
    </section>
  );
}

export default CartPage;
