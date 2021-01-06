import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { formPlaceActions } from '@/store/actions/formPlace';
import { selectFormPlaceValues } from '@/store/selectors/formPlace';

interface Props {}

const CreateLocation: React.FC<Props> = () => {
  const values = useSelector(selectFormPlaceValues);
  const dispatch = useDispatch();

  const logValues = () => {
    dispatch(formPlaceActions.setValues(values));
    console.log(values);
    navigator.clipboard.writeText('http://agdeeto.com/location/:id_test');
  };

  return (
    <CreateLocationStyled>
      <MessageStyled>
        <span role="img" aria-label="ok">👍</span>
        Your location has been successfully created
      </MessageStyled>
      <LinkLocationStyled>
        <NavLinkStyled to="/location/:id_test">http://agdeeto.com/location/:id_test</NavLinkStyled>
        <CopyBtnStyled onClick={logValues} type="button">
          Copy
          <span role="img" aria-label="ok">📎</span>
        </CopyBtnStyled>
        <ShareBtnStyled onClick={logValues} type="button">
          Share
          <span role="img" aria-label="ok">↗️</span>
        </ShareBtnStyled>
      </LinkLocationStyled>
    </CreateLocationStyled>
  );
};

const CreateLocationStyled = styled.div`
  width: 100%;
  height: 100vh;
  padding: 22px;
  min-height: 100vh;
  max-height: 100%;
  background: linear-gradient(to bottom, #ececff, #cbf7ff, #e1ffeb);
  display: flex;
  flex-flow: column;
  justify-content: center;
`;
const LinkLocationStyled = styled.div`
  width: 100%;
  border: none;
  color: #000;
  margin-bottom: 20px;
  border-radius: 6px;
  background: #fff;
  display: flex;
  flex-flow: wrap;
`;
const MessageStyled = styled.p`
  width: 100%;
  font-size: 21px;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
  margin-bottom: 30px;
  &>span {
    display: block;
    font-size: 45px;
    margin-bottom: 20px;
  }
`;
const NavLinkStyled = styled(NavLink)`
  text-align: center;
  line-height: 60px;
  width: 100%;
  border-radius: 6px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: #d8d8d8;
  font-size: 15px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;
const ShareBtnStyled = styled.button`
  width: 50%;
  height: 40px;
  position: relative;
  border: none;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
  background: #a3c7e9;
  color: #000;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  &>span {
    margin-left: 7px;
  }
  &:active,
  &:hover {
    background: #80a3c4;
  }
`;
const CopyBtnStyled = styled.button`
  width: 50%;
  height: 40px;
  position: relative;
  border: none;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background: #a3c7e9;
  color: #000;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  &>span {
    margin-left: 7px;
  }
  &:active,
  &:hover {
    background: #80a3c4;
  }
`;

export default CreateLocation;
