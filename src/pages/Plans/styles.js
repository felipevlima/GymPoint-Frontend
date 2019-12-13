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
      display: flex;
      align-items: center;
      max-width: 237px;
      max-height: 36px;
      margin-left: 16px;
      border-radius: 4px;

      background: #ee4d64;
      border: none;

      padding: 10px 16px;

      a {
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: row;
        font-weight: bold;
        text-align: center;
        margin-top: -2px;

        div {
          margin-right: 8px;

          svg {
            margin-top: -1px;
          }
        }
      }
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

export const Price = styled.td`
  text {
    margin-left: 1115px;
  }
`;
