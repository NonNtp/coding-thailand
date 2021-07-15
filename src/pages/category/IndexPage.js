import React, { useState, useRef, useEffect } from "react";
import { Spinner, Table, Button } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import axios from "axios";

const IndexPage = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);
  const history = useHistory();
  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/category`,
        {
          cancelToken: cancelToken.current.token,
        }
      );
      setCategory(resp.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    getData();

    return () => {
      cancelToken.current.cancel();
    };
  }, []);

  if (loading === true) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>{error.response.data.message}</p>
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <Button
              className="mb-3"
              variant="success"
              onClick={() => history.push("/category/create")}
            >
              Add
            </Button>
            <h2>Category Page</h2>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Tools</th>
                </tr>
              </thead>
              <tbody>
                {category.map((c, index) => {
                  return (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>
                        <Button
                          className="ml-2"
                          variant="outline-info"
                          onClick={() => history.push("/category/edit/" + c.id)}
                        >
                          <BsPencil />
                        </Button>
                        <Button
                          className="ml-2"
                          variant="outline-danger"
                          onClick={async () => {
                            const isConfirm = window.confirm(
                              `Are you sure to delete ${c.name} ? `
                            );
                            if (isConfirm) {
                              const resp = await axios.delete(
                                `https://api.codingthailand.com/api/category/${c.id}`
                              );
                              alert(resp.data.message);
                              history.go(0);
                            }
                          }}
                        >
                          <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>{" "}
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
