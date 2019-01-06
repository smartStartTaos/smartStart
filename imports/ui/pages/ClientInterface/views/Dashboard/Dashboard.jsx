import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AccountBalance from "@material-ui/icons/AccountBalance";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import Edit from "@material-ui/icons/Edit";

// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Tasks from "../../components/Tasks/Tasks.jsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";

import { bugs, website, server } from "../../variables/general.jsx";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
    this.updateProfile = this.updateProfile.bind(this);
    this.createProfile = this.createProfile.bind(this);
    this.calcFinish = this.calcFinish.bind(this);
  }
  state = {
    value: 0
  };
  calcFinish() {
    const total = 3;
    var running = 0;
    if (this.props.userProfile.businessBasics[0].businessName) {
      running = running + 1;
    }
    if (this.props.userProfile.businessBasics[0].businessAddress) {
      running = running + 1;
    }
    if (this.props.userProfile.businessBasics[0].businessPhone) {
      running = running + 1;
    }

    var final = (running / total) * 100;
    return final;
  }
  updateProfile() {
  console.log(this.props.userProfile);
  const data = {
    _id : this.props.userProfile._id,
    test : 'hello there you person'
  }
  Meteor.call('client.profiles.update', data, (error,documentId) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(documentId, 'success');
    }
  })
  }
  createProfile() {
  console.log('profile');
  const data = {
    touched: false,
    metafields : [
      {
        fieldName : 'metaFieldOne',
        fieldData : 'this is a metafield'
      },
      {
        fieldName : 'metaFieldTwo',
        fieldData : 'this is a second metafield'
      }
    ],
  }
  Meteor.call('client.profiles.initialize', data, (error, documentId) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(documentId, 'success');
    }
  });
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <AccountBalance />
                </CardIcon>
                <p className={classes.cardCategory}>Banking</p>
                <h3 className={classes.cardTitle}>
                  4/10 <small>Tasks</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Research Banking Options
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <AccountBalance />
                </CardIcon>
                <p className={classes.cardCategory}>My business accounts</p>
                <h3 className={classes.cardTitle}>
                  4/10 <small>Tasks</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div>
                  <Danger>
                    <Warning />
                  </Danger>
                  <div>welcome sequence</div>
                  <div>my business bank account</div>
                  <div>my business website</div>
                  <div>facebook</div>
                  <div>these are all links to an outside place</div>
                </div>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Business Info</p>
                {this.props.userProfile && this.props.userProfile.businessBasics &&
                  <div style={{color:'black'}}>{this.props.userProfile.businessBasics[0].businessName}</div>
                }
              </CardHeader>
              <CardFooter stats>
              {(this.props.userProfile && this.props.userProfile.businessBasics) ? (
                <div>
                <div>
                  <LinearProgress variant="determinate" value={this.calcFinish()} />
                </div>
                <div style={styles.list}>
                  <div style={styles.myitem}>Name - {this.props.userProfile.businessBasics[0].businessName}<Edit /></div>
                  <div style={styles.myitem}>Address - {this.props.userProfile.businessBasics[0].businessAddress}<Edit /></div>
                  <div style={styles.myitem}>Phone - {this.props.userProfile.businessBasics[0].businessPhone}<Edit /></div>
                </div>
                </div>
              ) : (
                <div className={classes.stats}>
                    Start the roadmap!
                </div>

              )
              }

              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <FlightTakeoff />
                </CardIcon>
                <p className={classes.cardCategory}>Bplan Outline</p>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Start your business plan
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
            {this.props.userProfile ? (
              <div>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Profile Status</p>
                <h3 className={classes.cardTitle}>Touched - {this.props.userProfile.touched ? 'Yes' : 'No'}</h3>
              </CardHeader>
              <CardFooter stats>
                <div style={{fontSize:'12px',color:'#999999'}}>
                  <Update />
                  {this.props.userProfile.metafields.map((field)=>{
                    return <div>{field.fieldName} - {field.fieldData}</div>
                  })}
                </div>
                <div><Button onClick={this.updateProfile}>update</Button></div>
              </CardFooter>
              </div>
            ) : (
              <div><Button onClick={this.createProfile}>Create User Profile</Button></div>
            )
            }
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>


        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
          <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Roadmaps</h4>
            <p className={classes.cardCategoryWhite}>
              Roadmap Status / Completion
            </p>
          </CardHeader>
          <CardBody>
            <div style={styles.roadmaplist}>

            </div>
          </CardBody>
          </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Available Roadmaps</h4>
                <p className={classes.cardCategoryWhite}>
                  available roadmaps
                </p>
              </CardHeader>
              <CardBody>
              <LinearProgress color="secondary" variant="determinate" value={83} />
              <div style={styles.roadmapList}>
                <div style={styles.roadmapListItem} onClick={()=>{this.props.history.push('/roadmaps/firstroadmap')}}>First Roadmap</div>
                <div style={styles.roadmapListItem}><LinearProgress variant="determinate" value={33} /></div>
              </div>
              <div style={styles.roadmapList}>
                <div style={styles.roadmapListItem}>second Roadmap</div>
                <div style={styles.roadmapListItem}><LinearProgress variant="determinate" value={13} /></div>
              </div>
              <div style={styles.roadmapList}>
                <div style={styles.roadmapListItem}>third Roadmap</div>
                <div style={styles.roadmapListItem}><LinearProgress variant="determinate" value={0} /></div>
              </div>
              <div style={styles.roadmapList}>
                <div style={styles.roadmapListItem}>fifth Roadmap</div>
                <div style={styles.roadmapListItem}><LinearProgress variant="determinate" value={56} /></div>
              </div>
              <div style={styles.roadmapList}>
                <div style={styles.roadmapListItem}>Sixth Roadmap</div>
                <div style={styles.roadmapListItem}><LinearProgress variant="determinate" value={22} /></div>
              </div>


              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}
 const styles = {
   myitem : {
     padding: '5px'
   },
   roadmapList : {
     display:'flex',
     flexDirection:'row',
     alignItems:'center',
     padding:'15px',
     marginBottom:'10px'
   },
   roadmapListItem : {
     flex:1,
     cursor:'pointer'
   }
 }
Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
