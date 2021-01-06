import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

interface Props {}

const UploadPhoto: React.FC<Props> = () => {
  const [filesState, setFilesState] = useState<File[]>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = event;
    const fileList = files ? Array.from(files) : [];
    setFilesState(fileList);
  };

  const renderFiles = () => {
    filesState?.map((File) => console.log(File.name));
  };

  return (
    <UploadStyled>
      <li>
        <LabelStyled>
          <InputPhotoStyled type="file" multiple onChange={handleChange} />
        </LabelStyled>
      </li>
      <button onClick={renderFiles} type="button">button</button>
    </UploadStyled>
  );
};

const UploadStyled = styled.ul`
  width: 100%;
  height: 15%;
  min-height: 80px;
  max-height: 200px;
  padding: 10px;
  margin: 0;
  margin-bottom: 20px;
  border: 1px solid #a8a8a8;
  font-size: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;
const LabelStyled = styled.label`
  display: block;
`;
const InputPhotoStyled = styled.input`
  
  outline: none;
`;

export default UploadPhoto;
