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
import YouTube from 'react-youtube';

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
class RenderSteps extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      temp:'nothing'
    }
  }
  render() {
console.log(this.state);

return this.props.steps.map((step)=>{
    switch(step.actionType) {
      case 'video':
      return (
        <div key={step.stepTitle} style={{margin:'15px',background:'#fafafa',padding:'8px'}}>
          <div style={style.stepTitle}>Step 1 - {step.stepTitle}</div>
          <YouTube
            videoId={step.actionLink}
            opts={{
              height:'390',
              width:'640'
            }}
            />
            <div style={style.stepDescription}>{step.actionDescription}</div>
        </div>
      );
      case 'question':
      return (
        <div key={step.stepTitle} style={{margin:'15px',background:'#fafafa',padding:'8px'}}>
          <div style={style.stepTitle}>{step.stepTitle}</div>
          <div style={style.stepDescription}>{step.actionDescription}</div>
          <div>
            <textarea
              style={style.textArea}
              value={this.state[step.actionIdentifier]}
              onChange={(e)=>{
                this.setState({
                  [step.actionIdentifier] : e.target.value
                })
              }}
            />
          </div>
        </div>
      );
      case 'account setup':
      return (
        <div key={step.stepTitle} style={{margin:'15px',background:'#fafafa',padding:'8px'}}>
          <div style={style.stepTitle}>{step.stepTitle}</div>
          <div style={style.stepDescription}>{step.actionDescription}</div>
          <div style={style.externalLink}><a href={step.actionLink} target="_blank">{step.actionLink}</a></div>
        </div>
      );
      default:
      return (
        <div key={step.stepTitle} style={{margin:'15px',background:'#fafafa',padding:'8px'}}>
          <div>{step.stepTitle} not found</div>
        </div>

      )

      }


})


}
}
const RenderSections = (page) => {
    return page.sections.map((section)=>{
      return (
        <div key={section.sectionTitle} style={{margin:'20px'}}>
          <div style={style.sectionTitle}>{section.sectionTitle}</div>
          <div style={style.sectionDescription}>{section.sectionDescription}</div>
          <RenderSteps {...section}/>
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
const style = {
  stepTitle : {
    padding:12,
    fontSize:30
  },
  stepDescription : {
    padding: 12
  },
  textArea: {
    width:'100%',
    height:100
  },
  sectionTitle : {
    padding: 12,
    fontSize:30
  },
  sectionDescription : {
    padding:12
  },
  externalLink : {
    background:'#fff',
    marginTop:20,
    padding:10
  }
}
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
