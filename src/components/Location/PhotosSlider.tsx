import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { ImageI } from '@/store/reducers/create-location';
import { selectLocationValues } from '@/store/selectors/location';

import { API_URL } from '@/api/MainApi';
import SvgIcon from '@/components/common/SvgIcon';

interface Props {
  isZoom?: boolean;
  imagesFromCreateLocation?: ImageI[];
  onclick?: () => void;
}

const PhotosSlider: React.FC<Props> = ({ isZoom = false, imagesFromCreateLocation, onclick }) => {
  const isImagesFromCreateLocation = () => {
    if (isZoom) return imagesFromCreateLocation!.map((image) => image.id);

    return [...useSelector(selectLocationValues).images];
  };

  const images = isImagesFromCreateLocation();

  const { length } = images;
  const [current, setCurrent] = useState(0);
  const [isZoomed, setIsZoomed] = useState(isZoom);
  const [transition, setTransition] = useState(2);

  const handleClickPrev = () => {
    if (current) {
      setCurrent(current - 1);
      return;
    }

    setCurrent(-1);

    setTimeout(() => {
      setTransition(0);
      setCurrent(length - 1);
    }, 200);

    setTimeout(() => {
      setTransition(2);
    }, 220);
  };

  const handleClickNext = () => {
    if (current !== length - 1) {
      setCurrent(current + 1);
      return;
    }

    setCurrent(length);

    setTimeout(() => {
      setTransition(0);
      setCurrent(0);
    }, 200);

    setTimeout(() => {
      setTransition(2);
    }, 220);
  };

  const handleClickItemZoom = () => {
    setIsZoomed(!isZoomed);
    onclick!();
  };

  return (
    <SliderWrap isZoomed={isZoomed}>
      {length > 1
        ? (
          <>
            <BtnPrev onClick={handleClickPrev} />

            <BtnNext onClick={handleClickNext} />

            <BtnZoom onClick={handleClickItemZoom}>
              {isZoomed
                ? <SvgIcon icon="minimize" />
                : <SvgIcon icon="maximize" />}
            </BtnZoom>

            <Slider current={current} transition={transition}>
              <SliderItem>
                <Image
                  src={`${API_URL}/images/${images[length - 1]}`}
                  alt={`photo ${images[length - 1]}`}
                />
              </SliderItem>

              {
                images.map((id) => (
                  <SliderItem onClick={handleClickItemZoom} key={id}>
                    <Image src={`${API_URL}/images/${id}`} alt={`photo ${id}`} />
                  </SliderItem>
                ))
              }

              <SliderItem>
                <Image src={`${API_URL}/images/${images[0]}`} alt={`photo ${images[0]}`} />
              </SliderItem>
            </Slider>
          </>
        )
        : (
          <Slider current={-1} transition={transition}>
            <SliderItem onClick={handleClickItemZoom}>
              <Image src={`${API_URL}/images/${images[0]}`} alt={`photo ${images[0]}`} />
            </SliderItem>
          </Slider>
        )}
    </SliderWrap>
  );
};

const Slider = styled.ul<{current: number, transition: number }>`
  margin: 0;
  padding: 0;
  min-width: 100%;
  position: relative;
  left: ${({ current }) => (`-${current + 1}00%`)};
  display: flex;
  align-items: center;
  flex-flow: nowrap;
  -webkit-overflow-scrolling: touch;
  list-style: none;
  transition: ${({ transition }) => (`all 0.${transition}s`)};

  &::-webkit-scrollbar {
    display: none;
  }  
`;

const SliderItem = styled.li`
  padding: 0;
  flex: 0 0 100%;
  width: 100%;
`;

const BtnPrev = styled.button`
  position: absolute;
  z-index: 1;
  border: none;
  border-radius: 0 50% 50% 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 50px;
  background: rgba(0, 0, 0, 0.3);
  cursor: pointer;

  &:active {
    background: rgba(0, 0, 0, 0.5);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 4px;
    border-radius: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-10px, -8px) rotate(-50deg);
    background: #fff;
  }

  &::after {
    transform: translate(-10px, 5px) rotate(50deg);
    width: 20px;
  }
`;

const BtnNext = styled(BtnPrev)`
  left: calc(100% - 50px);
  border-radius: 50% 0 0 50%;

  &::before,
  &::after {
    transform: translate(-10px, -8px) rotate(50deg);
  }
  
  &::after {
    transform: translate(-10px, 5px) rotate(-50deg);
  }
`;

const BtnZoom = styled(BtnPrev)`
  border-radius: 4px;
  top: calc(100% - 30px);
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  width: 40px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  

  &:active {
    background: rgba(0, 0, 0, 0.5);
  }

  &::before,
  &::after {
    display: none;
  }
`;

const Image = styled.img`
  border-radius: 4px;
  display: block;
  object-position: center;
  width: 100%;
  height: 100%;
`;

const SliderWrap = styled.div<{ isZoomed: boolean }>`
  width: ${({ isZoomed }) => (isZoomed ? '100vw' : '100%')};
  height: ${({ isZoomed }) => (isZoomed ? '100vh' : 'auto')};
  border-radius: ${({ isZoomed }) => (isZoomed ? '0' : '4px')};
  margin: ${({ isZoomed }) => (isZoomed ? '0' : '20px 0 20px')};
  background: rgba(0, 0, 0, 0.95);
  z-index: ${({ isZoomed }) => (isZoomed ? '15' : '1')};
  position: ${({ isZoomed }) => (isZoomed ? 'fixed' : 'relative')};
  display: flex;
  top: 0;
  left: 0;
  order: 1;
  overflow: hidden;

  ${SliderItem} {
    cursor: ${({ isZoomed }) => (isZoomed ? 'zoom-out' : 'zoom-in')};
    height: ${({ isZoomed }) => (isZoomed ? '100%' : '240px')}
  }

  ${Image} {
    object-fit: ${({ isZoomed }) => (isZoomed ? 'contain' : 'cover')};
  }

  ${BtnZoom} {
    top: ${({ isZoomed }) => (isZoomed ? 'calc(100% - 50px)' : 'calc(100% - 30px)')};
    left: ${({ isZoomed }) => (isZoomed ? 'calc(100% - 50px)' : '50%')};
    height: ${({ isZoomed }) => (isZoomed ? '50px' : '40px')};
    width: ${({ isZoomed }) => (isZoomed ? '50px' : '40px')};
    cursor: ${({ isZoomed }) => (isZoomed ? 'zoom-out' : 'zoom-in')};
  }
`;

export default PhotosSlider;
