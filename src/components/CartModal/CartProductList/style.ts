import styled from "styled-components";

export const StyledCartProductList = styled.div`
   display: flex;
   flex-direction: column;

   ul {
      display: flex;
      flex-direction: column;
      gap: 20px;

      height: 200px;
      overflow: auto;
   }

   .totalBox {
      padding: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      .total {
         font-weight: 700;
         color: ${({ theme }) => theme.colors.gray300};
      }
   }

  ul {
    height: auto;
    max-height: min(43vh, 340px);
    overflow: auto;
    gap: 15px;
  }
  .totalBox {
    margin-top: 16px;
    border-top: 1px solid #e9eee9;
    .total { font-size: 1.1rem; color: #236d3e; }
  }
`;
