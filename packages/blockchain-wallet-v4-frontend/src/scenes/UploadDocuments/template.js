import { FasIdBadge, FasIdCard, FasPassport } from '@blockchain-com/components'
import { FormattedMessage } from 'react-intl'
import { prop } from 'ramda'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import styled from 'styled-components'

import {
  Button,
  HeartbeatLoader,
  Link,
  Text,
  TextGroup
} from 'blockchain-info-components'

const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border: 1px solid ${props => props.theme['brand-tertiary']};
  border-radius: 4px;
  padding: 4px;
  width: 100%;
`
const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
`
const FilesList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`
const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  & > * {
    fill: ${props => props.theme['brand-primary']};
  }
`
const IdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 20px;

  & > * {
    padding-bottom: 12px;
  }
`
const UploadButton = styled(Button)`
  margin-top: 16px;
`
const UploadZone = styled(Dropzone)`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${props => props.theme['white']};
  border: 1px solid ${props => props.theme['brand-tertiary']};
  border-radius: 8px;
  padding: 8px;
`
const UploadZoneContainer = styled.div`
  padding: 16px;
  border: 1px dashed ${props => props.theme['brand-tertiary']};
  border-radius: 8px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 35px;
  box-sizing: border-box;
  background-color: ${props => props.theme['gray-1']};

  @media (max-width: 760px) {
    flex-direction: column;
  }
`

const isMobile = window.matchMedia('(max-width: 760px)')

const UploadDocuments = ({
  data,
  deleteFileAt,
  files,
  onDropAccepted,
  onSubmit,
  openDropzone,
  setDropzoneRef,
  submitted,
  loading
}) => (
  <Wrapper>
    <TextContainer>
      <TextGroup inline>
        <Text color='brand-primary' size='16px' weight={400}>
          <FormattedMessage
            id='scenes.uploaddoc.hello'
            defaultMessage='Hello '
          />
        </Text>
        <Text color='brand-primary' size='16px' weight={400}>
          {prop('firstName', data)},
        </Text>
      </TextGroup>
      <Text color='brand-primary' size='16px' weight={400}>
        <FormattedMessage
          id='scenes.uploaddoc.verify'
          defaultMessage='We need to verify your identity in order to allow buys,
          sells or exchanges.'
        />
      </Text>
      <Text color='brand-primary' size='16px' weight={400}>
        <FormattedMessage
          id='scenes.uploaddoc.docs'
          defaultMessage='Please upload the following documents: '
        />
      </Text>
      {prop('documentsTypes', data) &&
        data.documentsTypes.map((type, index) => (
          <Text color='brand-primary' key={index} size='24px' weight={600}>
            {type}
          </Text>
        ))}
      {/* Add back when link is provided */}
      {/* <Link>
        <FormattedMessage
          id='scenes.uploaddoc.need'
          defaultMessage='Why do you need this?'
        />
      </Link> */}
    </TextContainer>
    <UploadZoneContainer>
      <UploadZone
        accept='image/jpeg, application/pdf, image/png'
        disableClick
        onDropAccepted={onDropAccepted}
        ref={setDropzoneRef}
      >
        {files.length === 0 ? (
          <Fragment>
            {isMobile.matches ? (
              <Link onClick={openDropzone} weight={500}>
                <FormattedMessage
                  id='scenes.uploaddoc.browsefiles'
                  defaultMessage='Browse files'
                />
              </Link>
            ) : (
              <Fragment>
                <Text color='brand-primary' size='20px' weight={400}>
                  <FormattedMessage
                    id='scenes.uploaddoc.dragdrop'
                    defaultMessage='Drag &amp; Drop'
                  />
                </Text>
                <TextGroup inline>
                  <Text color='brand-primary' weight={400}>
                    <FormattedMessage
                      id='scenes.uploaddoc.placefiles'
                      defaultMessage='Place your files here, '
                    />
                  </Text>
                  <Link onClick={openDropzone} weight={500}>
                    <FormattedMessage
                      id='scenes.uploaddoc.browse'
                      defaultMessage='or browse'
                    />
                  </Link>
                </TextGroup>
              </Fragment>
            )}
            <Icons>
              <IdContainer>
                <FasPassport />
                <Text color='brand-primary' size='12px' weight={400}>
                  <FormattedMessage
                    id='scenes.uploaddoc.passport'
                    defaultMessage='Passport'
                  />
                </Text>
              </IdContainer>
              <IdContainer>
                <FasIdBadge />
                <Text color='brand-primary' size='12px' weight={400}>
                  <FormattedMessage
                    id='scenes.uploaddoc.drivinglicense'
                    defaultMessage='Driving license'
                  />
                </Text>
              </IdContainer>
              <IdContainer>
                <FasIdCard />
                <Text color='brand-primary' size='12px' weight={400}>
                  <FormattedMessage
                    id='scenes.uploaddoc.idcard'
                    defaultMessage='ID Card'
                  />
                </Text>
              </IdContainer>
            </Icons>
          </Fragment>
        ) : (
          <Fragment>
            <FilesList>
              {files.map((file, index) => (
                <FileContainer key={index}>
                  <FileInfo>
                    <Text color='brand-primary' size='12px' weight={400}>
                      {file.name}
                    </Text>
                    <Text color='brand-primary' size='12px' weight={400}>
                      {`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                    </Text>
                  </FileInfo>
                  <Text
                    color='gray-3'
                    cursor='pointer'
                    onClick={() => deleteFileAt(index)}
                    size='12px'
                    weight={400}
                  >
                    <FormattedMessage
                      id='scenes.uploaddoc.deletedoc'
                      defaultMessage='Delete'
                    />
                  </Text>
                </FileContainer>
              ))}
            </FilesList>
            <Link cursor='pointer' onClick={openDropzone} weight={500}>
              <FormattedMessage
                id='scenes.uploaddoc.browsecomputer'
                defaultMessage='Browse my computer'
              />
            </Link>
          </Fragment>
        )}
        <Text color='gray-3' size='14px' weight={400}>
          <FormattedMessage
            id='scenes.uploaddoc.filesize'
            defaultMessage='Please upload a JPG, PNG or PDF up to 3MB in size.'
          />
        </Text>
        {files.length > 0 && (
          <UploadButton nature='primary' onClick={onSubmit} disabled={loading}>
            {loading ? (
              <HeartbeatLoader height='20px' width='20px' color='white' />
            ) : (
              <FormattedMessage
                id='scenes.uploaddoc.uploadnow'
                defaultMessage='Upload Now'
              />
            )}
          </UploadButton>
        )}
      </UploadZone>
    </UploadZoneContainer>
  </Wrapper>
)

UploadDocuments.propTypes = {
  data: PropTypes.object,
  deleteFileAt: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  onDropAccepted: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  openDropzone: PropTypes.func.isRequired,
  setDropzoneRef: PropTypes.func.isRequired
}

export default UploadDocuments
