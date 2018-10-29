import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import FollowButton from './FollowButton'
import { 
    getUpdates,
    follow
} from './../redux/actions/actions'

const mapStateToProps = state => {
    return {
        updates: state.updates.updates
    }
}

class Profile extends Component {

    componentDidMount() {
        document.body.className = 'users show'
    }
    componentWillUnmount() {
        document.body.className = ''
    }
    componentWillReceiveProps(nextProps) {
        
    }    
    componentWillMount() {
        this.props.getUpdates()
        console.log(this.props)
    }

    render() {

        return ( 
            <div>
            {this.props.updates? <ItemList items ={this.props.updates} /> : ''}
            </div>
        );
    }
}

function ItemList ({items}) {
    return (
            <div className="users show">
            <div className="container-fluid main-container">
            {/* <div className="banner-container animated fadeInUp-small" data-animation="fadeInUp-fadeOutDown-slow">
                <div className="hero-wrapper">
                    <header className="hero">
                        <div className="profile-info">
                            <h1 className="hero-title">Admin</h1>
                            <p className="hero-description">admin@locate.nl</p>
                        </div>
                    </header>
                </div>
            </div> */}


            <div className="posts-wrapper animated fadeInUp" data-animation="fadeInUp-fadeOutDown">

                <h2 className="small-heading border-top">latest updates to confirm</h2>
                { items.map((update)=>
                <div className="post-panel">

                    <div className="main-body">
                        <h3 className="post-title"><a href={`/articleview/${update.repo._id}`}>{update.repo.title}</a></h3>
                        <div className="post-body">
                            <p className="" dangerouslySetInnerHTML={{__html: update.article.title}}></p>
                        </div>
                        <a className="read-more" href={`${update.article.url}`}>Paper link</a>
                    </div>

                    <div className="post-stats clearfix">
                        <div className="pull-left">
                            <div className="like-button-wrapper">
                                <span className="like-count">{`${update.reviewer.name} @ ${update.upatedAt}`}</span>
                            </div>

                        </div>

                        <div className="pull-right">
                            <div className="bookmark-button-wrapper">
                                <form className="button_to" method="get" action=""><button className="bookmark-button" data-behavior="trigger-overlay" type="submit"><span className="icon-bookmark-o"></span><span className="hide-text">Bookmark</span></button>
                                </form>
                            </div>

                        </div>

                        <div className="response-count pull-right">
                            <span className="response-count">{update.action}</span>
                        </div>
                    </div>
                </div>
                )}

            </div>

            </div>
            </div>
    )
}
Profile.propTypes = {
    params: PropTypes.object.isRequired
}

export default connect(mapStateToProps, {
    getUpdates,
    follow
})(Profile);