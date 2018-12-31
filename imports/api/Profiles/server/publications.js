import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Profiles from '../Profiles';

Meteor.publish('user.profile', function documents() {
  return Profiles.find({ owner: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('admin.profile.view', (profileId) => {
  check(profileId, String);
  return Profiles.find({ _id: profileId });
});

Meteor.publish('client.profile.edit', function profileEdit(profileId) {
  check(profileId, String);
  return Profiles.find({ _id: profileId, owner: this.userId });
});
