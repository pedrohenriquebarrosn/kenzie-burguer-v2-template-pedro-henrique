import styled from 'styled-components';

export const StyledRegisterPage = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .formBox {
    display: flex;
    flex-direction: column;
    gap: 20px;

    header {
      display: flex;
      align-items: center;
      gap: 20px;
      justify-content: space-between;

      a {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 0.875rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray300};

        white-space: nowrap;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .flexGrid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;

    .left,
    .right {
      width: 100%;
    }

    @media (max-width: 750px) {
      .left {
        display: none;
      }
    }
  }

  background: #f7faf8;
  padding: 24px 0;

  .formBox {
    width: 100%;
    max-width: 465px;
    margin: auto;
    padding: 28px;
    background: #fff;
    border: 1px solid #e3eee7;
    border-radius: 18px;
    box-shadow: 0 14px 45px rgba(31,72,42,.055);
  }
  @media (max-width: 750px) {
    .flexGrid {
      gap: 0;
      .right { width: 100%; }
    }
    .formBox { padding: 22px 18px; }
  }
`;
