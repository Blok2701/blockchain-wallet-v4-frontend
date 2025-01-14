import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Modal, ModalBody, ModalHeader } from 'blockchain-info-components'
import Announcements from 'components/Announcements'

const SendHeader = styled(ModalHeader)`
  border-bottom: 0;
  padding-bottom: 8px;
  > div:first-child * {
    color: ${props => props.theme['brand-primary']};
  }
`

const SendBtc = props => (
  <Modal size='medium' position={props.position} total={props.total}>
    <SendHeader icon='send' onClose={props.closeAll}>
      <FormattedMessage
        id='modals.sendbitcoin.title'
        defaultMessage='Send Bitcoin'
      />
    </SendHeader>
    <Announcements type='service' alertArea='send' currentCoin='BTC' />
    <ModalBody>{props.children}</ModalBody>
  </Modal>
)

SendBtc.propTypes = {
  position: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  closeAll: PropTypes.func.isRequired
}

export default SendBtc
