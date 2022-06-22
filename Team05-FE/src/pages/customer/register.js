import React from "react";
import { Link, Redirect } from "react-router-dom";

// Import Image
import LoginImg from "../../assets/img/ethereum-1.jpg";

// Import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
      submitted: false,
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    console.log(this.state);
    fetch("http://localhost:3000/wallet", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        (res) =>
          res.json().then((res) => {
            console.log(res);
            if (res.user) {
              alert("Create wallet success!");
              this.setState({ redirect: true });
              localStorage.setItem("idWallet", res.user._id);
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
      return <Redirect to="/invoice-view" />;
    }
    return (
      <div>
        {/* Page Content */}
        <div className="account-page">
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  {/* Account Content */}
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
                          <h3>Crate wallet</h3>
                        </div>

                        {/* Register Form */}
                        <form action="/" onSubmit={this.handleSubmit}>
                          <div className="terms-and-policy pt-2 pb-2">
                            <input
                              type="checkbox"
                              required
                              name="checkbox"
                              defaultValue="check"
                              id="agree"
                            />
                            <span className="agree">
                              Accept with{" "}
                              <span className="terms">
                                <Link to="/terms-condition" target="_blank">
                                  term condition
                                </Link>{" "}
                                và{" "}
                                <Link to="/privacy-policy" target="_blank">
                                  security and privacy policy.
                                </Link>{" "}
                              </span>
                            </span>
                          </div>
                          <button
                            className="btn btn-primary btn-block btn-lg login-btn"
                            type="submit"
                          >
                            Create wallet
                          </button>
                        </form>
                        {/* Register Form */}
                      </div>
                    </div>
                  </div>
                  {/* Account Content */}
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
export { Register };
