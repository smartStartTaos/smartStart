import React from "react";
import PropTypes from "prop-types";
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class RoadmapList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div>
        <div>road map - this is a list of roadmaps</div>
          <div style={styles.roadmapListItem}><Link to="/roadmaps/firstroadmap">First Roadmap</Link></div>
          <div style={styles.roadmapListItem}><Link to="/roadmaps/secondroadmap">Second Roadmap</Link></div>
      </div>
    )
  }
}

const styles = {
  roadmapListItem : {
    background : '#191919',
    color:'white',
    padding:'15px',
    margin:'10px',
    borderRadius:'5px'
  }
}
export default RoadmapList;
