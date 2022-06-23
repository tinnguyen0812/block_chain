import React from "react";
import { Link } from "react-router-dom";

// Import Image
import Logo from "../../assets/img/logo.png";

class InvoiceView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: {},
      total: 0,
    };
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/wallet/getWallet/${localStorage.getItem(
        "idWallet",
      )}`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ wallet: data.wallet });
      });
  }

  render() {
    const { wallet } = this.state;
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
                      Create wallet
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Create wallet</h2>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb */}

        {/* Page Content */}
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="invoice-content">
                  <div className="invoice-item"></div>
                  {/* Invoice Item */}
                  <div className="invoice-item">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="invoice-info">
                          <strong className="customer-text">
                            Wallet information
                          </strong>
                          <p className="invoice-details invoice-details-two">
                            Public key (use for wallet address){" "}
                          </p>
                          <p className="invoice-details invoice-details-two crop">
                            {" "}
                            Public key: {wallet.publicKey}
                          </p>
                          <p className="invoice-details invoice-details-two">
                            {" "}
                            Private key (use for login and sign your
                            transaction, DO NOT SHARE THIS TO ANYONE)
                          </p>
                          <p className="invoice-details invoice-details-two">
                            {" "}
                            Private Key: {wallet.privateKey}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Invoice Item */}

                  {/* Invoice Information */}
                  {/* Invoice Information */}
                  <Link to="/login">Back to login</Link>
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
export { InvoiceView };
