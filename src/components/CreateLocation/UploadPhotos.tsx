import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { createLocationActions, uploadImageAsync } from '@/store/actions/create-location';
import { selectCreateLocationState } from '@/store/selectors/create-location';

import SvgIcon from '@/components/common/SvgIcon';
import ImagesList from '@/components/CreateLocation/ImagesList';
import Loader from '../common/Loader';

const UploadPhoto: React.FC = () => {
  const dispatch = useDispatch();

  const {
    isLoadingImage,
    isRejectedImage,
    location: { images },
  } = useSelector(selectCreateLocationState);

  const [isDragOver, setDragOver] = useState(false);

  const uploadImage = (files: FileList | null) => {
    if (files && images.length < 5) {
      const fd = new FormData();
      fd.append('file', files[0]);

      dispatch(uploadImageAsync(fd, files[0].name));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e;
    uploadImage(files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaultsSetDragOver(e, false);
    const { dataTransfer: { files } } = e;
    uploadImage(files);
  };

  const handleDragStartOver = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaultsSetDragOver(e, true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaultsSetDragOver(e, false);
  };

  const preventDefaultsSetDragOver = (e: React.DragEvent<HTMLDivElement>, dragOver: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(dragOver);
  };

  const handleAnimationEnd = () => dispatch(createLocationActions.setIsRejectedImage(false));

  return (
    <UploadWrap>
      {!!(images.length) && (
        <ImagesList images={images} />
      )}

      {images.length < 5 && (
        <WrapDropZone>
          <DropZone
            onDrop={handleDrop}
            onDragStart={handleDragStartOver}
            onDragOver={handleDragStartOver}
            onDragLeave={handleDragLeave}
            isDragOver={isDragOver}
          >
            <UploadSvgIcon>
              {isLoadingImage ? <Loader size={56} /> : <SvgIcon icon="upload" />}
            </UploadSvgIcon>

            <PlaceholderWrap>
              <Placeholder>Drop the image</Placeholder>
              <Placeholder>&nbsp;or click here</Placeholder>
            </PlaceholderWrap>

            <Label>
              <InputPhoto type="file" accept="image/*" onChange={handleChange} />
            </Label>
          </DropZone>

          {isRejectedImage && (
            <ErrorUploadImage onAnimationEnd={handleAnimationEnd}>
              <ErrorSvgIcon>
                <SvgIcon icon="x-circle" />
              </ErrorSvgIcon>

              <ErrorMessage>Sorry, not support this format of the image.</ErrorMessage>
            </ErrorUploadImage>
          )}
        </WrapDropZone>
      )}
    </UploadWrap>
  );
};

const animationFadeOutError = keyframes`
  0% { opacity: 0; height: calc(50% - 20px); }
  5% { opacity: 1; height: calc(100% - 20px); }
  95% { opacity: 1; height: calc(100% - 20px); }
  100% { opacity: 0; height: 0; }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => (theme.palette.red)};
  font-size: 16px;
  line-height: 21px;
  margin: 0;
  font-weight: 500;
  width: 100%;
`;

const ErrorSvgIcon = styled.div`
  display: block;
  height: 45px;
  flex: 0 0 65px;
  margin-right: 10px;
`;

const ErrorUploadImage = styled.div`
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  background: #fff;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  padding: 4px;
  top:  10px;
  right: 10px;
  border-radius: 4px;
  border: 1px dashed ${({ theme }) => (theme.palette.red)};
  color: ${({ theme }) => (theme.palette.red)};
  overflow: hidden;
  animation: ${animationFadeOutError} 5s linear 0s forwards;
`;

const UploadSvgIcon = styled.div`
  width: 70px;
  height: 56px;
  flex: none;
`;

const PlaceholderWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: wrap;
  padding: 0 10px;
  flex: auto;
`;

const Placeholder = styled.span`
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const Label = styled.label`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const WrapDropZone = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  z-index: 4;
  position: relative;
`;

const DropZone = styled.div<{ isDragOver: boolean }>`
  width: 100%;
  height: 74px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px dashed ${({ isDragOver, theme }) => (isDragOver ? theme.palette.blue : '#e3e6ef')};
  border-radius: 4px;
  z-index: 4;
  cursor: pointer;
  color: ${({ isDragOver, theme }) => (isDragOver ? theme.palette.blue : 'rgb(147 149 160)')};

  &:hover {
    border: 1px dashed ${({ theme }) => (theme.palette.blue)};
    color: ${({ theme }) => (theme.palette.blue)};
  }
`;

const UploadWrap = styled.div`
  order: 1;
  width: 100%;
  padding: 0;
  margin: 0 0 20px 0;
  border-radius: 4px;
  border: 1px solid #e3e6ef;
`;

const InputPhoto = styled.input`
  display: none;
`;

export default UploadPhoto;
