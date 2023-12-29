import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { getListArticleByPage, getListCategoryArticle } from "../../actions";
import Layout from "../../layouts/Layout";

ListArticle.propTypes = {};

function ListArticle(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [reRender, setReRender] = useState(true);

  const [searchFeild, setSearchFeild] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    dispatch(getListCategoryArticle());
  }, []);
  const listCategoryArticle = useSelector(
    (state) => state.categoryArticle.listCategoryArticle
  );

  useEffect(() => {
    const formData = new FormData();
    formData.append("pageNumber", currentPage - 1);
    formData.append("pageSize", 5);
    console.log("formData111", formData);
    dispatch(getListArticleByPage(formData));
  }, [currentPage]);

  const articleStore = useSelector((state) => state.article);
  const articles = useSelector((state) => state.article.listArticle);

  const handlePageChange = async (event, pageNumber) => {
    console.log(pageNumber, "page");
    setCurrentPage(pageNumber);
  };
  const handleViewClick = (item) => {
    console.log("View: ", item);
    const viewUrl = `/articles/${item.id}`;
    history.push(viewUrl);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    const formData = new FormData();
    formData.append("pageNumber", currentPage - 1);
    formData.append("pageSize", pageSize);
    formData.append("inputSearch", searchFeild);
    dispatch(getListArticleByPage(formData));
  };

  const handleSearchByCategory = (item) => {
    setCurrentPage(1);
    const formData = new FormData();
    formData.append("pageNumber", currentPage - 1);
    formData.append("pageSize", pageSize);
    formData.append("categoryArticleIds", [`${item.id}`]);
    dispatch(getListArticleByPage(formData));
  };
  return (
    <Layout>
      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">Danh sách bài viết</h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Blog</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Listing
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                {articles?.map((item) => (
                  <article className="entry entry-list">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <figure className="entry-media">
                          <a href="single.html">
                            <img src={item.imagePath} alt="image desc" />
                          </a>
                        </figure>
                        {/* End .entry-media */}
                      </div>
                      {/* End .col-md-5 */}
                      <div className="col-md-7">
                        <div className="entry-body">
                          <div className="entry-meta">
                            <span className="entry-author">
                              by <a href="#">Hoang Long Nhat</a>
                            </span>
                            <span className="meta-separator">|</span>
                            <a href="#">{item.createdAt}</a>
                            <span className="meta-separator">|</span>
                            <a href="#">2 Comments</a>
                          </div>
                          {/* End .entry-meta */}
                          <h2 className="entry-title">
                            <Link to={`/blog-detail/${item.id}`}>
                              {item.name}
                            </Link>
                          </h2>
                          {/* End .entry-title */}
                          <div className="entry-cats">
                            in <a href="#">{item.categoryArticle.name}</a>
                          </div>
                          {/* End .entry-cats */}
                          <div className="entry-content">
                            <p>{item.shortDescription}</p>
                            <Link
                              to={`/blog-detail/${item.id}`}
                              className="read-more"
                            >
                              Tiếp tục đọc
                            </Link>
                          </div>
                          {/* End .entry-content */}
                        </div>
                        {/* End .entry-body */}
                      </div>
                      {/* End .col-md-7 */}
                    </div>
                    {/* End .row */}
                  </article>
                ))}
                {/* End .entry */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "16px",
                  }}
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={articleStore.totalPages}
                      color="primary"
                      page={currentPage}
                      onChange={handlePageChange}
                    />
                  </Stack>
                </div>
              </div>
              {/* End .col-lg-9 */}
              <aside className="col-lg-3">
                <div className="sidebar">
                  <div className="widget widget-search">
                    <h3 className="widget-title">Search</h3>
                    {/* End .widget-title */}
                    <form action="#" onSubmit={handleSearch}>
                      <label htmlFor="ws" className="sr-only">
                        Search in blog
                      </label>
                      <input
                        type="search"
                        className="form-control"
                        name="ws"
                        id="ws"
                        placeholder="Search in blog"
                        required=""
                        value={searchFeild}
                        onChange={(e) => setSearchFeild(e.target.value)}
                      />
                      <button type="submit" className="btn">
                        <i className="icon-search" />
                        <span className="sr-only">Search</span>
                      </button>
                    </form>
                  </div>
                  {/* End .widget */}
                  <div className="widget widget-cats">
                    <h3 className="widget-title">Danh mục bài viết</h3>
                    {/* End .widget-title */}
                    <ul>
                      {listCategoryArticle?.map((item) => (
                        <li>
                          <a
                            href="#"
                            onClick={() => {
                              handleSearchByCategory(item);
                            }}
                          >
                            {item.name}
                            <span></span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* End .widget */}
                  <div className="widget">
                    <h3 className="widget-title">Popular Posts</h3>
                    {/* End .widget-title */}
                    <ul className="posts-list">
                      <li>
                        <figure>
                          <a href="#">
                            <img
                              src="assets/images/blog/sidebar/post-1.jpg"
                              alt="post"
                            />
                          </a>
                        </figure>
                        <div>
                          <span>Nov 22, 2018</span>
                          <h4>
                            <a href="#">Aliquam tincidunt mauris eurisus.</a>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <figure>
                          <a href="#">
                            <img
                              src="assets/images/blog/sidebar/post-2.jpg"
                              alt="post"
                            />
                          </a>
                        </figure>
                        <div>
                          <span>Nov 19, 2018</span>
                          <h4>
                            <a href="#">Cras ornare tristique elit.</a>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <figure>
                          <a href="#">
                            <img
                              src="assets/images/blog/sidebar/post-3.jpg"
                              alt="post"
                            />
                          </a>
                        </figure>
                        <div>
                          <span>Nov 12, 2018</span>
                          <h4>
                            <a href="#">Vivamus vestibulum ntulla nec ante.</a>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <figure>
                          <a href="#">
                            <img
                              src="assets/images/blog/sidebar/post-4.jpg"
                              alt="post"
                            />
                          </a>
                        </figure>
                        <div>
                          <span>Nov 25, 2018</span>
                          <h4>
                            <a href="#">
                              Donec quis dui at dolor tempor interdum.
                            </a>
                          </h4>
                        </div>
                      </li>
                    </ul>
                    {/* End .posts-list */}
                  </div>
                  {/* End .widget */}
                  <div className="widget widget-banner-sidebar">
                    <div className="banner-sidebar-title">ad box 280 x 280</div>
                    {/* End .ad-title */}
                    <div className="banner-sidebar banner-overlay">
                      <a href="#">
                        <img
                          src="assets/images/blog/sidebar/banner.jpg"
                          alt="banner"
                        />
                      </a>
                    </div>
                    {/* End .banner-ad */}
                  </div>
                  {/* End .widget */}
                  <div className="widget">
                    <h3 className="widget-title">Browse Tags</h3>
                    {/* End .widget-title */}
                    <div className="tagcloud">
                      <a href="#">fashion</a>
                      <a href="#">style</a>
                      <a href="#">women</a>
                      <a href="#">photography</a>
                      <a href="#">travel</a>
                      <a href="#">shopping</a>
                      <a href="#">hobbies</a>
                    </div>
                    {/* End .tagcloud */}
                  </div>
                  {/* End .widget */}
                  <div className="widget widget-text">
                    <h3 className="widget-title">About Blog</h3>
                    {/* End .widget-title */}
                    <div className="widget-text-content">
                      <p>
                        Vestibulum volutpat, lacus a ultrices sagittis, mi neque
                        euismod dui, pulvinar nunc sapien ornare nisl.
                      </p>
                    </div>
                    {/* End .widget-text-content */}
                  </div>
                  {/* End .widget */}
                </div>
                {/* End .sidebar */}
              </aside>
              {/* End .col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .page-content */}
      </main>
    </Layout>
  );
}

export default ListArticle;
