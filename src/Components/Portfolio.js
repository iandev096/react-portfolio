import React, { Component } from 'react';
import ProjectSlider from '../CustomComponents/ProjectSlider';


class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedProjectImages: []
    }
  }

  closeModal = () => {
    this.setState({ displayedProjectImages: [] });
  }

  displayModal = (images) => {
    const transformed = this.transformScreenshots(images);
    this.setState({ displayedProjectImages: transformed });
  }

  transformScreenshots = (screenshots, projectTitle) => {
    return screenshots.map((shot, idx) => {
      return {
        url: shot,
        alt: `${projectTitle} screenshot ${idx}`
      }
    });
  }

  render() {

    if (this.props.data) {
      var projects = this.props.data.projects.map(project =>
        <div className='row project'>
          <div
            className='project__thumbnailContainer'
            onClick={() => this.displayModal(project.screenshots)}
          >
            <div className='project__thumbnailOverlay'>
              <span></span>
            </div>
            <img
              className='project__thumbnail'
              src={project.screenshots[0]}
              alt={`${project.title} screenshot`}
            />
          </div>
          <div className='project__info' >
            <h3
              onClick={() => this.displayModal(project.screenshots)}
              className='project__infoHeading'
            >
              {project.title}
              <span role='icon'></span>
            </h3>
            <p className='project__infoDetail'>
              {project.description}
            </p>
            <div className='project__technologies'>
              <h4>TECHNOLOGIES / APIs:</h4>
              <div className='project__techItems'>
                {project.technologiesApis.map(item =>
                  <a href={item.url} target='_blank'>{item.name}</a>
                )}
              </div>
            </div>
            <div className='project__links'>
              {project.demonstrationUrl && <a href={project.demonstrationUrl} target='_blank' className='project__demonstration'>
                <span role='icon'></span>
                <p>Demonstration</p>
              </a>}
              <a href={project.projectUrl} target='_blank' className='project__url'>VISIT NOW &#8594;</a>
            </div>
          </div>
        </div>
      )
    }

    return (
      <section id="portfolio">
        {this.state.displayedProjectImages.length ? <ProjectSlider
          onClose={() => this.closeModal()}
          images={this.state.displayedProjectImages}
        /> : null}
        <h1>Check Out Some of My Works.</h1>
        {projects}
      </section>
    );
  }
}

export default Portfolio;
