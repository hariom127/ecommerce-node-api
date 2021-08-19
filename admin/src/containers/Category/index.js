import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/index";
import { Container, Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, getCategory } from "../../redux/action/categoryAction";
import Input from "../../components/UI/Input/index";

const Category = () => {
  const categoryState = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("categoryImage", categoryImage);
    form.append("parentId", parentCategoryId);
    dispatch(addCategory(form));
    // const cat = {
    //   categoryName,
    //   categoryImage,
    //   parentCategoryId,
    // };
    // console.log(cat);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const renderCategories = (categories) => {
    let categoriesArr = [];
    for (let category of categories) {
      categoriesArr.push(
        <li key={category._id}>
          {category.name}
          {category.chieldren.length > 0 ? (
            <ul>{renderCategories(category.chieldren)}</ul>
          ) : null}
        </li>
      );
    }
    return categoriesArr;
  };

  const createCategoryList = (categories, options = []) => {
    if (categories.length > 0) {
      for (let category of categories) {
        options.push({ value: category._id, name: category.name });
        if (category.chieldren.length > 0) {
          createCategoryList(category.chieldren, options);
        }
      }
    }
    return options;
  };

  const handelCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <Layout sidebar>
      <>
        <Container>
          <Row>
            <Col md={12}>
              <div className="d-flex justify-content-between">
                <h3>Categories</h3>
                <Button onClick={handleShow}>Add</Button>
              </div>
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Card.Title>List</Card.Title>
                  {console.log(categoryState, "from view")}
                  {categoryState.categories.length > 0 ? (
                    <ul>{renderCategories(categoryState.categories)}</ul>
                  ) : (
                    ""
                  )}

                  {/* {JSON.stringify(createCategoryList(categoryState.categories))} */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              value={categoryName}
              placeholder={`Category Name`}
              onChange={(e) => setCategoryName(e.target.value)}
            />

            <select
              className="form-control"
              onChange={(e) => setParentCategoryId(e.target.value)}
            >
              <option>-Choose Parent-</option>
              {createCategoryList(categoryState.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            {/* <Input
              value={categoryImage}
              type={`file`}
              onChange={handelCategoryImage}
            /> */}
            <input
              type="file"
              name="categoryImage"
              onChange={handelCategoryImage}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Layout>
  );
};

export default Category;
