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
  createdBy: {
    type: String,
    label: 'The ID of the user this document belongs to.',
    optional: true,
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
    label: 'Roadmap title.',
  },
  description: {
    type: String,
    label: 'The description of the Roadmap',
  },
  metafields: {
    type: Array,
    optional: true
  },
  'metafields.$':Object,
  'metafields.$.fieldName':String,
  'metafields.$.fieldData':String,
  tags: [String],
  version: {
    type:String,
    defaultValue: 1
  },
  pages: {
    type: Array,
    label: 'array of pages in the roadmap'
  },
    'pages.$' : {
      type: Object
    },
      'pages.$.pageTitle' : String,
      'pages.$.pageDescription' : String,
      'pages.$.sections' : {
        type: Array
      },
        'pages.$.sections.$' : {
          type:Object
        },
          'pages.$.sections.$.sectionTitle' : {
            type: String,
          },
          'pages.$.sections.$.sectionDescription' : {
            type: String,
          },
          'pages.$.sections.$.sectionHeaderActions' : {
            type: Object,
          },
            'pages.$.sections.$.sectionHeaderActions.popupTutorial' :{
              type: Object
            },
              'pages.$.sections.$.sectionHeaderActions.popupTutorial.popupText' : {
                type: String
              },
              'pages.$.sections.$.sectionHeaderActions.popupTutorial.popupVideoLink' : {
                type: String
              },
              'pages.$.sections.$.sectionHeaderActions.popupTutorial.popupExternalLinks' : [String],
            'pages.$.sections.$.sectionHeaderActions.externalLinks' : [String],
            'pages.$.sections.$.sectionHeaderActions.resources' : [String],
          'pages.$.sections.$.steps' : {
            type: Array
          },
            'pages.$.sections.$.steps.$' : {
              type: Object
            },
            'pages.$.sections.$.steps.$.stepOrder' : Number,
            'pages.$.sections.$.steps.$.stepTitle' : String,
            'pages.$.sections.$.steps.$.actionType' : String,
            'pages.$.sections.$.steps.$.actionLink' : String,
            'pages.$.sections.$.steps.$.actionTitle' : String,
            'pages.$.sections.$.steps.$.actionDescription' : String,
            'pages.$.sections.$.steps.$.actionIdentifier' : String,

});

Roadmaps.attachSchema(Roadmaps.schema);

export default Roadmaps;
