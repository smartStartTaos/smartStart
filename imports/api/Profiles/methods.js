/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Profiles from './Profiles';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'client.profiles.initialize': function profilesInsert(data) {
    check(data, {
      touched: Boolean,
      metafields: Array,
    });

    try {
      var temp = Profiles.find({owner:this.userId}).fetch();
      if (temp.length > 0) {
        throw new Meteor.Error('403', 'This user already has a profile document');
      }
      return Profiles.insert({ owner: this.userId, ...data });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'client.profiles.update': function documentsUpdate(data) {
    console.log(data)
    check(data, {
      _id: String,
      test: Match.Maybe(String),
      metafields: Match.Maybe(Array),
      businessBasics : Match.Maybe(Array),
    });

    try {
      const profileId = data._id;
      const profileToUpdate = Profiles.findOne(profileId, { fields: { owner: 1 } });

      if (profileToUpdate.owner === this.userId) {
        Profiles.update(profileId, { $set: data });
        return profileId; // Return _id so we can redirect to document after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this document.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'client.profiles.findOne',
    'client.profiles.create',
    'client.profiles.update',
  ],
  limit: 5,
  timeRange: 1000,
});
