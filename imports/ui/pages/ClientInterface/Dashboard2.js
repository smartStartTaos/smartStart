import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Profiles from '../../../api/Profiles/Profiles';
import Widgets from './Widgets';

class Dashboard2 extends React.Component {
  constructor(props){
    super(props);
    this.state={}
  }
  render() {
    const { loading } = this.props;
    return ( !loading ? (
      <div>
      <div>Dashboard 2</div>
      </div>
      ) : (
        <div>loading</div>
      )
    )

  }
}
export default withTracker(() => {
  const userId = Meteor.userId();
  const subscription = Meteor.subscribe('user.profile');
  return {
    loading: !subscription.ready(),
    userProfile: Profiles.findOne({owner:userId}),
  };


})(Dashboard2);
