/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Roadmaps = new Mongo.Collection('Roadmaps');

Roadmaps.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Roadmaps.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Roadmaps.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
  steps: {
    type: Array,
    label: 'Array of steps in this Roadmap'
  },
  'steps.$' : {
    type: Object
  },
  'steps.$.name' : {
    type: String
  },
  'steps.$.type' : {
    type: String
  },
  'steps.$.description' : {
    type: String
  },
  'steps.$.link' : {
    type: String
  }
});

Roadmaps.attachSchema(Roadmaps.schema);

export default Roadmaps;
