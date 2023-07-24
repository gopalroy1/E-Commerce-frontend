import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import BaseUrl from "../../Axios/BaseUrl";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =  useNavigate();

  async function handleRegister(e) {

    e.preventDefault();
    if (!name || !email || !password || !address || !phone) {
      alert("Fill form correctly");
      return;
    }
    try {
      let url = "http://localhost:3005/api/user/add";
      // http://localhost:3005/api/user/login
      BaseUrl.post(url, {
        name,
        email,
        password,
        address,
        phone,
      })
        .then((dat) => {
          console.log(dat.data);
          if (dat.data.status === "Passed") {
            // alert(dat.data.message);
            toast.success(dat.data.message);
            navigate("/login")
          } else {
            toast.error("Not Registered");
          }
        })
        .catch((dat) => {
          let alertMsg = dat.response.data.message;
          if (alertMsg) {
            toast.error(alertMsg);
          }
          console.log("error ho gya posting me", dat);
        });
    } catch (error) {
      toast.error("Not registered");
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className="Register">
        <form className="register-form">
          <h2>User Register</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="adress"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setAdress(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            onClick={handleRegister}
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
