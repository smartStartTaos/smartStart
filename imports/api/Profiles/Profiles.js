/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Profiles = new Mongo.Collection('Profiles');

Profiles.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Profiles.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Profiles.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  touched : {
    type: Boolean,
    label: 'Has the user ever edited this document',
    autoValue() {
      if(this.isUpdate) return true;
    }
  },
  test: {
    type: String,
    label: 'for testing',
    optional: true
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
  metafields: {
    type: Array,
    optional: true
  },
  'metafields.$':Object,
  'metafields.$.fieldName':String,
  'metafields.$.fieldData':String,
});

Profiles.attachSchema(Profiles.schema);

export default Profiles;
