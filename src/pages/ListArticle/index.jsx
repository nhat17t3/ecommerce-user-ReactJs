import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import {
  getListArticleByPage,
  getListCategoryArticle,
  searchListArticleByName
} from "../../actions";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";


ListArticle.propTypes = {};

function useQuery() {
  const { search } = useLocation();
  
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function ListArticle(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [searchFeild, setSearchFeild] = useState("");
  const [reRender, setReRender] = useState(true);
  
  let query = useQuery();
  
  const [currentPage, setCurrentPage] = useState(
    Number(query.get("page")) || 1
    );
    const limit = 5;
    const [categoryArticleId , setCategoryArticleId] = useState(0);

  useEffect(() => {
    if (searchFeild === "") dispatch(getListArticleByPage(limit, currentPage - 1,categoryArticleId));
    else dispatch(searchListArticleByName(searchFeild, limit, currentPage - 1));
  }, [currentPage,categoryArticleId]);

  const articles = useSelector((state) => state.article.listArticle);
  const count = useSelector((state) => state.article.count);
  var countPage = Math.ceil(count/limit);

  const handlePageChange = (event, pageNumber) => {
    console.log(pageNumber, "page");
    setCurrentPage(pageNumber);
    history.push(`?page=${pageNumber}`);
  };

  //  const checkfilter = (subject, grade, address, article) => {
  //   let checka = false;
  //   let checkb = false;
  //   let checkc = false;
  //   if (subject == "All") checka = true;
  //   else checka = article.subject === subject;
  //   if (grade == "All") checkb = true;
  //   else checkb = article.grade === grade;
  //   if (address == "All") checkc = true;
  //   else checkc = article.address.toLowerCase().includes(address.toLowerCase());
  //   return checka && checkb && checkc;
  // };

  // const handlefillter = (e) => {
  //   console.log(subject, grade, address);

  //   const listfillter = articles.filter((tutor) =>
  //     checkfilter(subject, grade, address, tutor)
  //   );
  //   console.log(listfillter);
  //   setListarticle(listfillter);
  // };

  const handleEditClick = (item) => {
    console.log("Edit: ", item);
    const editUrl = `/articles/edit/${item.id}`;
    // const editUrl = `/articles/add`;

    history.push(editUrl);
  };

  const handleViewClick = (item) => {
    console.log("View: ", item);
    const viewUrl = `/blog-detail/${item.id}`;
    history.push(viewUrl);
  };

  const handleFilterByCategory = (cateId) => {
    // dispatch(filterProductByBrand(brandId , limit, 0));
    // setCategoryArticle(cateId)
    // history.push(`?filterByBrandId=${brandId}&page=${1}`);
    // setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getListCategoryArticle());
  }, []);

  const listCategoryArticle = useSelector((state) => state.categoryArticle.listCategoryArticle);



  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    console.log(searchFeild, "search");
    if(searchFeild.trim()!= ""){
      // history.push(`?search=${searchFeild}&page=${1}`); 
      dispatch(searchListArticleByName(searchFeild, limit, 0));

    } 
    else {
      dispatch(getListArticleByPage(limit, 0));
      history.push('/blog')
    }
  };
  return (
    <Fragment>
      <MainHeader />
      
      {/* <section className="bg-primary py-5">
  <div className="container">
    <h2 className="text-white">Cửa hàng</h2>
  
  </div> 
</section> */}
{/*  */}

<section className="padding-y">
  <div className="container">
  <h2 className="text-center mb-3">Blog</h2>
    <div className="row">
      <aside className="col-lg-3">
        <button className="btn btn-outline-secondary mb-3 w-100  d-lg-none" data-bs-toggle="collapse" data-bs-target="#aside_filter">Show filter</button>
        {/* ===== Card for sidebar filter ===== */}
        <div id="aside_filter" className="collapse card d-lg-block mb-5 " style={{marginTop: "50px"}}>
        <article className="filter-group">
                  <header className="card-header">
                    <a
                      href="#"
                      className="title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse_aside12"
                      aria-expanded="false"
                    >
                      <i className="icon-control fa fa-chevron-down" /> Danh mục
                    </a>
                  </header>
                  <div
                    className="collapse show"
                    id="collapse_aside12"
                    style={{}}
                  >
                    <div className="card-body">
                     
                    <label className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="categoryArticleId"
                          defaultChecked
                          onChange={(e)=>setCategoryArticleId(0)}
                          value={0}
                        />
                        <span className="form-check-label"> All </span>
                      </label>
                      {/* form-check end.// */}
                     {listCategoryArticle.map((element)=>
                     <label className="form-check mb-2">
                     <input
                       className="form-check-input"
                       type="radio"
                       name="categoryArticleId"
                      onChange={(e)=>setCategoryArticleId(e.target.value)}
                      value={element.id}
                       
                     />
                     <span className="form-check-label"> {element.name} </span>
                   </label>
                     )}
                    </div>
                  </div>
                  {/* collapse.// */}
                </article>

        
        </div> {/* card.// */}
        {/* ===== Card for sidebar filter .// ===== */}
      </aside> {/* col .// */}
      <main className="col-lg-9">
        <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
          {/* <strong className="d-block py-2">32 Items found </strong> */}
          <div className="ms-auto">
          <form class="input-group" onSubmit={handleSearch}>
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search..."
                            aria-label="search"
                            aria-describedby="search"
                            name="searchFeild"
                            id="searchFeild"
                            value={searchFeild}
                            onChange={(e) => setSearchFeild(e.target.value)}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn  btn-primary"
                              type="submit"
                            >
                              Search
                            </button>
                          </div>
                        </form>
            {/* <div className="btn-group">
              <a href="#" className="btn btn-light" data-bs-toggle="tooltip" title data-bs-original-title="List view"> 
                <i className="fa fa-bars" />
              </a>
              <a href="#" className="btn btn-light active" data-bs-toggle="tooltip" title data-bs-original-title="Grid view"> 
                <i className="fa fa-th" />
              </a>
            </div> */}
          </div>
        </header>
        {/* ========= content items ========= */}
        
        {articles !== undefined && articles.length > 0
                        ? articles.map((article, index) => {
                          if(article.isActive == true)
                            return (
                              <article className="card card-product-list">
                              <div className="row g-0">
                                <aside className=" col-md-3">
                                  <a href="#" className="img-wrap"> <img src={article.image} /> </a>
                                </aside> {/* col.// */}
                                <div className="col-md-7">
                                  <div className="card-body">
                                    <Link  className="title h5" onClick={()=>handleViewClick(article)}> {article.name}  </Link>
                                    <div className="rating-wrap mb-2">
                                     
                                     
                                      <span className="label-rating text-muted">{article.createdAt}</span>
                                    </div> {/* rating-wrap.// */}
                                    <p> {article.shortDesc}</p>
                                  </div> {/* card-body.// */}
                                </div> {/* col.// */}
                               
                              </div> {/* row.// */}
                            </article>
                            
         );
         else return null;
        })
      : "null"}  
       
        <hr />
        <footer className="d-flex mt-4">
          {/* <div>
            <a href="javascript: history.back()" className="btn btn-light"> « Go back</a>
          </div>
          <nav className="ms-3">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item active" aria-current="page">
                <span className="page-link">2</span>
              </li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav> */}
          <Stack spacing={2}>
                    <Pagination
                      count={countPage}
                      color="primary"
                      page={currentPage}
                      onChange={handlePageChange}
                      // renderItem={(item) => (
                      //   <PaginationItem
                      //     component={Link}
                      //     to={`/products/list${item.page === 1 ? '' : `?page=${item.page}`}`}
                      //     {...item}
                      //   />
                      // )}
                    />
                  </Stack>
        </footer>
        {/* ========= content items .// ========= */}
      </main> {/* col .// */}
    </div> {/* row .// */}
  </div> {/* container .//  */}
</section>




      <MainFooter />
    </Fragment>
  );
}

export default ListArticle;
