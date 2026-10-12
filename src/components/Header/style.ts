import styled from 'styled-components';

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.colors.gray0};
  .flexGrid {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;

    .logo {
      max-width: 160px;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 20px;

      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;

        button {
          background: transparent;
          color: ${({ theme }) => theme.colors.gray150};
          transition: 0.3s;

          :hover {
            color: ${({ theme }) => theme.colors.gray300};
          }
        }
      }
    }

    @media (max-width: 600px) {
      flex-direction: column;
    }

    @media (max-width: 450px) {
      .nav {
        flex-direction: column;
      }
    }
  }

  border-bottom: 1px solid #e8eee9;
  box-shadow: 0 3px 14px rgba(25, 60, 35, .035);

  .flexGrid {
    min-height: 74px;
    gap: 24px;
    padding: 8px 0;

    .logo { width: 155px; height: auto; }
    .nav { flex: 1; justify-content: flex-end; min-width: 0; }

    .buttons {
      gap: 9px;
      button {
        position: relative;
        display: grid;
        place-items: center;
        width: 43px;
        height: 43px;
        border-radius: 11px;
        background: #f0f6f2;
        color: #326346;

        &:hover { background: #e0f1e6; color: #168343; }
        &:focus-visible { outline: 3px solid #8fd6a7; outline-offset: 2px; }

        .cartCount {
          position: absolute;
          top: -5px;
          right: -5px;
          display: grid;
          place-items: center;
          min-width: 20px;
          height: 20px;
          padding: 0 4px;
          border: 2px solid white;
          border-radius: 99px;
          background: #188847;
          color: white;
          font-size: 11px;
          font-weight: 800;
        }
      }
    }
  }

  @media (max-width: 680px) {
    .flexGrid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 12px;
      min-height: auto;
      padding: 12px 0;

      .logo { width: 132px; }
      .nav { display: contents; }
      .buttons { grid-column: 2; grid-row: 1; }
      form { grid-column: 1 / -1; grid-row: 2; max-width: none; }
    }
  }
`;
