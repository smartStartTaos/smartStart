import React from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


class FirstRoadmap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      businessName: null,
      businessAddress: null,
      businessPhone: null,
    }
    this.submitRoadmap = this.submitRoadmap.bind(this);
  }
  submitRoadmap() {
    const data = {
      _id : this.props.userProfile._id,
      businessBasics : [
        {
          businessName : this.state.businessName ? this.state.businessName : null,
          businessAddress : this.state.businessAddress ? this.state.businessAddress : null,
          businessPhone : this.state.businessPhone ? this.state.businessPhone : null
        }
      ],
    }
    Meteor.call('client.profiles.update',data,(error,documentId)=>{
      if(error){
        Bert.alert(error.reason,'danger');
      } else {
        Bert.alert(documentId,'success');
      }
    })

  }
  render() {
    console.log(this.state);
    return (
      <div>
        <div><Button onClick={()=>{this.props.history.goBack()}}>Back</Button></div>
        <div style={styles.title}>Business Basics</div>
        <div style={styles.roadmapWrapper}>
          <div style={styles.roadmapSection}>
            <div style={styles.roadmapSectionHeader}>
            Your Business Name
            </div>
            <div style={styles.roadmapSectionDescription}>
            Your business name is important - it very well may be the first thing people learn about you, and how they remember your business. Take some time, do some research and then add your business name here.
            </div>
            <div style={styles.roadmapInput}>
              <Input
                value={this.state.businessName}
                onChange={(e)=>{this.setState({businessName:e.target.value})}}
                fullWidth={true}
                />
            </div>
          </div>
          <div style={styles.roadmapSection}>
            <div style={styles.roadmapSectionHeader}>
            Business Address
            </div>
            <div style={styles.roadmapSectionDescription}>
            Where are you located? We will save this information for you, so you can easily fill in other forms.
            </div>
            <div style={styles.roadmapInput}>
              <Input
                value={this.state.businessAddress}
                onChange={(e)=>{this.setState({businessAddress:e.target.value})}}
                fullWidth={true}
                />
            </div>
          </div>
          <div style={styles.roadmapSection}>
            <div style={styles.roadmapSectionHeader}>
            Business Phone
            </div>
            <div style={styles.roadmapSectionDescription}>
            Do you have a phone number? If not, try some of the below resources.
            </div>
            <div style={styles.roadmapSectionResources}>
              <div><a href="https://www.flowroute.com/" target="_blank">Flowroute - Simple and cost effective virtual PRI</a></div>
              <div><a href="https://www.callcentric.com/" target="_blank">CallCentric - Set up a virtual PBX for your office</a></div>
            </div>
            <div style={styles.roadmapInput}>
              <Input
                value={this.state.businessPhone}
                onChange={(e)=>{this.setState({businessPhone:e.target.value})}}
                fullWidth={true}
                />
            </div>
            <div style={styles.submit}>
            <Button onClick={this.submitRoadmap}>Submit</Button>
            </div>
          </div>


        </div>
      </div>
    )
  }
}

const styles = {
  title : {
    textTransform:'uppercase',
    marginTop:'15px',
    marginBottom:'15px',
    fontSize:'36px'
  },
  roadmapSectionHeader : {
    fontSize:'20px',
    fontWeight:'bold',
    marginBottom:'10px'
  },
  roadmapSectionDescription : {
    fontSize:'14px',
    marginBottom:'10px'
  },
  roadmapSetionResources : {
    margin:'35px',

  },
  roadmapSection : {
    background : '#f9f9f9',
    padding:'20px',
    paddingTop:'50px',
    paddingBottom:'50px',
    borderRadius:'5px',
    marginBottom:'30px'
  },
  submit : {
    margin : '25px'
  }
}
export default FirstRoadmap;
