import styled from 'styled-components';

export const Nav = styled.div`
  margin: 30px 120px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: #444;
  }

  div {
    display: flex;
    flex-direction: row;

    a {
      padding: 10px 16px;
      border: none;
      color: #fff;
      font-weight: bold;
      height: 36px;
      min-width: 112px;
      background: #cccccc;
      border-radius: 4px;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 8px;
      }
    }

    button {
      background: #ee4d64;

      height: 36px;
      min-width: 112px;

      margin-left: 10px;
      padding: 10px 16px;
      border: none;
      color: #fff;
      font-weight: bold;
      height: 36px;
      min-width: 112px;

      border-radius: 4px;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        margin-right: 8px;
      }
    }
  }
`;

export const InputFilds = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    color: #444;
    font-size: 14px;
    font-weight: bold;

    input {
      border: 1px solid #ddd;
      background: #fff;
      font-size: 16px;
      height: 45px;
      border-radius: 4px;
      width: 100%;
      padding: 10px;
      color: #666;
      margin-top: 8px;
      font-weight: normal;
    }

    input.readOnly {
      background: #f5f5f5;
      max-width: 198px;
    }

    > span {
      color: red;
      font-weight: normal;
    }
  }
  div.formline {
    display: flex;
    justify-content: space-between;

    strong {
      margin-bottom: auto;
    }
    span {
      margin: 0;
      font-weight: normal;
    }
  }
  /*
  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 45px;
    width: 100%;
  } */
`;
