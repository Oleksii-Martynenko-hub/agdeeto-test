import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { createLocationActions } from '@/store/actions/create-location';
import { locationActions } from '@/store/actions/location';
import { selectCreateLocationState } from '@/store/selectors/create-location';
import { selectLocationId } from '@/store/selectors/location';

import { copyToClipboard } from '@/utils/copy-to-clipboard';
// import GoogleMapSearchApi from '@/components/common/GoogleMapSearchApi';
import Loader from '@/components/common/Loader';
import Button from '@/components/common/Button';
import SkeletonPage from '@/components/common/SkeletonPage';
import SvgIcon from '@/components/common/SvgIcon';
import { CopyToClipboardMessage, ErrorMessage, SuccessMessage } from '@/components/LinkLocation/Messages';
import { PATH } from '@/containers/App';

const LinkLocation: React.FC = () => {
  const dispatch = useDispatch();

  const { isLoading, isRejected, location } = useSelector(selectCreateLocationState);
  const id = useSelector(selectLocationId);

  const [isCopyToClipboard, setCopyToClipboard] = useState(false);

  const generatedLink = `${window.location.origin}/location/${id}`;

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

  const handleClickBtnBackCreate = () => {
    dispatch(createLocationActions.setIsRejected(false));
  };

  const handleClickCreateNewLocation = () => {
    dispatch(createLocationActions.reset());
    dispatch(locationActions.reset());
  };

  const handleAnimationEnd = () => setCopyToClipboard(false);

  return (
    <SkeletonPage title="Link generated">
      {isLoading ? <Loader size={120} /> : (
        <>
          {isRejected ? (
            <>
              <WrapMessages>
                <ErrorMessage />
              </WrapMessages>

              <Button onclick={handleClickBtnBackCreate}>
                <NavLink to={PATH.ROOT}>
                  <PlusSvgIcon>
                    <SvgIcon icon="map-pin-plus" fill="currentColor" strokeWidth={0} />
                  </PlusSvgIcon>
                  Back to create
                </NavLink>
              </Button>
            </>
          ) : (
            <>
              <WrapTitle>
                <ArrowDownSvgIcon>
                  <SvgIcon icon="arrow-down" />
                </ArrowDownSvgIcon>
                <TitleLink>Click on the link to open</TitleLink>
              </WrapTitle>

              <NavLinkWrap>
                <NavLinkStyled to={PATH.LOCATION + id} target="_blank">
                  {generatedLink}
                </NavLinkStyled>

                <WrapButtonsLink>
                  {isCopyToClipboard
                  && <CopyToClipboardMessage onAnimationEnd={handleAnimationEnd} />}

                  <Button width="40px" onclick={handleClickCopy} customStyled={ButtonsLinkStyled}>
                    <CopySvgIcon>
                      <SvgIcon icon="clipboard" />

                      <LinkSvgIcon>
                        <SvgIcon icon="link-2" strokeWidth={3} />
                      </LinkSvgIcon>
                    </CopySvgIcon>
                  </Button>

                  <Button width="40px" onclick={handleClickShare} customStyled={ButtonsLinkStyled}>
                    <ShareSvgIcon>
                      <SvgIcon icon="share-2" />
                    </ShareSvgIcon>
                  </Button>
                </WrapButtonsLink>
              </NavLinkWrap>

              <WrapMessages>
                <SuccessMessage />
              </WrapMessages>

              {/* <GoogleMapSearchApi isRejected={!id} isLinkLocation /> */}

              <ButtonWrap>
                <Button width="100%" onclick={handleClickCreateNewLocation}>
                  <NavLink to={PATH.ROOT}>
                    <PlusSvgIcon>
                      <SvgIcon icon="map-pin-plus" fill="currentColor" strokeWidth={0} />
                    </PlusSvgIcon>
                    Create new location
                  </NavLink>
                </Button>
              </ButtonWrap>
            </>
          )}
        </>
      )}
    </SkeletonPage>
  );
};

const NavLinkWrap = styled.div`
  width: 100%;
  position: relative;
  padding: 0 55px 0 20px;
  margin: 0 0 30px 0;
  border-radius: 4px;
  border: 1px solid #e3e6ef;
  white-space: nowrap;
`;

const NavLinkStyled = styled(NavLink)`
  text-align: center;
  line-height: 110px;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  width: 100%;
  height: 100%;
  font-size: 15px;
  text-decoration: none;
  color: ${({ theme }) => (theme.palette.blue)};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => (theme.palette.dark)};
  }
`;

const LinkSvgIcon = styled.div`
  width: 14px;
  height: 12px;
  position: absolute;
  transform: translate(7px, -18px) rotate(90deg);
`;

const CopySvgIcon = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  top: calc(50% - 15px);
  left: calc(50% - 14px);
`;

const ShareSvgIcon = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  top: calc(50% - 12px);
  left: calc(50% - 12px);
`;

const PlusSvgIcon = styled.div`
  width: 26px;
  height: 26px;
  margin: 0 10px 0 -15px;
`;

const ArrowDownSvgIcon = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 11px;
  left: 110px;
`;

const ButtonsLinkStyled = css`
  position: relative;
`;

const WrapButtonsLink = styled.div`
  width: 40px;
  height: 90px;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  flex-flow: column wrap;
`;

const ButtonWrap = styled.div`
  width: 100%;
  order: 1;
`;

const TitleLink = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const WrapTitle = styled.div`
  width: 100%;
  position: relative;
  margin: 0 0 14px 0;
`;

const WrapMessages = styled.div`
  width: 100%;
  margin: 5px 0 20px 0;
  order: -1;
  position: relative;
`;

export default LinkLocation;
