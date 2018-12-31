import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Profiles from '../../../api/Profiles/Profiles';

class Widgets extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }


  }
  render() {
    return (
      <div>
      <div>widgets here</div>
      {this.props.profile && this.props.profile.metafields &&
        <div style={styles.widgetBox}>
          {this.props.profile.metafields && this.props.profile.metafields.map((meta)=>{
            return <div key={meta.fieldName}>{meta.fieldName}</div>
          })}
        </div>
      }
      {this.props.profile && this.props.profile.banking &&
        <div style={styles.widgetBox}>
          {this.props.profile.metafields && this.props.profile.metafields.map((meta)=>{
            return <div>{meta.fieldName}</div>
          })}
        </div>
      }

      </div>
    )
  }

}
const styles = {
  widgetBox : {
    background:'grey',
    padding:'25px',
    width:'25%',
  }
}
export default Widgets;
