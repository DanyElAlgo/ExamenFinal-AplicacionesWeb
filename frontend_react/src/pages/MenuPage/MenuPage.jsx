import { useEffect, useState } from "react"
import productAPI from "../../services/Api/ProductAPI"
import ProductList from "../../services/ProductList";
import ButtonCustom from "../../components/buttonCustom/ButtonCustom";
import { CATEGORY, CATEGORY_NAME } from "../../services/conf/ProductCategoryConst";
import ProductCard from "../../components/productCard/ProductCard";
import { useLayout } from "../../context/LayoutContext";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";
import { useCart } from "../../context/CartContext";

import "./menuPage.css";

function MenuPage() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { updateLayout } = useLayout();
  const { addProduct, setSelectedProductId } = useCart();

  useEffect(() => {
    updateLayout(LAYOUT_CONFIG.MENU_PAGE);
  }, []);

  const getProducts = async() => {
    const productsResponse = await productAPI.getProducts();
    ProductList.instance.setProducts(productsResponse);
    setCategoryProducts(ProductList.instance.groupByCategories());
  }

  const selectCategory = (categoryId) => {
    const filteredCategoryProducts = ProductList.instance.groupByCategories();
    let filteredObject = filteredCategoryProducts;

    if(categoryId != CATEGORY.ALL) {
      filteredObject = {
        [categoryId]: filteredCategoryProducts[categoryId]
      }
    }

    setCategoryProducts(filteredObject);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="menu-page">
      <div className="menu-page__navbar">
          <ButtonCustom title="All" onClick={() => selectCategory(CATEGORY.ALL)}></ButtonCustom>
          <ButtonCustom title="Maki" onClick={() => selectCategory(CATEGORY.MAKI)}></ButtonCustom>
          <ButtonCustom title="Uramaki" onClick={() => selectCategory(CATEGORY.URAMAKI)}></ButtonCustom>
          <ButtonCustom title="Special Rolls" onClick={() => selectCategory(CATEGORY.SPECIAL_ROLL)}></ButtonCustom>
      </div>
      <div className="menu-page__content">

        {categoryProducts && Object.entries(categoryProducts).map(([key, value]) => (
          <div className="menu-page__category-section" key={key}>
            <div className="menu-page__category-title">
                <div className="menu-page__category-logo">
                    <img src="/assets/img/diamondIcon.svg" className="menu-page__logo-diamond"/>
                    <div className="menu-page__logo-line"></div>
                </div>
                
                <h1 className="menu-page__category-title-content">{ CATEGORY_NAME[key] }</h1>

                <div className="menu-page__category-logo">
                    <div className="menu-page__logo-line"></div>
                    <img src="/assets/img/diamondIcon.svg" className="menu-page__logo-diamond"/>
                </div>
                
            </div>

            <div className="menu-page__category__items">
                { value && value.map(product => (
                  <ProductCard 
                    key={product.id}
                    id={product.id} 
                    title={product.name} 
                    description={product.description}
                    src={product.imageUrl}
                    price={product.price}
                    vegetarian={product.vegetarian}
                    onCardClick={() => {
                      updateLayout({ backgroundUrl: product.imageUrl, backgroundWidth: '928px', title: product.name, showAddbutton: true });
                      setSelectedProductId(product.id);
                    }}
                    onAddClick={() => {
                      addProduct(product.id);
                    }}
                  />
                ))}
            </div>
        </div>
        ))}
      </div>
  </section>
  )
}

export default MenuPage