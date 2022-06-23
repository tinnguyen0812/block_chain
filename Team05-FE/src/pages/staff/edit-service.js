import React from "react";
import { Link } from "react-router-dom";

// Import Sidebar
import { StaffSidebar } from "./staff-sidebar";

import { Tabs, Tab, Modal } from "react-bootstrap";

// Import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faEdit,
  faPlusCircle,
} from "@fortawesome/fontawesome-free-solid";

class EditService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      services: [],
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    fetch(
      `http://localhost:3000/wallet/getTrans/${localStorage.getItem(
        "address",
      )}`,
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            services: result.transaction,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }
  handleButtonClick(value) {
    localStorage.setItem("sv_id", value);
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
                      Wallet
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Wallet and transaction history</h2>
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
                <StaffSidebar />
              </div>
              <div className="col-md-7 col-lg-8 col-xl-9">
                <div className="appointments">
                  <Link to="/add-service">
                    <h4 className="card-title d-flex justify-content-between">
                      <a className="edit-link">
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />{" "}
                        Send ETH
                      </a>
                    </h4>
                  </Link>
                  {/* Service */}
                  {this.state.services.map((service) => (
                    <div className="appointment-list">
                      <div className="profile-info-widget">
                        <div className="profile-det-info">
                          <h3>Send to: {service.toAddress}</h3>
                          <div className="customer-details">
                            <h5>Amount: {service.value}</h5>
                            <h5>Timestamp: {service.date}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="appointment-action"></div>
                    </div>
                  ))}
                  {/* Service */}
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
export { EditService };
