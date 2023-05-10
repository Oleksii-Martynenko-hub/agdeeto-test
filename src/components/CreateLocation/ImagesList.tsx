import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { createLocationActions } from '@/store/actions/create-location';

import { API_URL } from '@/api/MainApi';
// import HorizontalScroll from '@/utils/horizontal-scroll';
import SvgIcon from '@/components/common/SvgIcon';
import Loader from '../common/Loader';

interface Props {
  images: string[];
  isLocationPage?: boolean;
}

const ImagesList: React.FC<Props> = ({ images, isLocationPage = false }) => {
  const dispatch = useDispatch();

  const ImagesListRef = useRef<HTMLUListElement | null>(null);
  const [isLoadedImages, setIsLoadedImages] = useState(false);
  const [lengthLoadImage, setLengthLoadImage] = useState(0);

  // const horizontalScroll = ImagesListRef.current && new HorizontalScroll(ImagesListRef.current);

  // const [numberInterval, setNumberInterval] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollImagesList, setScrollImagesList] = useState({ start: 0, scrollLeft: 0, end: 0 });

  useEffect(() => {
    if (images.length === lengthLoadImage) setIsLoadedImages(true);
  }, [lengthLoadImage]);

  const handleClickImageDelete = (id: string) => () => {
    dispatch(createLocationActions.deleteImage(id));
  };

  const handleOnLoadImage = () => {
    setLengthLoadImage(lengthLoadImage + 1);
  };

  const handleMouseDownList = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    setIsMouseDown(true);

    // setNumberInterval(horizontalScroll?.onMouseDown(e.pageX)!);

    setScrollImagesList({
      start: e.pageX,
      scrollLeft: ImagesListRef.current!.scrollLeft,
      end: e.pageX,
    });
  };

  const handleMouseMoveList = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    if (isMouseDown) {
      setScrollImagesList({ ...scrollImagesList, end: e.pageX });
      const translate = scrollImagesList.end - scrollImagesList.start;
      const scrollX = scrollImagesList.scrollLeft - translate;
      ImagesListRef.current!.scrollTo(scrollX < 0 ? 0 : scrollX, 0);
    }
  };

  const handleMouseUpList = () => {
    setIsMouseDown(false);

    // horizontalScroll?.onMouseUp(numberInterval);
  };

  return (
    <ImagesListStyled
      ref={ImagesListRef}
      onMouseDown={handleMouseDownList}
      onMouseMove={handleMouseMoveList}
      onMouseUp={handleMouseUpList}
      onMouseLeave={handleMouseUpList}
      isLoadedImages={isLoadedImages}
      isLocationPage={isLocationPage}
    >
      {!isLoadedImages && (<ItemLoader order={-1}><Loader size={70} /></ItemLoader>)}

      {images.map((id, i) => (
        <ItemImage order={images.length - i} key={id}>
          <Image
            onLoad={handleOnLoadImage}
            src={`${API_URL}/images/${id}`}
          />

          {!isLocationPage && (
            <>
              <SuccessSvgIcon>
                <SvgIcon icon="check-circle" />
              </SuccessSvgIcon>
              <DeleteSvgIcon onClick={handleClickImageDelete(id)}>
                <SvgIcon icon="trash" />
              </DeleteSvgIcon>
            </>
          )}
        </ItemImage>
      ))}
    </ImagesListStyled>
  );
};

const animationFadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const animationFadeIn = keyframes`
  0% { opacity: 0; transform: translateX(-50%) scaleX(0); }
  100% { opacity: 1; transform: translateX(0) scaleX(1); }
`;

const Image = styled.img`
  display: block;
  object-fit: cover;
  object-position: center;
  transition: width 1s;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #e3e6ef;
  position: relative;
`;

const SuccessSvgIcon = styled.div`
  color: ${({ theme }) => (theme.palette.green)};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  display: block;
  border-radius: 4px;
  background: rgb(0 0 0 / 50%);
  animation: ${animationFadeOut} 0.5s linear 2.5s forwards;

  & > svg {
    width: 100px;
    height: 100px;
    position: absolute;
    padding: 8px;
    border-radius: 4px;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
  }
`;

const DeleteSvgIcon = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  padding: 6px;
  top:  -7px;
  right: -7px;
  border-radius: 50%;
  color: ${({ theme }) => (theme.palette.red)};
  border: 1px solid rgb(147 149 160);
  background: #e3e6ef;
  z-index: 1;
  cursor: url('/assets/cursor-del.png') 5 3, not-allowed;

  &:active {
    background: rgb(147 149 160);

  }
`;

const ItemImage = styled.li<{ order: number }>`
  flex: 0 0 auto;
  height: 150px;
  list-style: none;
  position: relative;
  border-radius: 4px;
  justify-content: center;
  order: ${({ order }) => (order)};

  &:not(:first-child) {
    margin-right: 10px;
  }

  &:first-child {
    padding-right: 10px;

    ${SuccessSvgIcon} {
      width: calc(100% - 10px);
    }

    ${DeleteSvgIcon} {
      right: 3px;
    }
  }
`;

const ItemLoader = styled(ItemImage)`
  flex: 0 0 100% !important;
  margin-right: 10px !important;
  opacity: 1 !important;
  transform: translateX(0) scaleX(1) !important;
`;

const ImagesListStyled = styled.ul<{ isLoadedImages: boolean, isLocationPage: boolean }>`
  width: 100%;
  padding: ${({ isLocationPage }) => (isLocationPage ? '10px' : '10px 10px 0 10px')};
  order: ${({ isLocationPage }) => (isLocationPage ? '1' : '0')};
  margin: ${({ isLocationPage }) => (isLocationPage ? '0 0 20px 0' : '0')};
  border: ${({ isLocationPage }) => (isLocationPage ? '1px solid #e3e6ef' : 'none')};
  border-radius: ${({ isLocationPage }) => (isLocationPage ? '4px' : '0')};
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  overflow: scroll hidden;

  ${ItemImage} {
    pointer-events: ${({ isLocationPage }) => (isLocationPage ? 'none' : 'auto')};
    animation: ${animationFadeIn} ${({ isLocationPage }) => (isLocationPage ? 'none' : '.1s linear .1s forwards')};
    opacity: ${({ isLocationPage, isLoadedImages }) => (isLocationPage && isLoadedImages ? '1' : '0')};
    transform: ${({ isLocationPage, isLoadedImages }) => (
      isLocationPage && isLoadedImages ? 'translateX(0) scaleX(1)' : 'translateX(0) scaleX(0)'
    )};

    ${Image} {
      animation: ${animationFadeIn} ${({ isLocationPage }) => (isLocationPage ? 'none' : '.1s linear .1s forwards')} ;
      opacity: ${({ isLocationPage, isLoadedImages }) => (isLocationPage && isLoadedImages ? '1' : '0')};
      transform: ${({ isLocationPage, isLoadedImages }) => (
        isLocationPage && isLoadedImages ? 'translateX(0) scaleX(1)' : 'translateX(0) scaleX(0)'
      )};
    }
  }
`;

export default ImagesList;
