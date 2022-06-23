import React from "react";
import { Link } from "react-router-dom";

// Import Sidebar
import { StaffSidebar } from "./staff-sidebar";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      products: [],
      dif: 0,
      reward: 0,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleButtonClick(value) {
    localStorage.setItem("pro_id", value);
  }
  componentDidMount() {
    fetch("http://localhost:3000/wallet/getChain")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            products: result.myCoin.chain,
            dif: result.myCoin.difficulty,
            reward: result.myCoin.miningReward,
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        },
      );
  }

  render() {
    return (
      <div>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-12 col-12">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Block list
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Block list</h2>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb */}

        {/* Page Content */}
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
                <h4>Difficulty: {this.state.dif}</h4>
                <h4>Mining reward: {this.state.reward}</h4>
              </div>
              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="appointments">
                  {/* product */}
                  {this.state.products.map((product) => (
                    <div className="appointment-list">
                      <div className="profile-info-widget">
                        <div className="profile-det-info">
                          <div className="customer-details">
                            <h5>Previous Hash: {product.previousHash}</h5>
                            <h5>Block Hash: {product.hash}</h5>
                            <h5>Transaction:</h5>
                            <h5 className="crop">
                              From:{product.transactions[0]?.fromAddress}{" "}
                            </h5>
                            <h5 className="crop">
                              {" "}
                              To :{product.transactions[0]?.toAddress}
                            </h5>
                            <h5 className="crop">
                              {" "}
                              Signature :{product.transactions[0]?.signature}
                            </h5>
                            <h5 className="crop">
                              {" "}
                              Amount :{product.transactions[0]?.value}
                            </h5>
                            <h5 className="crop">
                              {" "}
                              Nonce :{product.transactions[0]?.nonce}
                            </h5>
                            <h5 className="crop">
                              {" "}
                              Date send :{product.transactions[0]?.date}
                            </h5>
                            <h5>
                              Date mine:{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              }).format(product.timestamp)}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* product */}
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
export { EditProduct };
