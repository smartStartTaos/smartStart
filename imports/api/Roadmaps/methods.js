/* eslint-disable consistent-return */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Roadmaps from './Roadmaps';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'roadmaps.findOne': function roadmapsFindOne(roadmapId) {
    check(roadmapId, Match.OneOf(String, undefined));

    try {
      return Roadmaps.findOne(roadmapId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'roadmaps.insert': function roadmapsInsert(doc) {
    check(doc, {
      title: String,
      body: String,
    });

    try {
      return Roadmaps.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'roadmaps.first': function roadmapsFirst(doc) {
    check(doc,{
      title:String,
      body:String,
      steps:Array,

    });
    try {
      return Roadmaps.insert({owner:this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'roadmaps.update': function roadmapsUpdate(doc) {
    check(doc, {
      _id: String,
      title: String,
      body: String,
    });

    try {
      const roadmapId = doc._id;
      const docToUpdate = Roadmaps.findOne(documentId, { fields: { owner: 1 } });

      if (docToUpdate.owner === this.userId) {
        Roadmaps.update(roadmapId, { $set: doc });
        return roadmapId; // Return _id so we can redirect to document after update.
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to edit this document.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'roadmaps.remove': function roadmapsRemove(roadmapId) {
    check(roadmapId, String);

    try {
      const docToRemove = Roadmaps.findOne(roadmapId, { fields: { owner: 1 } });

      if (docToRemove.owner === this.userId) {
        return Roadmaps.remove(roadmapId);
      }

      throw new Meteor.Error('403', 'Sorry, pup. You\'re not allowed to delete this document.');
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'documents.insert',
    'documents.update',
    'documents.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
