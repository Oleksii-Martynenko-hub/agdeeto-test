import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { createLocationActions } from '@/store/actions/create-location';
import { getLocationAsync, locationActions } from '@/store/actions/location';
import { selectLocationState } from '@/store/selectors/location';

import GoogleMapSearchApi from '@/components/common/GoogleMapSearchApi';
import Loader from '@/components/common/Loader';
import Button from '@/components/common/Button';
import SkeletonPage from '@/components/common/SkeletonPage';
import SvgIcon from '@/components/common/SvgIcon';
import PageNotFound from '@/containers/PageNotFound';
import { PATH } from '@/containers/App';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import ImagesList from '@/components/CreateLocation/ImagesList';
import { CopyToClipboardMessage } from '@/components/LinkLocation/Messages';

interface Props extends RouteComponentProps<{ id: string }> {}

const Location: React.FC<Props> = ({ match }) => {
  const dispatch = useDispatch();

  const { isLoading, isRejected, location } = useSelector(selectLocationState);
  const { address, description, images } = location;

  const [isCopyToClipboard, setCopyToClipboard] = useState(false);

  const { id } = match.params;

  const generatedLink = `${window.location.origin}/location/${id}`;

  useEffect(() => {
    dispatch(getLocationAsync(id));
  }, []);

  const handleClickShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'gdeeto.com',
        text: location.address,
        url: generatedLink,
      });
    } else {
      handleClickCopy();
    }
  };

  const handleClickCopy = () => {
    copyToClipboard(generatedLink);
    setCopyToClipboard(true);
  };

  const handleClickResetState = () => {
    dispatch(createLocationActions.reset());
    dispatch(locationActions.reset());
  };

  const handleAnimationEnd = () => setCopyToClipboard(false);

  return (
    <>
      {isLoading ? <Loader size={100} /> : (
        <SkeletonPage title={address}>
          {isRejected ? <PageNotFound /> : (
            <>
              <WrapDescription>
                <Description>{description}</Description>
              </WrapDescription>

              <GoogleMapSearchApi isLocationPage />

              {!!(images.length) && <ImagesList isLocationPage images={images} />}

              <Button customStyled={ButtonShare} onclick={handleClickShare}>
                <PlusSvgIcon>
                  <SvgIcon icon="share-2" />
                </PlusSvgIcon>
                {isCopyToClipboard ? 'Not support' : 'Share'}
              </Button>
              <Button onclick={handleClickResetState}>
                <PlusSvgIcon>
                  <SvgIcon icon="map-pin-plus" fill="currentColor" strokeWidth={0} />
                </PlusSvgIcon>
                <NavLink to={PATH.ROOT}>Create new location</NavLink>
              </Button>
              {isCopyToClipboard
                  && <CopyToClipboardMessage onAnimationEnd={handleAnimationEnd} />}
            </>
          )}
        </SkeletonPage>
      )}
    </>
  );
};

const ButtonShare = css`
  margin: 0 0 10px 0;
`;

const PlusSvgIcon = styled.div`
  width: 26px;
  height: 26px;
  margin: 0 10px 0 -15px;
`;

const WrapDescription = styled.div`
  flex: 0 0 auto;
  margin: 0 0 10px 0;
  overflow: hidden;
  position: relative;
`;

const Description = styled.p`
  color: #252525;
  margin: 0;
  line-height: 20px;
  font-size: 14px;
  overflow: hidden auto;
  -webkit-overflow-scrolling: touch;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Location;
