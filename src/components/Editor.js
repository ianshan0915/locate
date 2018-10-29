import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
  getArticle
} from './../redux/actions/actions'
import MediumEditor from 'medium-editor'
import axios from 'axios'
import EditorHeader from './EditorHeader'
import './../../node_modules/medium-editor/dist/css/medium-editor.min.css'

const mapStateToProps = state => {
  return {
      _article: state.articles.article,
      user: state.authUser.user
  }
}

class Editor extends Component {
  constructor () {
    super()
    this.state = {
      repo: null,
      paper: null,
      reviewer: null,
      action: '',
      comment: '',
      loading: false
    }
    this.handleClick = this.handleClick.bind(this)
    // this.previewImg = this.previewImg.bind(this)
    this.publishStory = this.publishStory.bind(this)
  }

  publishStory () {
    this.setState({
      loading: true
    })
    console.log(this.state)  
    console.log('publishing...')
    const _url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
    const formdata = new FormData()
    formdata.append('repo', this.state.repo)
    // formdata.append('image', this.state.imgSrc)
    formdata.append('article', this.state.paper)
    formdata.append('reviewer', '5baa4c443e211b26fc9c5b26')
    formdata.append('action', document.getElementById('update-action').value)
    formdata.append('comment', document.getElementById('medium-editable').value)
    console.log(formdata)
    axios.post(`${_url}update`, /*{
      text: this.state.text,
      title: document.getElementById('editor-title').value,
      claps: 0,
      description: this.state.description,
      feature_img: this.state.imgSrc,
      author_id: this.props.user._id
    }*/formdata).then((res) => {
      this.setState({
        loading: false
      })
      console.log(res.data)
      window.location.assign(`/articleview/${this.props.match.params.repo}`);
    }).catch((err)=>{console.log(err); this.setState({loading: false})})
  } 

  handleClick () {
    console.log('clicked')
    this.refs.fileUploader.click()
  }

  // previewImg () {
  //   console.log('preview')
  //   const file = this.refs.fileUploader.files[0]
  //   var reader = new FileReader()
  //   reader.onload = function (e) {
  //     document.getElementById('image_preview').src = e.target.result
  //     this.setState({
  //       imgSrc: file/*e.target.result*/
  //     })
  //   }.bind(this)
  //   reader.readAsDataURL(file)
  // }
  componentWillMount() {
    this.props.getArticle(this.props.match.params.repo)
  }    
  componentDidMount () {
    const editor = new MediumEditor(/*dom, */".medium-editable",{ 
        autoLink: true,
        delay: 1000,
        targetBlank: true,
        toolbar: {
            buttons: [
              'bold', 
              'italic', 
              'quote', 
              'underline', 
              'anchor', 
              'h1',
              'h2', 
              'h3',
              'h4',
              'h5',
              'h6',
              'strikethrough',
              'subscript',
              'superscript',
              'pre',
              'image',
              'html',
              'justifyCenter'
            ],
            diffLeft: 25,
            diffTop: 10,
        },
        anchor: {
            placeholderText: 'Type a link',
            customClassOption: 'btn',
            customClassOptionText: 'Create Button'
        },
        paste: {
            cleanPastedHTML: true,
            cleanAttrs: ['style', 'dir'],
            cleanTags: ['label', 'meta'],
            unwrapTags: ['sub', 'sup']
        },
        anchorPreview: {
            hideDelay: 300
        },
        placeholder: {
            text: 'Add your comment...'
        }
      /*
      placeholder: { text: "Tell your Story ...", hideOnClick: true },
      toolbar: {
        buttons: ['bold', 'italic']
      } */
    })
    editor.subscribe('editableInput', (ev, editable) => {
      if(typeof document !== 'undefined')
        this.setState({
          repo: this.props.match.params.repo,
          paper: this.props.match.params.paper,
          reviewer: '5baa4c443e211b26fc9c5b26',        
          action: document.getElementById('update-action').value,
          comment: editor.getContent(0)
        })
        console.log(this.state)
    })
  }
    render() {
      const { title } = this.props._article
      let related_papers = []
      let paper_title = ''
      if (title) {
        related_papers = this.props._article.articles
        const paper = related_papers.find(paper => paper._id === parseInt(this.props.match.params.paper))
        if (paper) {
          paper_title = paper.title
        }
      }
        return ( 
<div>
  <EditorHeader publish={this.publishStory} loading={this.state.loading} />
    <div className="container-fluid main-container">
      <div className="row animated fadeInUp" data-animation="fadeInUp-fadeOutDown">
          <div id="main-post" className="col-xs-10 col-md-8 col-md-offset-2 col-xs-offset-1 main-content">
              <div className="post-metadata">
                  <img alt={this.props.user.name} className="avatar-image" src={this.props.user.provider_pic} height="40" width="40" />
                  <div className="post-info">
                      <div data-react-className="PopoverLink" data-react-props="{&quot;user_id&quot;:608,&quot;url&quot;:&quot;/users/netk&quot;,&quot;children&quot;:&quot;netk&quot;}"><span className="popover-link" data-reactroot=""><a href="">{this.props.user.name}</a></span></div>
                      <small>{this.props.user.email}</small>
                  </div>
              </div>
              <label id='editor-label'>Update the link</label>
              <form className="editor-form main-editor" autocomplete="off" >
                <div className="form-group">
                  <input className="editor-title" id="repo-title" placeholder="Name" type = 'text' value= {title}/>
                </div>

                <div className="form-group">
                  <label>Paper: </label>
                  <input id="paper-title" placeholder="Title" type = 'text' value= {paper_title} />
                </div>
                
                <div className="form-group">
                <label>Update: </label><select id = 'update-action'>
                    <option value="vote">Confirm</option>
                    <option value="delete">Delete</option>
                    <option value="add">Add</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea id="medium-editable" className="medium-editable" placeholder="Comment"></textarea>
                </div>

              {/* <div class="hidden">
                <input type="file" onChange={ ()=>this.previewImg()} id="file" ref="fileUploader"/>
              </div> */}

              </form>

          </div>
      </div> 
    </div>
</div>
        );
    }
}
// const mapStateToProps = state => {
//   return {
//       user: state.authUser.user
//   }
// }
export default connect(mapStateToProps, {getArticle})(Editor);