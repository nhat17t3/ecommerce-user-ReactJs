import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";
import { getListCategory, getListProductByPage } from "../../actions";
import {
  addItemToCart,
  addToCart,
  getCart,
  getCartByServer,
  increaseItemQuantity,
} from "../../actions/cart";
import Layout from "../../layouts/Layout";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Shop_Page = () => {
  useEffect(() => {
    dispatch(getCart());
    dispatch(getCartByServer());
  }, []);

  // get all product on cart from redux store
  const productsOnCart = useSelector((state) => state.cart.products);
  // add to cart function
  const addProductToCart = (item) => {
    let product = item;
    let itemQty = product.quantity;
    let productExists = false;
    let productIndex = -1;
    productsOnCart.forEach((p, idx) => {
      if (product.id === p.id) {
        productExists = true;
        productIndex = idx;
        product = p;
      }
    });
    if (productExists) {
      if (itemQty === undefined) {
        itemQty = 1;
      } else {
        itemQty = product.quantity;
      }
      toast.success("Sản phẩm đã có trong giỏ hàng");
      dispatch(
        increaseItemQuantity(productIndex, product, (itemQty = itemQty + 1))
      );
    } else {
      dispatch(addItemToCart(product));
      toast.success("Thêm vào giỏ hàng thành công");
    }
    // to add the product in localstorage
    dispatch(addToCart());
  };
  ///////////////////////
  const dispatch = useDispatch();
  const history = useHistory();
  let query = useQuery();
  // const [reRender, setReRender] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [searchFeild, setSearchFeild] = useState(query.get("key"));

  useEffect(() => {
    dispatch(getListCategory());
  }, []);
  const listCategory = useSelector((state) => state.category.listCategory);

  useEffect(() => {
    const formData = new FormData();
    formData.append("pageNumber", currentPage - 1);
    formData.append("pageSize", 9);
    dispatch(getListProductByPage(formData));
  }, [currentPage]);

  const productStore = useSelector((state) => state.product);
  const listProduct = useSelector((state) => state.product.listProduct);
  var iNewProducts = listProduct.map((product, index) => {
    return Object.assign({}, product, { quantity: 1 });
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);

    const formData = new FormData();
    formData.append("pageNumber", currentPage - 1);
    formData.append("pageSize", pageSize);
    formData.append("name", searchFeild);
    dispatch(getListProductByPage(formData));
  };
  const handlePageChange = async (event, pageNumber) => {
    console.log(pageNumber, "page");
    setCurrentPage(pageNumber);
  };
  const [reRender, setReRender] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1200000]); // Giá trị mặc định
  const handleCheckboxChange = (id) => {
    // Kiểm tra xem ID đã tồn tại trong danh sách hay chưa
    if (selectedIds.includes(id)) {
      // Nếu tồn tại, loại bỏ ID khỏi danh sách
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      // Nếu không tồn tại, thêm ID vào danh sách
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("pageNumber", currentPage - 1);
      formData.append("pageSize", pageSize);
      formData.append("categoryIds", selectedIds);
      formData.append("minPrice", priceRange[0]);
      formData.append("maxPrice", priceRange[1]);

      // Gọi dispatch và đợi cho việc lấy dữ liệu hoàn tất
      await dispatch(getListProductByPage(formData));
    };

    fetchData();
  }, [priceRange, selectedIds, dispatch]);

  return (
    <Layout>
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">
                <a href="#">Shop</a>
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
                <div className="toolbox">
                  <div className="toolbox-left">
                    <div className="toolbox-info">
                      {/* Showing <span>9 of 56</span> Products */}
                    </div>
                    {/* End .toolbox-info */}
                  </div>
                  {/* End .toolbox-left */}
                  <div className="toolbox-right">
                    <div className="toolbox-sort">
                      <label htmlFor="sortby">Sort by:</label>
                      <div className="select-custom">
                        <select
                          name="sortby"
                          id="sortby"
                          className="form-control"
                        >
                          <option value="popularity" selected="selected">
                            Most Popular
                          </option>
                          <option value="rating">Most Rated</option>
                          <option value="date">Date</option>
                        </select>
                      </div>
                    </div>
                    {/* End .toolbox-sort */}
                  </div>
                  {/* End .toolbox-right */}
                </div>
                {/* End .toolbox */}
                <div className="products mb-3">
                  <div className="row justify-content-center">
                    {iNewProducts?.map((item) => (
                      <div className="col-6 col-md-4 col-lg-4">
                        <div className="product">
                          <figure className="product-media">
                            <Link to={`/product-detail/${item.id}`}>
                              <img
                                src={item.images[0]?.imagePath}
                                alt="Product image"
                                className="product-image"
                              />
                            </Link>
                            {/* <div className="product-action-vertical">
      <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
        <span>add to wishlist</span>
      </a>
      <a href="#" className="btn-product-icon btn-compare" title="Compare">
        <span>Compare</span>
      </a>
      <a
        href="#"
        className="btn-product-icon btn-quickview"
        title="Quick view"
      >
        <span>Quick view</span>
      </a>
    </div> */}
                            {/* End .product-action-vertical */}
                            <div className="product-action">
                              <button
                                href="#"
                                className="btn-product btn-cart"
                                title="Add to cart"
                                onClick={() => addProductToCart(item)}
                              >
                                <span>Thêm vào giỏ</span>
                              </button>
                            </div>
                            {/* End .product-action */}
                          </figure>
                          {/* End .product-media */}
                          <div className="product-body">
                            <div className="product-cat">
                              <a href="#">{item.category.name}</a>
                            </div>
                            {/* End .product-cat */}
                            <h3 className="product-title">
                              <Link to={`/product-detail/${item.id}`}>
                                {item.name}
                              </Link>
                            </h3>
                            {/* End .product-title */}
                            <div className="product-price">
                              {item.price} VNĐ
                            </div>
                            {/* End .product-price */}
                            <div className="ratings-container">
                              <div className="ratings">
                                <div
                                  className="ratings-val"
                                  style={{ width: "0%" }}
                                />
                                {/* End .ratings-val */}
                              </div>
                              {/* End .ratings */}
                              {/* <span className="ratings-text">( 6 Reviews )</span> */}
                            </div>
                            {/* End .rating-container */}
                          </div>
                          {/* End .product-body */}
                        </div>

                        {/* End .product */}
                      </div>
                    ))}

                    {/* End .col-sm-6 col-lg-4 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .products */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginTop: "16px",
                  }}
                >
                  <Stack spacing={2}>
                    <Pagination
                      count={productStore.totalPages}
                      color="primary"
                      page={currentPage}
                      onChange={handlePageChange}
                    />
                  </Stack>
                </div>
              </div>
              {/* End .col-lg-9 */}
              <aside className="col-lg-3 order-lg-first">
                <div className="sidebar sidebar-shop">
                  <div className="widget widget-clean">
                    <label>Filters:</label>
                    <a href="#" className="sidebar-filter-clear">
                      Clean All
                    </a>
                  </div>
                  {/* End .widget widget-clean */}
                  <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                      <a
                        data-toggle="collapse"
                        href="#"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-1"
                      >
                        Danh mục sản phẩm
                      </a>
                    </h3>
                    {/* End .widget-title */}
                    <div className="collapse show" id="widget-1">
                      <div className="widget-body">
                        <div className="filter-items filter-items-count">
                          {listCategory?.map((item) => (
                            <div key={item.id} className="filter-item">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id={item.id}
                                  checked={selectedIds.includes(item.id)}
                                  onChange={() => handleCheckboxChange(item.id)}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={item.id}
                                >
                                  {item.name}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* End .filter-items */}
                      </div>
                      {/* End .widget-body */}
                    </div>
                    {/* End .collapse */}
                  </div>
                  {/* End .widget */}
                  <div className="widget widget-collapsible">
                    <h3 className="widget-title">
                      <a
                        data-toggle="collapse"
                        href="#"
                        role="button"
                        aria-expanded="true"
                        aria-controls="widget-5"
                      >
                        Price
                      </a>
                    </h3>
                    {/* End .widget-title */}
                    <div className="collapse show" id="widget-5">
                      <div className="filter-price-text">
                        Price Range:
                        <span id="filter-price-range">
                          {priceRange[0]}VNĐ - {priceRange[1]}VNĐ
                        </span>
                      </div>

                      <Slider
                        min={0}
                        max={1200000}
                        range
                        value={priceRange}
                        onChange={handlePriceChange}
                        marks={{
                          0: "0",
                          300000: "300.000",
                          600000: "600.000",
                          900000: "900.000",
                          1200000: "1200.000",
                        }}
                        step={300000}
                      />
                    </div>
                    {/* End .collapse */}
                  </div>
                  {/* End .widget */}
                </div>
                {/* End .sidebar sidebar-shop */}
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
};

export default Shop_Page;
