import styled from 'styled-components';

export const StyledLoginPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .flexGrid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;

    .left,
    .right {
      width: 100%;
    }

    .formBox {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 20px;

      form,
      button,
      a {
        width: 100%;
      }

      p {
        max-width: 280px;
      }
    }

    @media (max-width: 750px) {
      flex-direction: column-reverse;
      .ballsImage {
        display: none;
      }
    }
  }

  background: #f7faf8;
  padding: 22px 0;

  .flexGrid {
    gap: clamp(26px, 5vw, 70px);
    .formBox {
      max-width: 460px;
      margin: auto;
      padding: 32px;
      border: 1px solid #e3eee7;
      border-radius: 18px;
      box-shadow: 0 14px 45px rgba(31,72,42,.055);
      gap: 15px;
      > h2 { font-size: 1.55rem; }
      > p { max-width: 100%; line-height: 1.55; }
    }
  }
  @media (max-width: 750px) {
    .flexGrid {
      .right { display: none; }
      .left { width: 100%; }
      .formBox { padding: 25px 20px; }
    }
  }
`;
