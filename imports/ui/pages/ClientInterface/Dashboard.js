import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Profiles from '../../../api/Profiles/Profiles';
import Widgets from './Widgets';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.updateProfile = this.updateProfile.bind(this);
  }
  render() {
    const { loading, userProfile } = this.props;
    console.log(this.props);

    return ( !loading ? (
      <div>
      <div>Dashy mcboards alot</div>
      <div>{userProfile && userProfile.owner}</div>
      <div>{userProfile &&
        <div>
        {userProfile.touched ? (
          <div>profile has been updated</div>
        ) : (
          <div>user has not touched profile</div>
        )}
        </div>
      }
      </div>
        <button
          onClick={this.createProfile}
        >create profile</button>
        <button
          onClick={this.updateProfile}
        >update profile</button>
        <div><Widgets profile={userProfile}/></div>
      </div>
    ) : (
      <div>loading</div>
    )
    )

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
}
export default withTracker(() => {
  const userId = Meteor.userId();
  const subscription = Meteor.subscribe('user.profile');
  return {
    loading: !subscription.ready(),
    userProfile: Profiles.findOne({owner:userId}),
  };


})(Dashboard);
