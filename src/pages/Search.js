import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { search } from "../actions/auth";

const Search = () => {
  const { user: currentUser, users } = useSelector((state) => state.auth);
  const st = useSelector((state) => state.auth);
  const form = useRef();
  const checkBtn = useRef();

  const [searchKey, setSearchKey] = useState("");
  const [usersArray, setUsersArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(search(searchKey, currentUser.accessToken))
        .then(() => {
          setUsersArray(users);
          console.log(st);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const onChangeSearch = (e) => {
    const searchKey = e.target.value;
    setSearchKey(searchKey);
  };

  return (
    <div className="col-md-12">
      <div>
        <Form onSubmit={handleSearch} ref={form}>
          {
            <div>
              <div className="form-group">
                <label htmlFor="search">Search Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="searchKey"
                  value={searchKey}
                  onChange={onChangeSearch}
                />
              </div>
            </div>
          }
          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Search</span>
            </button>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        <div>
          <div className="col-md-12">
            <h2>Search Result</h2>
            {usersArray && usersArray.length > 0 ? (
              usersArray.map((user) => (
                <p key={user._id}>
                  <strong>{user.name}</strong> {user.email}
                </p>
              ))
            ) : (
              <p>Search result appear here</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
