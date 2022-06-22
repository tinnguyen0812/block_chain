import React from "react";
import { Link } from "react-router-dom";

// Import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faColumns,
  faBoxOpen,
  faLock,
  faSignOutAlt,
  faShoppingCart,
} from "@fortawesome/fontawesome-free-solid";

class StaffSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      address: "",
      balance: 0,
    };
  }
  componentDidMount() {
    fetch(
      `http://localhost:3000/wallet/balance/${localStorage.getItem("address")}`,
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            address: result.add,
            balance: result.balance,
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
  render() {
    return (
      <div>
        {/* Profile Sidebar */}
        <div className="profile-sidebar">
          <div className="widget-profile pro-widget-content">
            <div className="profile-info-widget">
              <div className="profile-det-info">
                <h3>Wallet Information</h3>
              </div>
            </div>
          </div>
          <div className="dashboard-widget">
            <nav className="dashboard-menu">
              <ul>
                <li>
                  <Link to="">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>Blance: {this.state.balance}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* Profile Sidebar */}
      </div>
    );
  }
}
export { StaffSidebar };
