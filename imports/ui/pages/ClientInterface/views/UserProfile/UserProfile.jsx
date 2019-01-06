import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardAvatar from "../../components/Card/CardAvatar.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import { Meteor } from 'meteor/meteor';

import compose from 'recompose/compose';
import { withTracker } from 'meteor/react-meteor-data';


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class UserProfile extends React.Component {
  render() {
    console.log(this.props)
    const { classes, user } = this.props;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="FirstName"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={user.profile.name.first}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="LastName"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={user.profile.name.last}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="email"
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={user.emails[0].address}
                    />
                  </GridItem>
                </GridContainer>

              </CardBody>
              <CardFooter>
                <Button color="primary">Update Profile</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src="https://www.gravatar.com/avatar/" alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{this.props.emailAddress}</h6>
                <h4 className={classes.cardTitle}>{this.props.name}</h4>
                <p className={classes.description}>
                </p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );

  }
}

const getUserProfile = (user) => {
  if (user) {
    const isOAuth = !user.services ? false : !user.services.password; // If services do not exist, it's the current user.
    const userData = isOAuth ? { _id: user._id, ...getDataForService(user.services) } : { service: 'password', ...user };
    return userData;
  }

  return {};
};

export default compose(
  withTracker(() => {
    const subscription = Meteor.subscribe('users.editProfile');

    return {
      loading: !subscription.ready(),
      user: getUserProfile(Meteor.users.findOne({ _id: Meteor.userId() })),
    };
  }),
  withStyles(styles)
)(UserProfile)
