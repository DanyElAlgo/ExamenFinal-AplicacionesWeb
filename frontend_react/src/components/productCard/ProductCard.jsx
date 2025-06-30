import "./productCard.css";

function ProductCard({ id, title, description, src, price, vegetarian, onCardClick, onAddClick }) {

  const handleCardClick = () => {
    onCardClick();
  }

  const handleAddClick = (event) => {
    event.stopPropagation();
    onAddClick();
  }

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card__img-wrapper">
        <img alt="Product" src={src} className="product-card__img" />

        <div className="product-card__add-button" onClick={handleAddClick}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8334 6.83171H6.83335V11.8317H5.16669V6.83171H0.166687V5.16504H5.16669V0.165039H6.83335V5.16504H11.8334V6.83171Z"
              fill="#272723"
              className="product-card__add-icon-fill"
            />
          </svg>
        </div>
      </div>

      <div className="product-card__content">
        <div className="product-card__header">
          <h5 className="product-card__title">
            { title }
            { vegetarian && (
              <img alt="leaf" src="/assets/img/leaf.svg"></img>
            )}
          </h5>
          <div className="product-card__line"></div>
          <h5 className="product-card__price">${ price }</h5>
        </div>
        <p className="product-card__description">{ description }</p>
      </div>
    </div>
  );
}

export default ProductCard;
