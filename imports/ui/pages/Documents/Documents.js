import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import DocumentsCollection from '../../../api/Documents/Documents';
import RoadmapsCollection from '../../../api/Roadmaps/Roadmaps';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import BlankState from '../../components/BlankState/BlankState';

const StyledDocuments = styled.div`
  table tbody tr td {
    vertical-align: middle;
  }
`;

const handleRemove = (documentId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('roadmaps.adminRemove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};
const createRoadmap = () => {
  console.log('roadmapping');
  doc = {
    title : 'This is a default roadmap',
    description : 'This roadmap has been created by the system for testing.',
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
    tags : ['tag1', 'tag2','tag3'],
    version: '1',
    pages: [
      {
        pageTitle: 'this page 1!',
        pageDescription: 'this is the description for page 1',
        sections : [
          {
            sectionTitle : 'this is the first section',
            sectionDescription : 'this is the desciption of the first section',
            sectionHeaderActions : {
              popupTutorial : {
                popupText : 'this is the popupText',
                popupVideoLink : 'http://video.com',
                popupExternalLinks : [
                  'http://google.com',
                  'http://casswilliam.com'
                ],
              },
              externalLinks : [
                'http://link1.com',
                'http://link2.com'
              ],
              resources : [
                'resource 1',
                'resource 2'
              ]
            },
            steps : [
              {
                stepOrder: 1,
                stepTitle: 'step one',
                actionType: 'video',
                actionLink: 'video link',
                actionTitle: 'video title',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 2,
                stepTitle: 'step two',
                actionType: 'question',
                actionLink: ' link',
                actionTitle: 'this is the step 2',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 3,
                stepTitle: 'step three',
                actionType: 'account setup',
                actionLink: 'setup link',
                actionTitle: 'setup title',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              }

            ]
          },
          {
            sectionTitle : 'this is the second section',
            sectionDescription : 'this is the desciption of the second section',
            sectionHeaderActions : {
              popupTutorial : {
                popupText : 'this is the popupText',
                popupVideoLink : 'http://video.com',
                popupExternalLinks : [
                  'http://google.com',
                  'http://casswilliam.com'
                ],
              },
              externalLinks : [
                'http://link1.com',
                'http://link2.com'
              ],
              resources : [
                'resource 1',
                'resource 2'
              ]
            },
            steps : [
              {
                stepOrder: 1,
                stepTitle: 'step one',
                actionType: 'video',
                actionLink: 'video link',
                actionTitle: 'video title',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 2,
                stepTitle: 'step two',
                actionType: 'question',
                actionLink: ' link',
                actionTitle: 'this is the step 2',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 3,
                stepTitle: 'step three',
                actionType: 'account setup',
                actionLink: 'setup link',
                actionTitle: 'setup title',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              }

            ]
          }
        ]
      },
      {
        pageTitle: 'this page 2!',
        pageDescription: 'this is the description for page 2',
        sections : [
          {
            sectionTitle : 'this is the first section of page 2',
            sectionDescription : 'this is the desciption of the first section, page 2',
            sectionHeaderActions : {
              popupTutorial : {
                popupText : 'this is the popupText',
                popupVideoLink : 'http://video.com',
                popupExternalLinks : [
                  'http://google.com',
                  'http://casswilliam.com'
                ],
              },
              externalLinks : [
                'http://link1.com',
                'http://link2.com'
              ],
              resources : [
                'resource 1',
                'resource 2'
              ]
            },
            steps : [
              {
                stepOrder: 1,
                stepTitle: 'step one',
                actionType: 'video',
                actionLink: 'video link',
                actionTitle: 'video title',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 2,
                stepTitle: 'step two',
                actionType: 'question',
                actionLink: ' link',
                actionTitle: 'this is the step 2',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 3,
                stepTitle: 'step three',
                actionType: 'account setup',
                actionLink: 'setup link',
                actionTitle: 'setup title',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              }

            ]
          },
          {
            sectionTitle : 'this is the second section of page 2',
            sectionDescription : 'this is the desciption of the second section, page 2',
            sectionHeaderActions : {
              popupTutorial : {
                popupText : 'this is the popupText',
                popupVideoLink : 'http://video.com',
                popupExternalLinks : [
                  'http://google.com',
                  'http://casswilliam.com'
                ],
              },
              externalLinks : [
                'http://link1.com',
                'http://link2.com'
              ],
              resources : [
                'resource 1',
                'resource 2'
              ]
            },
            steps : [
              {
                stepOrder: 1,
                stepTitle: 'step one',
                actionType: 'video',
                actionLink: 'video link',
                actionTitle: 'video title',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 2,
                stepTitle: 'step two',
                actionType: 'question',
                actionLink: ' link',
                actionTitle: 'this is the step 2',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 3,
                stepTitle: 'step three',
                actionType: 'account setup',
                actionLink: 'setup link',
                actionTitle: 'setup title',
                actionDescription: 'this is the description',
                actionIdentifier: 'actionIdentifier'
              }

            ]
          }
        ]
      }


    ]


  }
  console.log(doc)
  Meteor.call('roadmaps.first', doc, (error, documentId) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(documentId, 'success');
      console.log(documentId)
    }
  });
}
const Documents = ({
  loading, roadmaps, match, history,
}) => (!loading ? (
  <StyledDocuments>
    <div className="page-header clearfix">
      <h4 className="pull-left">Roadmaps</h4>
    </div>
    {roadmaps.length ?
      <Table responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Last Updated</th>
            <th>Created</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {roadmaps.map(({
            _id, title, createdAt, updatedAt,
          }) => (
            <tr key={_id}>
              <td>{title}</td>
              <td>{timeago(updatedAt)}</td>
              <td>{monthDayYearAtTime(createdAt)}</td>
              <td>
                <Button
                  bsStyle="primary"
                  onClick={() => history.push(`${match.url}/${_id}`)}
                  block
                >
                  View
                </Button>
              </td>
              <td>
                <Button
                  bsStyle="danger"
                  onClick={() => handleRemove(_id)}
                  block
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> : <BlankState
        icon={{ style: 'solid', symbol: 'file-alt' }}
        title="No roadmaps exist."
        subtitle="Add a system test roadmap by clicking the button below."
        action={{
          style: 'success',
          onClick: () => createRoadmap(),
          label: 'Create System test roadmap',
        }}
      />}
      <Button
        bsStyle="primary"
        onClick={()=>createRoadmap()}
      >Insert Test Roadmap
      </Button>
  </StyledDocuments>
) : <Loading />);

Documents.propTypes = {
  loading: PropTypes.bool.isRequired,
  roadmaps: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('allRoadmaps');
  return {
    loading: !subscription.ready(),
    roadmaps: RoadmapsCollection.find().fetch(),
  };
})(Documents);
