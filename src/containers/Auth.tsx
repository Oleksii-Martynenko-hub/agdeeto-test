import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { authRestoreAsync, loginActions } from '@/store/actions/login';

import Button from '@/components/common/Button';
import InputLabel from '@/components/common/InputLabel';
import SkeletonPage from '@/components/common/SkeletonPage';
import SvgIcon from '@/components/common/SvgIcon';
import { PATH } from '@/containers/App';
import { ErrorPostLocationMessage } from '@/components/LinkLocation/Messages';
import Loader from '@/components/common/Loader';
import { selectLoginState } from '@/store/selectors/login';

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, isPending, isResolved, isRejected } = useSelector(selectLoginState);
  const { email, password } = user;

  const [isVisibleInvalidMessages, setVisibleInvalidMessages] = useState(false);
  const [isEyeOff, setIsEyeOff] = useState(true);

  const isValidEmail = !!(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
  const isValidPassword = password.length > 5;
  const isValid = isValidEmail && isValidPassword;

  const InvalidMessages = [
    {
      mess: email ? 'Please enter a valid email address.' : 'Please fill the "Email" field.',
      isValid: isValidEmail,
    },
    {
      mess: password ? 'Please enter a valid password.' : 'Please fill the "Password" field.',
      isValid: isValidPassword,
    },
  ];

  const submitHandler = () => {
    if (!isValid) {
      setVisibleInvalidMessages(true);
      return;
    }
    dispatch(authRestoreAsync());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'Email') dispatch(loginActions.setEmail(value));
    if (name === 'Password') dispatch(loginActions.setPassword(value));
  };

  const handleMessageAnimationEnd = () => setVisibleInvalidMessages(false);

  const handleClickEye = () => setIsEyeOff(!isEyeOff);

  return (
    <SkeletonPage title="Authentication">
      <InputLabel
        isValid={isValidEmail}
        required
        left={46}
        icon="mail"
      >
        <span>Email</span>
        <Email
          notValid={isVisibleInvalidMessages}
          isValid={isValidEmail}
          value={email}
          name="Email"
          type="email"
          onChange={handleChange}
          placeholder="username@email.com"
          required
        />
      </InputLabel>
      <InputLabel
        isValid={isValidPassword}
        required
        left={76}
        icon="lock"
        iconEye={[true, isEyeOff, handleClickEye]}
      >
        <span>Password</span>
        <Password
          notValid={isVisibleInvalidMessages}
          isValid={isValidPassword}
          value={password}
          onChange={handleChange}
          name="Password"
          type={isEyeOff ? 'password' : 'text'}
          placeholder="••••••"
          required
        />
      </InputLabel>

      <ButtonsWrap>
        <Button
          customStyled={ButtonStyled}
          onclick={submitHandler}
        >
          <PlusSvgIcon>
            <SvgIcon icon="log-in" />
          </PlusSvgIcon>
          Sign in
        </Button>
        <Button
          customStyled={ButtonStyled}
          onclick={submitHandler}
        >
          <PlusSvgIcon>
            <SvgIcon icon="user-plus" />
          </PlusSvgIcon>
          Sign up
        </Button>
      </ButtonsWrap>
      {isVisibleInvalidMessages && (
        <ErrorPostLocationMessage
          InvalidMessages={InvalidMessages}
          onAnimationEnd={handleMessageAnimationEnd}
        />
      )}
    </SkeletonPage>
  );
};

const ButtonStyled = css`
  flex: 0 0 calc(50% - 10px);
  font-size: 15px;
`;

const ButtonsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 0 0 0;
`;

const PlusSvgIcon = styled.div`
  width: 24px;
  height: 24px;
  margin: 0 10px 0 0;
`;

const Email = styled.input<{ isValid: boolean, value: string, notValid: boolean }>`
  width: 100%;
  height: calc(100% - 26px);
  padding: 10px 10px 10px 40px;
  border: 1px solid ${({
    isValid,
    value,
    notValid,
    theme,
  }) => (value || notValid
    ? (isValid ? theme.palette.green : theme.palette.red)
    : '#e3e6ef'
  )};
  resize: none;
  border-radius: 4px;  
  z-index: 1;

  &:hover {
    border: 1px solid ${({ theme }) => (theme.palette.blue)};
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(95, 99, 242, 0.2);
    border: 1px solid ${({ isValid, value, theme }) => (value
    ? (isValid ? theme.palette.green : theme.palette.red)
    : theme.palette.blue
  )};
  }
`;

const Password = styled(Email)`

  /* &::placeholder {
    padding: 5px 0 0 0;
    position: relative;
    top: 5px;
    font-weight: 900;
  } */
`;

export default Auth;
