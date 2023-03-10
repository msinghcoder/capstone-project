import * as React from 'react'
import { History } from 'history'
import { Form, Button,  Input  } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getUploadUrl, uploadFile } from '../api/posts-api'
import { createPost } from '../api/posts-api'
import dateFormat from 'dateformat'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile,
}

interface AddPostProps {
  auth: Auth
  history:History
}

interface AddPostState {
  file: any
  uploadState: UploadState
  newPostCaption:string
}

export class AddPost extends React.PureComponent<
  AddPostProps,
  AddPostState
> {
  state: AddPostState = {
    file: undefined,
    uploadState: UploadState.NoUpload,
    newPostCaption:""
  }
  calculateDate(): string {
    const date = new Date()
    

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    
    try {
      if (!this.state.newPostCaption) {
        alert('Please provide caption')
        return
      }
      if (!this.state.file) {
        alert('File should be selected')
        return
      }
     
      const newPost = await createPost(this.props.auth.getIdToken(), {
        name: this.state.newPostCaption  ,
        date: this.calculateDate()     
      })
   
     
  
      

      this.setUploadState(UploadState.FetchingPresignedUrl)
      const uploadUrl = await getUploadUrl(this.props.auth.getIdToken(), newPost.postId)

      this.setUploadState(UploadState.UploadingFile)
      await uploadFile(uploadUrl, this.state.file)

      alert('Post created!')
      this.props.history.push(`/`)
    } catch (e) {
      alert('Could not upload a file: ' + (e as Error).message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
 
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }
  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newPostCaption: event.target.value })
  }
  

  render() {
    return (
    
      
      <div>
         <h1>Add new post</h1>

        <Input          
          fluid
          actionPosition="left"
          placeholder="Caption for the post"
          value={this.state.newPostCaption}
          onChange={this.handleNameChange}
        /> 
       
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>File</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={this.handleFileChange}
            />
          </Form.Field>

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {

    return (
      <div>
        {this.state.uploadState === UploadState.FetchingPresignedUrl && <p>Uploading image metadata</p>}
        {this.state.uploadState === UploadState.UploadingFile && <p>Uploading file</p>}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Create
        </Button>
      </div>
    )
  }
}
