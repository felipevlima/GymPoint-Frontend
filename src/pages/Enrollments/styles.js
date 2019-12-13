import styled from 'styled-components';

export const Container = styled.div`
  margin: 15px 120px;
`;

export const Header = styled.div`
  padding: 15px 0px;
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

    button {
      max-width: 142px;
      max-height: 36px;
      background: #ee4d64;
      border: none;
      border-radius: 4px;
      padding: 0 16px;

      a {
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: row;
        font-weight: bold;
        text-align: center;

        div {
          margin-right: 8px;
        }
      }
    }
  }
`;

export const Search = styled.div`
  display: flex;
  align-items: center;
  max-width: 237px;
  max-height: 36px;
  margin-left: 16px;
  border-radius: 4px;
  border: solid 1px #dddddd;
  background: #ffffff;
  padding: 10px 16px;

  input {
    margin-left: 8px;
    border: none;
    color: #999;

    ::placeholder {
      color: #999999;
      font-size: 14px;
    }
  }
`;

export const Content = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;

  tr {
    color: #666;
    font-size: 16px;
    line-height: 20px;
  }

  tr + tr {
    border-top: 1px solid #eee;
  }

  td,
  th {
    padding: 16px 0;
  }
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: 0;
  font-size: 15px;
  text-align: right;
  color: #de3b3b;
  margin-left: 23px;
`;

export const EditButton = styled.button`
  background: transparent;
  border: 0;
  font-size: 15px;
  text-align: right;
  color: #4d85ee;
`;

export const Buttons = styled.th`
  display: flex;
  justify-content: flex-end;
`;

export const ThAge = styled.th`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Age = styled.td`
  display: flex;
  justify-content: center;
`;
