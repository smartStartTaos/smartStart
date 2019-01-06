import React from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import Button from '@material-ui/core/Button';




class SecondRoadmap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <Button onClick={()=>{this.props.history.goBack()}}>Back</Button>
        <div>Roadmap #2</div>
        <div>
        </div>
      </div>
    )
  }
}

export default SecondRoadmap;
