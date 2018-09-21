import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Documents from '../../../api/Documents/Documents';
import Roadmaps from '../../../api/Roadmaps/Roadmaps';
import SEO from '../../components/SEO/SEO';
import NotFound from '../NotFound/NotFound';

const handleRemove = (documentId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('documents.remove', documentId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
        history.push('/documents');
      }
    });
  }
};
const RenderSteps = (section) => {
  console.log(section)
  return section.steps.map((step)=>{
    return (
      <div key={step.stepTitle} style={{margin:'15px',background:'#fafafa',padding:'8px'}}>
        <div>{step.stepTitle}</div>
      </div>
    )
  })

}
const RenderSections = (page) => {
    return page.sections.map((section)=>{
      return (
        <div key={section.sectionTitle} style={{margin:'20px'}}>
          <div>{section.sectionTitle}</div>
          <RenderSteps {...section} />
        </div>
      )
    })

}
const renderRoadmap2 = (roadmap,match,history) => {
  return roadmap ? (
    roadmap.pages.map((page)=>{
      return (
        <div key={page.pageTitle} style={{background:'#f2f2f2',padding:'15px',marginBottom:'20px'}}>
          <div>{page.pageTitle}</div>
          <RenderSections {...page} />
        </div>
      )
    })
  ) : (
    <NotFound/>
  )
  return (roadmap ? (
    <div>we have roadmap</div>
  ):(<NotFound/>))
}
const renderRoadmap = (roadmap, match, history) => {console.log(roadmap); return (roadmap ? (
  <div className="ViewDocument">
    <SEO
      title={roadmap.title}
      description={roadmap.description}
      url={`roadmaps/${roadmap._id}`}
      contentType="article"
      published={roadmap.createdAt}
      updated={roadmap.updatedAt}
      twitter="clvrbgl"
    />
    <div className="page-header clearfix">
      <h4 className="pull-left">{ roadmap && roadmap.title }</h4>
      {Meteor.isClient && Meteor.userId() ? (
        <ButtonToolbar className="pull-right">
          <ButtonGroup bsSize="small">
            <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
            <Button onClick={() => handleRemove(roadmap._id, history)} className="text-danger">
              Delete
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      ) : ''}
    </div>
    { roadmap && roadmap.description }
  </div>
) : <NotFound />)};

const ViewRoadmap = ({ roadmap, match, history }) => (renderRoadmap2(roadmap, match, history));

ViewRoadmap.defaultProps = {
  roadmap: null,
};

ViewRoadmap.propTypes = {
  roadmap: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  connect(state => ({ ...state })),
  withTracker(({ match }) => {
    const roadmapId = match.params._id;
    if (Meteor.isClient) Meteor.subscribe('roadmaps.view', roadmapId);

    return {
      roadmap: Roadmaps.findOne(roadmapId),
    };
  }),
)(ViewRoadmap);
