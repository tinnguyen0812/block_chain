import React from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";

// Import Image
import LoginImg from "../../assets/img/ethereum-1.jpg";

// Import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { AirlineSeatIndividualSuiteSharp } from "@material-ui/icons";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      submitted: false,
      redirect: false,
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    console.log(this.state);
    fetch("http://localhost:3000/wallet/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        privatekey: this.state.username,
      }),
    })
      .then(
        (res) =>
          res.json().then((res) => {
            console.log(res);
            if (res.address) {
              alert(res.msg);
              localStorage.setItem("address", res.address);
              localStorage.setItem("private", res.private);
              this.setState({ redirect: true });
            } else {
              alert(res.msg);
            }
          }),
        // ,<Redirect push to="http://localhost:3002/nailsalon" />
      )
      .catch((res) => {
        console.log(res);
      });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/edit-service" />;
    }
    return (
      <div>
        {/* Page Content */}
        <div className="account-page">
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  {/* Login Tab Content */}
                  <div className="account-content">
                    <div className="row align-items-center justify-content-center">
                      <div className="col-md-7 col-lg-6 login-left">
                        <img
                          src={LoginImg}
                          className="img-fluid"
                          alt="DreamsEdu Login"
                        />
                      </div>
                      <div className="col-md-12 col-lg-6 login-right">
                        <div className="login-header">
                          <h3>Đăng nhập</h3>
                        </div>
                        <form action="/index" onSubmit={this.handleSubmit}>
                          <div className="form-group form-focus">
                            <input
                              type="password"
                              className="form-control floating"
                              value={this.state.username}
                              onChange={this.handleChangeUsername}
                            />
                            <label className="focus-label">
                              Enter your private ky
                            </label>
                          </div>
                          <button
                            className="btn btn-primary btn-block btn-lg login-btn"
                            type="submit"
                            onClick={this.login}
                          >
                            Login
                          </button>
                          <div className="text-center dont-have">
                            Don't have wallet?{" "}
                            <Link to="/register">Register</Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* Login Tab Content */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Page Content */}
      </div>
    );
  }
}
export { Login };
