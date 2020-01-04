import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 30px 120px;
`;

export const Nav = styled.div`
  padding-bottom: 20px;
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

export const FormInserts = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

  strong {
    font-size: 14px;
    font-weight: bold;
  }

  input {
    &:focus {
      border: 1px solid #ee4d64;
    }
  }
`;

export const NumbersDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 -16px;

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 16px;

    strong {
      margin: 20px 0 8px 0;
      color: #444;
    }

    input {
      height: 45px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding-left: 10px;

      :disabled {
        background: ${darken(0.05, '#FFF')};
      }
    }
  }
`;

export const StringDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: -16px 0 0 0;

  div {
    display: flex;
    flex-direction: column;

    width: 100%;

    strong {
      margin: 20px 0 8px 0;
      color: #444;
    }

    input {
      height: 45px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding-left: 10px;
    }
  }
`;
