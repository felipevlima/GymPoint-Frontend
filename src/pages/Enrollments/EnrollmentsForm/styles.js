import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 34px;

  input {
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 45px;
    min-width: 250px;

    padding: 10px;

    :disabled {
      background: #f3f3f3;
    }
  }

  strong {
    font-size: 16px;
    font-weight: bold;
    color: #444444;
    margin-bottom: 10px;
  }
`;

export const Header = styled.div`
  margin: 0 120px 10px 120px;
  font-family: Roboto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
    font-weight: bold;
    color: #444444;
  }

  div {
    display: flex;
    flex-direction: row;

    a {
      padding: 10px 16px;
      border: none;
      color: #fff;
      font-weight: bold;
      font-size: 15px;
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

export const ColumnFilds = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const InLineFilds = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
`;
