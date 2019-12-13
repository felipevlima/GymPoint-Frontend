import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1080px;
  margin: 30px auto 0 auto;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  form {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      flex-direction: column;
      strong {
        margin: 10px 0 5px 0;
        color: #444;
      }
      input {
        height: 44px;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding-left: 10px;
        &:focus {
          border: 2px solid #ee4d64;
        }
      }
    }
    button {
      background: #ee4d64;
      border: none;
      color: #fff;
      height: 44px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 4px;
      margin-top: 10px;
      &:hover {
        background: #fff;
        color: #ee4d64;
        border: 2px solid #ee4d64;
      }
    }
  }
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding-bottom: 20px;
  margin-bottom: 10px;
  h1 {
    font-size: 20px;
    font-weight: bold;
    color: #444;
  }
  div {
    a {
      margin-left: 10px;
      padding: 8px 20px;
      border: none;
      color: #fff;
      font-weight: bold;
      height: 34px;
      background: #ee4d64;
      border-radius: 4px;
    }
  }
`;
