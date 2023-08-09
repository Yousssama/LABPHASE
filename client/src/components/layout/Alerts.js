import React from "react";
import { connect } from "react-redux";

function Alerts({ alerts }) {
  return (
    <div>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            <i className="fa fa-info-circle"></i> {alert.msg}
          </div>
        ))}
    </div>
  );
}

const mapStateToProps = state => {
  return { alerts: state.alert };
};

export default connect(mapStateToProps)(Alerts);
