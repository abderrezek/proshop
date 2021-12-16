import React, { useEffect, useState } from "react";
import {
  Loader,
  Message,
  Header,
  Table,
  Button,
  Confirm,
  Menu,
  Icon,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../redux/actions/productActions";
import { productActionsTypes } from "../redux/actions/actionsTypes";

const ProductsListScreen = ({ history, match }) => {
  const [open, setOpen] = useState(false);
  const [idProduct, setIdProduct] = useState(null);
  const [showMsg, setShowMsg] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const dispatch = useDispatch();

  const {
    loading,
    products: { products, pages },
    error,
  } = useSelector((state) => state.productList);

  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadDelete,
    success,
    error: errDelete,
    message: msgDelete,
  } = useSelector((state) => state.productDelete);

  const {
    loading: loadCreate,
    success: succCreate,
    error: errCreate,
    product: productCreate,
  } = useSelector((state) => state.productCreate);

  useEffect(() => {
    if (match.params.page) {
      if (match.params.page > 0) {
        setPage(parseInt(match.params.page));
      } else {
        history.push(`/admin/products/${match.params.page * -1}`);
      }
    }
  }, [match.params.page, history]);

  useEffect(() => {
    dispatch({ type: productActionsTypes.PRODUCT_CREATE_RESET });

    if (!userInfo && !userInfo.isAdmin) {
      history.push("/login");
    }

    if (succCreate) {
      history.push(`/admin/product/${productCreate._id}/edit`);
    } else {
      dispatch(listProducts(page, limit));
    }
  }, [
    dispatch,
    userInfo,
    history,
    success,
    page,
    limit,
    succCreate,
    productCreate,
  ]);

  // MAke time for hidden message & clear it
  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch({ type: productActionsTypes.PRODUCT_DELETE_RESET });
      setShowMsg(false);
    }, 2000);

    return () => clearInterval(timer);
  }, [dispatch, msgDelete]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    setShowMsg(true);
    setOpen(false);
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const nextPage = () => {
    let p = (page + 1) % products.pages;
    setPage(p);
    history.push(`/admin/products/${p}`);
  };

  const prevPage = () => {
    let p = (page - 1) % products.pages;
    setPage(p);
    history.push(`/admin/products/${p}`);
  };

  if (loading) {
    return <Loader text="Loading..." />;
  }

  if (error) {
    return <Message negative header="Error" content={error} />;
  }

  return (
    <>
      <Header as="h1" color="black" textAlign="center">
        My Products
      </Header>
      <div>
        <Button
          icon="add"
          content="Create Product"
          onClick={createProductHandler}
        />
      </div>

      {errDelete && (
        <Message negative header="Delete Product" content={errDelete} />
      )}
      {msgDelete && msgDelete.message && showMsg && (
        <Message positive header="Delete Product" content={msgDelete.message} />
      )}

      <Table loading={loading ? "true" : "false"} size="small" celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>ACTIONS</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products &&
            products.map((product, index) => (
              <Table.Row key={index}>
                <Table.Cell>{product._id}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.brand}</Table.Cell>
                <Table.Cell>
                  <Button
                    as={Link}
                    to={`/admin/product/${product._id}/edit`}
                    size="small"
                    icon="edit"
                    color="blue"
                  />
                  <Button
                    onClick={() => {
                      setOpen(true);
                      setIdProduct(product._id);
                    }}
                    loading={idProduct === product._id && loadDelete}
                    size="small"
                    icon="trash alternate"
                    color="red"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Menu floated="right" pagination>
                {pages && pages > 1 && (
                  <Menu.Item as="a" onClick={prevPage} icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                )}

                {pages &&
                  Array.from(Array(pages).keys()).map((p) => (
                    <Menu.Item
                      active={p + 1 === page}
                      as={Link}
                      to={`/admin/products/${p + 1}`}
                      key={p}
                    >
                      {p + 1}
                    </Menu.Item>
                  ))}

                {pages && pages > 1 && (
                  <Menu.Item as="a" onClick={nextPage} icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                )}
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>

      <Confirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => deleteHandler(idProduct)}
      />
    </>
  );
};

export default ProductsListScreen;
