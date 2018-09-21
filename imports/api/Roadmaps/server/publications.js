import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Roadmaps from '../Roadmaps';

Meteor.publish('roadmaps', function roadmaps() {
  return Roadmaps.find({ owner: this.userId });
});
Meteor.publish('allRoadmaps', function allRoadmaps() {
  return Roadmaps.find({},{sort:{createdAt:1}});
})
// Note: documents.view is also used when editing an existing document.
Meteor.publish('roadmaps.view', (roadmapId) => {
  check(roadmapId, String);
  return Roadmaps.find({ _id: roadmapId });
});

Meteor.publish('roadmapss.edit', function roadmapsEdit(roadmapId) {
  check(roadmapId, String);
  return Roadmaps.find({ _id: roadmapId, owner: this.userId });
});
