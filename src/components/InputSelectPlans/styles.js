import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 200px;
  max-width: 240px;

  .selectInput {
    height: 45px;
    min-width: 200px;

    input {
      height: 31px;
    }
  }
`;
