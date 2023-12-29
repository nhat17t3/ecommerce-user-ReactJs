import React, { useEffect } from "react";
// import MultiSelect from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";
import { getListCategoryArticle } from "../../actions";
import { getArticleById } from "../../actions/article.actions";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";

function ArticleDetail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { blogId } = useParams();

  useEffect(() => {
    dispatch(getListCategoryArticle());
  }, []);

  const listCate = useSelector(
    (state) => state.categoryArticle.listCategoryArticle
  );

  useEffect(() => {
    dispatch(getArticleById(+blogId));
  }, []);

  const item = useSelector((state) => state.article.article);

  return (
    <>
      <MainHeader />
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Bài viết</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Chi tiết
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <article className="entry single-entry">
                  {/* <figure className="entry-media">
              <img src={item.imagePath} />
            </figure> */}
                  {/* End .entry-media */}
                  <div className="entry-body">
                    <div className="entry-meta">
                      <span className="entry-author">
                        by <a href="#">Hoàng Long Nhật</a>
                      </span>
                      <span className="meta-separator">|</span>
                      <a href="#">{item.createdAt}</a>
                    </div>
                    {/* End .entry-meta */}
                    <h2 className="entry-title">{item.name}</h2>
                    {/* End .entry-title */}
                    <div className="entry-cats">
                      trong {item.categoryArticle?.name}
                    </div>
                    {/* End .entry-cats */}
                    <div className="entry-content editor-content">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.content,
                        }}
                      />
                    </div>
                    {/* End .entry-content */}
                  </div>
                  {/* End .entry-body */}
                </article>
                {/* End .entry */}
              </div>
              {/* End .col-lg-9 */}
              {/* End .col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .page-content */}
      </main>

      <MainFooter />
    </>
  );
}

export default ArticleDetail;
