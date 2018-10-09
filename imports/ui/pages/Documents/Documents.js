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
        pageTitle: 'Page 1',
        pageDescription: 'this is the description for page 1',
        sections : [
          {
            sectionTitle : 'Getting started...',
            sectionDescription : 'Hey! Lets get you started. To begin with were going to watch a video and then complete a few easy excercies. Everything here is intented to build the foundation of your business plan.',
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
                stepTitle: 'Business Planning Made Easy with LivePlan',
                actionType: 'video',
                actionLink: 'https://www.youtube.com/channel/UCqmxqL7G5BGKlHrb7YedgOQ?v=KTBh2LKoEdk',
                actionTitle: 'LivePlan',
                actionDescription: 'So you’re an entrepreneur, and you’re ready to start pitching your idea to lenders and investors.  And you know what they’re going to ask for: your business plan. But you don’t have an MBA, you aren’t an accountant, and you aren’t getting into business to stay up all night crunching numbers.',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 2,
                stepTitle: 'Why do you want to start a business?',
                actionType: 'question',
                actionLink: ' link',
                actionTitle: 'this is the step 2',
                actionDescription: 'People have lots of different reasons for wanting to start a business, from financial independence to wanting to do something to improve their local community. Take some time here to write down what your motivations for starting a business are.',
                actionIdentifier: 'whystartbusiness'
              },
              {
                stepOrder: 3,
                stepTitle: 'What your core business idea?',
                actionType: 'question',
                actionLink: ' link',
                actionTitle: 'this is the step 2',
                actionDescription: 'In as simple terms as possible, describe the core of your business. What is the products, who are the customers, and describe a transaction.',
                actionIdentifier: 'corebusiness'
              }


            ]
          },
          {
            sectionTitle : 'Accounts Setup',
            sectionDescription : 'There are several services that can help you on your way. In the next section we will explore some of them and walk you through setting them up.',
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
                stepTitle: 'Password Protection',
                actionType: 'account setup',
                actionLink: 'https://www.lastpass.com/',
                actionTitle: 'Password Protection',
                actionDescription: 'First things first! If youre going to set up all of these account, you will need to keep track of a lot of passwords. Head on over to lastpass and sign up for an account. Last Pass will keep track of all of your passwords for you, so you dont have to waste time remembering them.',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 2,
                stepTitle: 'Banking',
                actionType: 'account setup',
                actionLink: 'https://citibank.com',
                actionTitle: 'Banking',
                actionDescription: 'Youll need a band account to stuff all that hard earned money into. Citibank is a great choice, and they offer great incentives to small businesses.',
                actionIdentifier: 'actionIdentifier'
              },
              {
                stepOrder: 3,
                stepTitle: 'Accounting Software',
                actionType: 'account setup',
                actionLink: 'https://quickbooks.intuit.com/',
                actionTitle: 'Accounting Software',
                actionDescription: 'We don’t expect you to be an accounting expert. That’s why QuickBooks helps keep everything organized in one place. And, if you have an accountant, share your books for seamless collaboration.',
                actionIdentifier: 'actionIdentifier'
              }

            ]
          }
        ]
      },
      {
        pageTitle: 'Page 2',
        pageDescription: 'lets go deeper!',
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
      },
      {
        pageTitle: 'page 3',
        pageDescription: 'this is the description for page 3',
        sections : [
          {
            sectionTitle : 'this is the first section of page 3',
            sectionDescription : 'this is the desciption of the first section, page 3',
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
            sectionTitle : 'this is the second section of page 3',
            sectionDescription : 'this is the desciption of the second section, page 3',
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
              },
              {
                stepOrder: 4,
                stepTitle: 'step four',
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
  Meteor.call('roadmaps.first', doc, (error, documentId) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      Bert.alert(documentId, 'success');
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
                  onClick={() => history.push('/roadmaps/' + _id)}
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
    roadmaps: RoadmapsCollection.find({},{sort:{createdAt:1}}).fetch(),
  };
})(Documents);
