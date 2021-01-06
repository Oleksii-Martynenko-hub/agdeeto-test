import React from 'react';
import styled from 'styled-components';

interface Props {}

const PhotosSlider: React.FC<Props> = () => 
<PhotosSliderStyled>
  Photos
</PhotosSliderStyled>;

const PhotosSliderStyled = styled.div`
  width: 100%;
  height: 200px;
  line-height: 200px;
  border: 1px solid #8aadc5;
  text-align: center;
  font-size: 45px;
  text-transform: uppercase;
  color: #8aadc5;
`;

export default PhotosSlider;
