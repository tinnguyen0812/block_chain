import React from "react";

import { Banner } from "./banner";
import { NewsandEvents } from "./news-events";
import { Testimonials } from "./testimonials";
import { TopStylist } from "./top-stylist";
import { BestService } from "./best-service";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        {/* Home Banner */}
        <Banner />
        {/* Home Banner */}
      </div>
    );
  }
}
export { Home };
