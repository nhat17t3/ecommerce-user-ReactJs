import React, { useEffect, useState } from "react";
// import MultiSelect from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";
import { createFeedback, getListCategoryArticle } from "../../actions";
import { getArticleById } from "../../actions/article.actions";
import MainFooter from "../../layouts/footer";
import MainHeader from "../../layouts/header";
import Moment from "react-moment";

function Contact(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { blogId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const send = {
      name,
      email,
      phone,
      title,
      content,
    };

    console.log(send);
    dispatch(createFeedback(send));

    setEmail("");
    setName("");
    setPhone("");
    setTitle("");
    setContent("");
  };

  // useEffect(() => {
  //   dispatch(getListCategoryArticle());
  // }, []);

  // const listCate = useSelector(
  //   (state) => state.categoryArticle.listCategoryArticle
  // );

  // useEffect(() => {
  //   dispatch(getArticleById(+blogId));
  // }, []);

  // const findItem = useSelector((state) => state.article.article);

  return (
    <>
      <MainHeader />
      <div className="padding-y">
        <div className="container">
          <h2 className="text-center mb-5">Liên hệ</h2>
          <div className="row">
            <div className="col-12">
              <div className="row gy-3">
                <div className="col-6">
                  <article className="card card-body">
                    <div className="itemside align-items-center">
                      <div className="aside">
                        <span className="rounded-circle text-secondary icon-md bg-secondary-light">
                          <i className="fa fa-star" />
                        </span>
                      </div>
                      <div className="info">
                        <h6 className="title">Tên: Hoàng Long Nhật</h6>
                        {/* <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit sed do eiusmor
                        </p> */}
                      </div>
                    </div>
                    {/* itemside // */}
                  </article>
                  {/* card.// */}
                </div>
                {/* col // */}
                <div className="col-6">
                  <article className="card card-body">
                    <div className="itemside align-items-center">
                      <div className="aside">
                        <span className="rounded-circle text-warning icon-md bg-warning-light">
                          <i className="fa fa-star" />
                        </span>
                      </div>
                      <div className="info">
                        <h6 className="title">Địa chỉ : Thượng phú phường-Triệu Sơn- Triệu Phong- Quảng Trị</h6>
                       
                      </div>
                    </div>
                    {/* itemside // */}
                  </article>
                  {/* card.// */}
                </div>
                {/* col // */}
                <div className="col-6">
                  <article className="card card-body">
                    <div className="itemside align-items-center">
                      <div className="aside">
                        <span className="rounded-circle text-success icon-md bg-success-light">
                          <i className="fa fa-star" />
                        </span>
                      </div>
                      <div className="info">
                        <h6 className="title">SĐT: 0369621657</h6>
                        {/* <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit sed do eiusmor
                        </p> */}
                      </div>
                    </div>
                    {/* itemside // */}
                  </article>
                  {/* card.// */}
                </div>

                <div className="col-6">
                  <article className="card card-body">
                    <div className="itemside align-items-center">
                      <div className="aside">
                        <span className="rounded-circle text-info icon-md bg-success-light">
                          <i className="fa fa-star" />
                        </span>
                      </div>
                      <div className="info">
                        <h6 className="title">Email: hoanglongnhat0605@gmail.com</h6>
                        {/* <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit sed do eiusmor
                        </p> */}
                      </div>
                    </div>
                    {/* itemside // */}
                  </article>
                  {/* card.// */}
                </div>
                {/* col // */}
              </div>
            </div>

            <div className="col-2"></div>
            <div className="col-8 my-5">
              <form className="row" onSubmit={handleSubmit}>
                <h4 className="text-center">Để lại thông tin phản hồi về cửa hàng</h4>
                <div className="mb-3 col-6">
                  <label className="form-label">Tên</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                {/* col end.// */}
                <div className="mb-3 col-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3 col-6" >
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="number"
                    name="phone"
                    className="form-control"
                    placeholder=""
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3 col-6">
                  <label className="form-label">Tiêu đề</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder=""
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="shortDesc">Nội dung</label>
                  <textarea
                    class="form-control"
                    id="content"
                    rows="4"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  >
                    {content}
                  </textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-warning"
                  style={{ width: "80px", margin: "auto" }}
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
}

export default Contact;
