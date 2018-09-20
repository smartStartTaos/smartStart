import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Roadmaps from '../Roadmaps';

Meteor.publish('roadmaps', function roadmaps() {
  return Roadmaps.find({ owner: this.userId });
});

// Note: documents.view is also used when editing an existing document.
Meteor.publish('roadmaps.view', (roadmapId) => {
  check(roadmapId, String);
  return Roadmaps.find({ _id: RoadmapId });
});

Meteor.publish('roadmapss.edit', function roadmapsEdit(roadmapId) {
  check(roadmapId, String);
  return Roadmaps.find({ _id: roadmapId, owner: this.userId });
});
