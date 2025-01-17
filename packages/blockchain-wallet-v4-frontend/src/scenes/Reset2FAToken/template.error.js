import { FormattedHTMLMessage } from 'react-intl'
import { Icon, Text } from 'blockchain-info-components'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
`
const ErrorText = styled(Text)`
  > span > span {
    color: ${props => props.theme['gray-5']};
  }
`

const Error = props => {
  return (
    <Wrapper>
      <Icon name='alert-filled' color='red' size='40px' />
      <ErrorText
        size='16px'
        weight={400}
        color='red'
        style={{ 'margin-top': '25px' }}
      >
        <FormattedHTMLMessage
          id='scenes.reset2fatoken.error1'
          defaultMessage='Uh Oh. Something went wrong. Error: {error}'
          values={{ error: props.value }}
        />
      </ErrorText>
    </Wrapper>
  )
}

export default Error
