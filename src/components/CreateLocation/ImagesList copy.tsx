import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { createLocationActions } from '@/store/actions/create-location';
import { ImageI } from '@/store/reducers/create-location';

import { API_URL } from '@/api/MainApi';
import Loader from '@/components/common/Loader';
import SvgIcon from '@/components/common/SvgIcon';
import PhotosSlider from '@/components/Location/PhotosSlider';

interface Props {
  images: ImageI[];
  isLoading: boolean;
  isRejected: boolean;
}

const ImagesList: React.FC<Props> = ({ images, isLoading, isRejected }) => {
  const dispatch = useDispatch();

  const [isZoomed, setIsZoomed] = useState(false);

  const handleClickImageDelete = (id: string) => () => {
    dispatch(createLocationActions.deleteImage(id));
  };

  const handleClickImageZoom = () => setIsZoomed(!isZoomed);

  const handleAnimationEnd = () => dispatch(createLocationActions.setIsRejected(false));

  return (
    <ImagesListStyled>
      {!!(images.length && isZoomed)
      && <PhotosSlider onclick={handleClickImageZoom} imagesFromCreateLocation={images} isZoom />}

      {images.map(({ id, name }) => (
        <ItemImage key={id}>
          <Image src={`${API_URL}/images/${id}`} onClick={handleClickImageZoom} />

          <ImageName>{name}</ImageName>

          <SuccessSvgIcon>
            <SvgIcon icon="check-circle" />
            <SuccessMessage>uploaded</SuccessMessage>
          </SuccessSvgIcon>

          <WrapButtons>
            <MaximizeSvgIcon onClick={handleClickImageZoom}>
              <SvgIcon icon="maximize-2" />
            </MaximizeSvgIcon>

            <DeleteSvgIcon onClick={handleClickImageDelete(id)}>
              <SvgIcon icon="trash" />
            </DeleteSvgIcon>
          </WrapButtons>
        </ItemImage>
      ))}

      {isLoading && (
        <ItemImage>
          <Loader />
        </ItemImage>
      )}

      {isRejected && (
        <ErrorUploadImage onAnimationEnd={handleAnimationEnd}>
          <ErrorSvgIcon>
            <SvgIcon icon="x-circle" />
          </ErrorSvgIcon>

          <ErrorMessage>Sorry, not support this format of the image.</ErrorMessage>
        </ErrorUploadImage>
      )}
    </ImagesListStyled>
  );
};

const animationFadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const animationFadeOutError = keyframes`
  0% { opacity: 0; height: 55px; }
  10% { opacity: 1; height: 55px; }
  90% { opacity: 1; height: 55px; }
  100% { opacity: 0; height: 0; }
`;

const Image = styled.img`
  display: block;
  object-fit: cover;
  object-position: center;
  width: 80px;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #e3e6ef;
  position: relative;
  z-index: 4;
  cursor: zoom-in;
`;

const ImageName = styled.p`
  width: calc(100% - 80px);
  font-size: 13px;
  line-height: 16px;
  margin: 0;
  padding: 0 0 2px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: none;
`;

const SuccessMessage = styled.p`
  font-size: 15px;
  line-height: 28px;
  margin: 0;
  padding: 0 7px;
  border: 1px dashed;
  border-radius: 4px;
  text-transform: uppercase;
  width: 97px;
  position: relative;
  top: 24px;
  left: 93px;
`;

const SuccessSvgIcon = styled.div`
  color: ${({ theme }) => (theme.palette.green)};
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 4;
  display: block;
  border: none !important;
  animation: ${animationFadeOut} 0.5s linear 2.5s forwards;

  & > svg {
    width: 80px;
    height: 55px;
    position: absolute;
    padding: 8px;
    background: rgb(0 0 0 / 50%);
    border-radius: 4px;
    top: 0;
    left: 0;
  }
`;

const MaximizeSvgIcon = styled.div`
  color: rgb(147 149 160);
  cursor: zoom-in;
  margin-right: 12px;
`;

const DeleteSvgIcon = styled.div`
  color: rgb(147 149 160);
  cursor: url('/assets/cursor-del.png') 5 3, not-allowed;
`;

const WrapButtons = styled.div`
  width: calc(100% - 80px);
  display: flex;
  justify-content: flex-end;
  padding: 6px 0 0 10px;

  ${MaximizeSvgIcon},
  ${DeleteSvgIcon} {
    display: block;
    width: 30px;
    height: 30px;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid #e3e6ef;

    &:hover {
      background: #e3e6ef;
    }
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => (theme.palette.red)};
  font-size: 15px;
  line-height: 18px;
  margin: 0;
  font-weight: 500;
  padding: 8px 20px 0 75px;
  width: 100%;
`;

const ErrorSvgIcon = styled.div`
  position: absolute;
  display: block;
  top: 8px;
  left: 27px;
  width: 36px;
  height: 36px;
`;

const ItemImage = styled.li`
  width: 100%;
  height: 55px;
  display: flex;
  flex-flow: column wrap;
  list-style: none;
  position: relative;
  border-radius: 4px;
  margin-bottom: 10px;
  
  &:hover {
    background: rgba(227, 230, 239, 0.3);

    ${ImageName} {
      box-shadow: 1px 5px 7px -5px #e3e6ef;
    }

    ${WrapButtons} {
      ${MaximizeSvgIcon} {
        color: ${({ theme }) => (theme.palette.blue)};
      }
      ${DeleteSvgIcon} {
        color: ${({ theme }) => (theme.palette.red)};
      }
    }
  }
`;

const ErrorUploadImage = styled(ItemImage)`
  border: 1px dashed ${({ theme }) => (theme.palette.red)};
  color: ${({ theme }) => (theme.palette.red)};
  overflow: hidden;
  animation: ${animationFadeOutError} 5s linear 0s forwards;
`;

const ImagesListStyled = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
`;

export default ImagesList;
