import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { createLocationActions, createLocationAsync } from '@/store/actions/create-location';
import { selectCreateLocationState } from '@/store/selectors/create-location';

import GoogleMapSearchApi from '@/components/common/GoogleMapSearchApi';
import Button from '@/components/common/Button';
import InputLabel from '@/components/common/InputLabel';
import SkeletonPage from '@/components/common/SkeletonPage';
import SvgIcon from '@/components/common/SvgIcon';
import UploadPhotos from '@/components/CreateLocation/UploadPhotos';
import { PATH } from '@/containers/App';
import { selectLocationId } from '@/store/selectors/location';
import { ErrorPostLocationMessage } from '@/components/LinkLocation/Messages';
import Loader from '@/components/common/Loader';

const CreateLocation: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, location } = useSelector(selectCreateLocationState);
  const { address, description, coordinates } = location;
  const id = useSelector(selectLocationId);

  const [isVisibleInvalidMessages, setVisibleInvalidMessages] = useState(false);

  const isValidAddress = !!(address.length > 2);
  const isValidDescription = !!(description.length > 2);
  const isValidCoordinates = !!(coordinates.lat !== 49 && coordinates.lng !== 32);
  const isValid = isValidAddress && isValidDescription && isValidCoordinates;

  const InvalidMessages = [
    {
      mess: address ? 'Address length must be more than 2 letters.' : 'Please fill "Address" field.',
      isValid: isValidAddress,
    },
    {
      mess: description ? 'Description length must be more than 2 letters.' : 'Please fill the "Description" field.',
      isValid: isValidDescription,
    },
    {
      mess: 'Please select point on the map.',
      isValid: isValidCoordinates,
    },
  ];

  useEffect(() => {
    if (id) history.push(PATH.LOCATION + id);
  }, [id]);

  const submitHandler = () => {
    if (!isValid) {
      setVisibleInvalidMessages(true);
      return;
    }
    dispatch(createLocationAsync());
  };

  const handleChange = (e: { target: { value: string; }; }) => {
    dispatch(createLocationActions.setDescription(e.target.value));
  };

  const handleMessageAnimationEnd = () => setVisibleInvalidMessages(false);

  return (
    <SkeletonPage title="Create your location">
      {isLoading ? <Loader size={120} /> : (
        <>
          <GoogleMapSearchApi notValid={isVisibleInvalidMessages} isSearch isCreatingLocation />

          <InputLabel
            isValid={isValidDescription}
            required
            left={85}
          >
            <span>Description</span>
            <Description
              notValid={isVisibleInvalidMessages}
              isValid={isValidDescription}
              value={description}
              onChange={handleChange}
              placeholder="Describe how to find your location"
              required
            />
          </InputLabel>

          <UploadPhotos />

          <Button
            customStyled={ButtonStyled}
            onclick={submitHandler}
          >
            <PlusSvgIcon>
              <SvgIcon icon="map-pin-plus" fill="currentColor" strokeWidth={0} />
            </PlusSvgIcon>
            Create Location
          </Button>
          {isVisibleInvalidMessages && (
            <ErrorPostLocationMessage
              InvalidMessages={InvalidMessages}
              onAnimationEnd={handleMessageAnimationEnd}
            />
          )}
        </>
      )}
    </SkeletonPage>
  );
};

const ButtonStyled = css`
  margin-top: auto;
`;

const PlusSvgIcon = styled.div`
  width: 26px;
  height: 26px;
  margin: 0 10px 0 -15px;
`;

const Description = styled.textarea<{ isValid: boolean, value: string, notValid: boolean }>`
  width: 100%;
  height: calc(100% - 26px);
  padding: 10px;
  border: 1px solid ${({
    isValid,
    value,
    notValid,
    theme,
  }) => (value || notValid
    ? (isValid ? theme.palette.green : theme.palette.red)
    : '#e3e6ef'
  )};
  resize: none;
  border-radius: 4px;  
  z-index: 1;

  &:hover {
    border: 1px solid ${({ theme }) => (theme.palette.blue)};
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(95, 99, 242, 0.2);
    border: 1px solid ${({ isValid, value, theme }) => (value
    ? (isValid ? theme.palette.green : theme.palette.red)
    : theme.palette.blue
  )};
  }
`;

export default CreateLocation;
