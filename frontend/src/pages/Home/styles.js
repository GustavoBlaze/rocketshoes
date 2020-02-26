import styled, { keyframes, css } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import { darken } from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const LoadingIcon = styled(FaSpinner)`
  animation: ${rotate} 2000ms infinite linear;
`;

export const Container = styled.div`
  padding-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  strong {
    font-size: 22px;
    color: white;
    margin-bottom: 20px;
  }
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  ${props => {
    let styles = '';
    for (let i = 0; i < props.length; i += 1) {
      styles += `
        li:nth-child(${i + 1}) {
          animation: product-card-appear 300ms;
          animation-fill-mode: backwards;
          animation-delay: ${i * 50}ms;
        }
      `;
    }
    return css`
      ${styles}
    `;
  }}

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      max-width: 250px;
      align-self: center;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#7159c1')};
      }
      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
