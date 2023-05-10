import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { createLocationActions } from '@/store/actions/create-location';
import { addToLocationListAsync } from '@/store/actions/login';
import { selectLocationState } from '@/store/selectors/location';

import GoogleMapLocationList from '@/components/LocationList/GoogleMapLocationList';
import Loader from '@/components/common/Loader';
import Button from '@/components/common/Button';
import SkeletonPage from '@/components/common/SkeletonPage';
import SvgIcon from '@/components/common/SvgIcon';
import { PATH } from '@/containers/App';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { selectLoginLocationList } from '@/store/selectors/login';

const LocationList: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, location } = useSelector(selectLocationState);
  const locationList = useSelector(selectLoginLocationList);

  const locationIdList = [
    '6034f3d7b6699500119110ee',
    '60301303b6699500119110eb',
    '602f9f18b6699500119110e9',
  ];

  const generatedLink = window.location.origin + PATH.LOCATION;

  useEffect(() => {
    locationIdList.map((id) => dispatch(addToLocationListAsync(id)));
  }, []);

  const handleClickShare = (id: string) => () => {
    if (navigator.share) {
      navigator.share({
        title: 'gdeeto.com',
        text: location.address,
        url: generatedLink + id,
      });
    } else {
      handleClickCopy(id);
    }
  };

  const handleClickCopy = (id: string) => {
    copyToClipboard(generatedLink + id);
  };

  const handleClickOpenLocation = (id: string) => () => {
    history.push(PATH.LOCATION + id);
  };

  const handleClickResetState = () => {
    dispatch(createLocationActions.reset());
  };

  return (
    <SkeletonPage title="Location list">
      {isLoading ? <Loader size={100} /> : (
        <>
          {locationList.map(({
            _id,
            address,
            description,
            coordinates,
          }) => (
            <Location key={_id}>
              <Address onClick={handleClickOpenLocation(_id)}>{address}</Address>

              <Description>{description}</Description>

              <WrapGoogleMapAndButtons>
                <GoogleMapLocationList
                  coordinates={coordinates}
                  onclick={handleClickOpenLocation(_id)}
                />

                <Button customStyled={ButtonShare} onclick={handleClickShare(_id)}>
                  <PlusSvgIcon>
                    <SvgIcon icon="share-2" />
                  </PlusSvgIcon>
                  Share
                </Button>
              </WrapGoogleMapAndButtons>
            </Location>
          ))}
          <Button customStyled={ButtonCreateNew} onclick={handleClickResetState}>
            <PlusSvgIcon>
              <SvgIcon icon="map-pin-plus" fill="currentColor" strokeWidth={0} />
            </PlusSvgIcon>
            <NavLink to={PATH.ROOT}>Create new location</NavLink>
          </Button>
        </>
      )}
    </SkeletonPage>
  );
};

const ButtonShare = css`
  font-size: 14px;
  padding: 0 10px;
  width: calc((100% / 3) - 4px);
  letter-spacing: -0.2px;
`;

const ButtonCreateNew = css`
  width: 100%;
  margin: 30px 0 0;
`;

const WrapGoogleMapAndButtons = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-flow: wrap;
`;

const PlusSvgIcon = styled.div`
  width: 22px;
  height: 22px;
  margin: 0 7px 0 0;
`;

const Location = styled.div`
  width: 100%;
  margin: 0 -5px 20px -5px;
  padding: 5px;
  color: #252525;
  border-radius: 4px;
  border: 1px solid #e3e6ef;
`;

const Address = styled.h3`
  margin: 0 0 8px 0;
  line-height: 18px;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.p`
  margin: 0 0 8px 0;
  max-height: 50px;
  line-height: 17px;
  font-size: 13px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export default LocationList;
