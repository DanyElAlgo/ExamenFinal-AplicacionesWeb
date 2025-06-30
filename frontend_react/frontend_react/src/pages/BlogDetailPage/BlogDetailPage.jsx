import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext";
import { useAuthContext } from "../../context/AuthContext";
import { LAYOUT_CONFIG } from "../../services/conf/LayoutConfigConst";
import FormButton from "../../components/formButton/FormButton";
import { formatDateTime } from "../../utils/Time";
import blogAPI from "../../services/Api/BlogAPI";

import "./blogDetailPage.css";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const { updateLayout } = useLayout();
  const { token, userId } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef(null);
  const navigate = useNavigate();

  const getBlog = async () => {
    const filteredBlog = await blogAPI.getBlogById(id);
    setBlog(filteredBlog);

    LAYOUT_CONFIG.BLOG_DETAIL_PAGE.backgroundUrl = filteredBlog.imageUrl;
    LAYOUT_CONFIG.BLOG_DETAIL_PAGE.title = "";
    updateLayout(LAYOUT_CONFIG.BLOG_DETAIL_PAGE);
  };

  const getPreview = (content) => {
    const text = content.split("\n");
    const lines = [];

    for (let line of text) {
      let newLine = "";

      if (line.startsWith("# ")) {
        newLine = `<h2 class="blog-detail-page__description--title">${line.substring(2)}</h1>`;
      } else if (line.trim() === "" || line.trim() === "---") {
        newLine = `<br>`;
      } else {
        newLine = `<p class="blog-detail-page__description--paragraph">${line}</p>`;
      }

      lines.push(newLine);
    }

    return lines.join("");
  };

  const saveBlog = async() => {
    
    try {
      await blogAPI.saveBlog(blog.id, blog.title, blog.content);
      navigate("/blog");
    }
    catch(error) {
      console.error(error.message);
    }

  }

  useEffect(() => {
    getBlog();
  }, []);


  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }, [isEditing]);

  if (!blog) {
    return <p>Cargando..</p>;
  }

  return (
    <section className="blog-detail-page">
      <div className="blog-detail-page__header">
        <div className="blog-detail-page__header-date">
          <div className="blog-detail-page__date-logo">
            <img
              src="/assets/img/diamondIcon.svg"
              alt="diamond"
              className="blog-detail-page__logo-diamond"
            />
            <div className="blog-detail-page__logo-line"></div>
          </div>

          <p className="blog-detail-page__date-content">
            {formatDateTime(new Date(blog.date))}
          </p>

          <div className="blog-detail-page__date-logo">
            <div className="blog-detail-page__logo-line"></div>
            <img
              src="/assets/img/diamondIcon.svg"
              alt="diamond"
              className="blog-detail-page__logo-diamond"
            />
          </div>
        </div>

        <h1
          className="blog-detail-page__header-title"
          contentEditable={token && userId == blog.authorId}
          suppressContentEditableWarning={true}
          onBlur={(e) =>
            setBlog((prevBlog) => ({ ...prevBlog, title: e.target.textContent }))
          }
        >
          {blog.title}
        </h1>

        <div className="blog-detail-page__logo">
          <img
            src="/assets/img/diamondIcon.svg"
            alt="diamond"
            className="blog-detail-page__logo-diamond"
          />
          <div className="blog-detail-page__logo-line"></div>
          <img
            src="/assets/img/diamondIcon.svg"
            alt="diamond"
            className="blog-detail-page__logo-diamond"
          />
        </div>
      </div>

      <div className="blog-detail-page__description">
        {isEditing ? (
          <textarea
            ref={textAreaRef}
            className="blog-detail-page__description-editable"
            value={blog.content}
            onChange={(e) =>
              setBlog((prevBlog) => ({ ...prevBlog, content: e.target.value }))
            }
            onBlur={() => setIsEditing(false)}
            onInput={() => textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"}
          />
        ) : (
          <div
            className="blog-detail-page__description-preview"
            onClick={() => {
              if (!token || userId != blog.authorId) {
                return;
              }
              
              setIsEditing(true);
            }}
            dangerouslySetInnerHTML={{ __html: getPreview(blog.content) }}
          />
        )}

        <div className="blog-detail-page__description-author">
          Author: {blog.users.name}
        </div>

        {token && userId == blog.authorId && (
          <FormButton title="Save" onClick={saveBlog}></FormButton>
        )}
      </div>
    </section>
  );
}

export default BlogDetail;