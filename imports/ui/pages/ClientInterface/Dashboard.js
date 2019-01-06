import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";

import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "./routes/dashboardRoutes";

import dashboardStyle from "./assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import DashboardPage from "./views/Dashboard/Dashboard.jsx";
import UserProfile from "./views/UserProfile/UserProfile.jsx";

import RouteWithProps from "./components/RouteWithProps";

import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';

import Profiles from '../../../api/Profiles/Profiles';

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }

  }
  render() {
      const { classes, ...rest } = this.props;
      const { props } = this;
      return (
        <div className={classes.wrapper}>
          <Sidebar
            routes={dashboardRoutes}
            logoText={"SmartStart"}
            logo="https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder-300x300.jpg"
            image="https://images.unsplash.com/photo-1546569397-ab326af881f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=652&q=80"
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
            {...rest}
          />
          <div className={classes.mainPanel} ref="mainPanel">
            <Header
              routes={dashboardRoutes}
              handleDrawerToggle={this.handleDrawerToggle}
              {...rest}
            />
              <div className={classes.content}>
                <div className={classes.container}>
                  <Switch>
                    <RouteWithProps path="/dashboard" component={DashboardPage} {...props} />
                    <RouteWithProps path="/user" component={UserProfile} {...props}/>
                  </Switch>
                </div>
              </div>
            <Footer />
          </div>
        </div>
      );
    }
}
export default compose(
  withTracker(() => {
    const userId = Meteor.userId();
    const subscription = Meteor.subscribe('user.profile');
    return {
      loading: !subscription.ready(),
      userProfile: Profiles.findOne({owner:userId}),
    };
  }),
  withStyles(dashboardStyle)
)(Dashboard);
