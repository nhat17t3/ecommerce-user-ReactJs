import React, { useEffect } from "react";
// import MultiSelect from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";
import { getListCategoryArticle } from "../../actions";
import { getArticleById } from "../../actions/article.actions";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";
import Moment from "react-moment";

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

  const findItem = useSelector((state) => state.article.article);

  return (
    <>
      <MainHeader />
      <div className="padding-y">
        <div className="container">
          <article className="blog-post mx-5">
            <h2 className="blog-post-title">{findItem.name}</h2>
            <p className="blog-post-meta">
              <Moment format="YYYY-MM-DD HH:mm">{findItem.createdAt}</Moment>
            </p>
            <p>{findItem.shortDesc}</p>
            <hr />

            <div
              dangerouslySetInnerHTML={{
                __html: findItem.description,
              }}
            />
          </article>
        </div>
      </div>
      <MainFooter />
    </>
  );
}

export default ArticleDetail;
