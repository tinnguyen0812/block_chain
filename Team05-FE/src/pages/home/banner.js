import React from "react";
import { Link } from "react-router-dom";

// Import Images

class Banner extends React.Component {
  render() {
    return (
      <div>
        {/* Home Banner */}
        <section className="section-search">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-lg-8">
                <div className="banner-wrapper">
                  <div className="banner-header">
                    <p>Send ETH cryto and manage your ETH wallet</p>
                    <h1>ETH Website hanlde transaction and your ETH wallet</h1>
                    <Link to="/login" className="btn-pink">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Home Banner */}
      </div>
    );
  }
}
export { Banner };
