import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoad, clearErrors, profileUpdate } from "../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../constant/userConstant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateProfile.css";
import MetaData from "../layout/MetaData";
import Loader from "../Loader/Loader";
const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    dispatch(profileUpdate(myform));
  };

 
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(userLoad());
      navigate("/account")
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error,navigate, isUpdated,user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Update Profile`} />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <h4 className="nameh4">Name</h4>
                  <input
                    value={name}
                    name="name"
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                  />
                </div>
                <div className="updateProfileEmail">
                  <h4 className="emailh4">Email</h4>
                  <input
                    value={email}
                    name="email"
                    type="text"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>

                <input type="submit" className="updateProfileBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
