import styled from "styled-components";
import { AnimationFadeIn } from "../../styles/animations";

export const StyledCartModalBox = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100vh;

    background: rgba(51, 51, 51, .5);
    z-index: 1001;

    dialog{
        animation: ${AnimationFadeIn} .5s;
        width: 100%;
        max-width: 500px;
        background: ${({theme}) => theme.colors.white};

        header{
            display: flex;
            background: ${({theme}) => theme.colors.primary};
            padding: 12px 20px;

            h2{
                color: ${({theme}) => theme.colors.white};
            }

            button{
                background: transparent;
                color: ${({theme}) => theme.colors.white};
                opacity: .5;
                transition: .4s;

                :hover{
                    opacity: 1;
                }
            }
        }

        .cartBox{
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 20px;

            @media (max-width: 450px){
                padding: 15px;
            }
        }
    }

  inset: 0;
  padding: 16px;
  background: rgba(17,32,22,.56);

  dialog {
    display: block;
    max-width: 510px;
    max-height: calc(100dvh - 32px);
    overflow: auto;
    border-radius: 18px;
    box-shadow: 0 24px 70px rgba(12,28,17,.24);

    header {
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 18px 22px;
      background: #238b4f;
      h2 { font-size: 1.05rem; }
      button {
        display: grid;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background: rgba(255,255,255,.14);
        opacity: 1;
        &:hover { background: rgba(255,255,255,.24); }
        &:focus-visible { outline: 2px solid white; outline-offset: 2px; }
      }
    }
    .cartBox {
      padding: 22px;
      .emptyBox { padding: 30px 10px; }
    }
  }
  @media (max-width: 450px) {
    padding: 10px;
    dialog {
      max-height: calc(100dvh - 20px);
      .cartBox { padding: 16px; }
    }
  }
  @media (prefers-reduced-motion: reduce) {
    dialog { animation: none; }
  }
`