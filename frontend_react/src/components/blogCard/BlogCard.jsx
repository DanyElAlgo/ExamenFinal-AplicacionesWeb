import "./blogCard.css";
import { formatDateTime } from "../../utils/Time";

function BlogCard({
  id,
  title,
  description,
  authorName,
  date,
  img,
  favorite,
  showStar,
  onClickFavorite,
  onClickCard
}) {

  const handleClickFavorite = (event) => {
    event.stopPropagation();
    onClickFavorite();
  }

  const handleClickCard = () => {
    onClickCard();
  } 

  return (
    <div className="blog-card" onClick={handleClickCard}>
      <div className="blog-card__image-wrapper">
        <img src={img} alt="blog" className="blog-card__image" />

        { showStar && (
          <div className="blog-card__like-button" onClick={handleClickFavorite}>
            <img src={favorite ? "/assets/img/star.svg" : "/assets/img/star-not-filled.svg" } alt="star" className="blog-card__logo-star" />
          </div>
        )}
  
      </div>

      <div className="blog-card__content">
        <div className="blog-card__date">
          <div className="blog-card__logo">
            <img
              src="/assets/img/diamondIcon.svg"
              alt="diamond"
              className="blog-card__diamond"
            />
            <div className="blog-card__logo-line"></div>
          </div>

          <p className="blog-card__date-content">{ formatDateTime(new Date(date)) }</p>
        </div>

        <h4 className="blog-card__title">
          { title }
        </h4>

        <p className="blog-card__description">
          { description }
        </p>

        <p className="blog-card__author">Author: { authorName }</p>
      </div>
    </div>
  );
}

export default BlogCard;
