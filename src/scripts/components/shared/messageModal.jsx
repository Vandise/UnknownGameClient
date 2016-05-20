import React  from 'react';
import Styles from '../../../styles/components/shared/modal.sass';

export default class MessageModal extends React.Component {

  render() {
    let error = this.props.error;
    if (error !== null && error !== undefined) {
      return(
        <div className='message-modal'>
          <div className='modal-header'>
            Error Code: {error.code}
          </div>
          <div className='modal-body'>
            <p>{error.message}</p>
          </div>
          <div className='modal-footer'>
            <a className='button red'>{error.buttonText || 'Ok'}</a>
          </div>
        </div>
      );
    }
    return null;
  }
 
}