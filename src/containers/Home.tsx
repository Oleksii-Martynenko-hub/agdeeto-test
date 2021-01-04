import FormToDo from '@/components/FormToDo';
import ToDoList from '@/components/ToDoList';
import React from 'react';
import styled from 'styled-components';

interface Props {}

const Home: React.FC<Props> = () => 
<HomeStyled>
  <FormToDo />
  <ToDoList />
</HomeStyled>;

const HomeStyled = styled.div``;

export default Home;
