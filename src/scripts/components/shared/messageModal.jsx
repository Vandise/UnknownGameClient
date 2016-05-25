import React         from 'react';
import MessageStore  from '../../stores/messageStore';
import Styles        from '../../../styles/components/shared/modal.sass';

export default class MessageModal extends React.Component {

  constructor() {
    super()
    this.cid = MessageStore.register(this);
  }

  componentWillUnmount() {
    MessageStore.unregister(this.cid);
  }

  options() {
    let options = MessageStore.getOptions();
    let buttons = [];
    let i       = 0;
    for (i = 0; i < options.length; i++) {
      buttons.push(
        <a
          className={`button ${options[i]['color'] || 'red'}`}
          onClick={options[i]['onclick']}
        >
          {options[i]['text']}
        </a>
      );
    }
    return (
      <div>
        {buttons}
      </div>
    );
  }

  render() {
    let message = MessageStore.getMessage();
    if (message !== null && message !== undefined) {
      return(
        <div className='message-modal'>
          <div className='modal-header'>
            Error Code: {MessageStore.getErrorCode()}
          </div>
          <div className='modal-body'>
            <p>{message}</p>
          </div>
          <div className='modal-footer'>
            {this.options()}
          </div>
        </div>
      );
    }
    return null;
  }
 
}