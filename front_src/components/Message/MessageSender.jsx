import React from 'react';
import sendMessages from '../../actions/sendMessages';
import uploadFile from '../../actions/uploadFile';

export default class MessageSender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      file: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.getApplicationPayload = this.getApplicationPayload.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    const messageContent = e.target.content.value;
    if (!messageContent) return;
    e.target.content.value = '';
    await sendMessages(this.props.chatId, messageContent, this.getApplicationPayload());
    await this.setState({image: null, file: null});
    this.props.upSt();
  }

  getApplicationPayload(){
    const images = this.state.image ? [{link: this.state.image, type: 1}] : [];
    const files = this.state.file ? [{link: this.state.file, type: 2}] : [];
    return [...images, ...files];
  }

  render() {
    return (
      <form className="type_msg" onSubmit={this.onSubmit}>
        <label htmlFor="file">
          <i className="fas fa-file attach-msg att-f"> </i>
        </label>
        <label htmlFor="fimg">
          <i className="fas fa-camera attach-msg att-s"> </i>
        </label>
        {this.renderImage(this.state.image)};
        {this.renderFile(this.state.file)}

        <input type="FILE" id="file" ref={ref => (this.file = ref)} onChange={this.uploadFile}/>
        <input type="FILE" id="fimg" accept="image/*" ref={ref => (this.image = ref)} onChange={this.uploadImage} />

        <div className="input_msg_write">
          <textarea type="text" className="write_msg" placeholder="Type a message" name="content" />
          <button className="msg_send_btn" type="submit">
            <i className="fa fa-paper-plane-o" aria-hidden="true">
              {' '}
            </i>
          </button>
        </div>
      </form>
    );
  }

  renderImage(link) {
    return link ? (
      <div className="img-upl" style={{backgroundImage: `url(${link})`}}>
        <i className="far fa-times-circle" />
      </div>
    ) : (
      ''
    );
  }

  renderFile(link){
    return link ? (
      <div className="img-upl" style={{backgroundImage: `url(https://w0.pngwave.com/png/919/5/computer-icons-font-awesome-text-file-document-txt-file-png-clip-art.png)`}}>
        <i className="far fa-times-circle" />
      </div>
    ) : (
      ''
    );
  }

  async uploadImage() {
    const link = await uploadFile(this.image);
    await this.setState({ image: link });
  }
  async uploadFile() {
    const link = await uploadFile(this.file);
    await this.setState({file: link});
  }
}
