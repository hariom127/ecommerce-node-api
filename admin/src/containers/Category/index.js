import React, { useEffect } from "react";
import Layout from "../../components/Layout/index";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getCategory } from "../../redux/action/categoryAction";

const Category = () => {
  const categoryState = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const renderCategories = (categories) => {
    let categoriesArr = [];

    for (let category of categories) {
      categoriesArr.push(<li key={category._id}>{category.name}</li>);
    }

    return categoriesArr;
  };

  return (
    <Layout sidebar>
      <Card>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>

          <ul>{renderCategories(categoryState.categories)}</ul>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Category;
