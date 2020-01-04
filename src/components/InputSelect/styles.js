import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .asyncInput {
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 45px;
    justify-content: center;
    input {
      /* padding: 5px; */
      height: 35px;
    }
  }

  span {
    margin-left: 10px;
    color: red;
    font-size: 14px;
  }
`;
