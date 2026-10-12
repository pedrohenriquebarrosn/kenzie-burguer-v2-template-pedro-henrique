import styled from 'styled-components';

export const StyledCartProductCard = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid #eef1ee;

  .imageBox {
    flex: 0 0 74px;
    display: grid;
    place-items: center;
    width: 74px;
    height: 74px;
    overflow: hidden;
    border-radius: 12px;
    background: #f3f7f4;

    img { width: 100%; height: 100%; object-fit: contain; }
  }

  .contentBox {
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 12px;
  }

  .productInfo {
    min-width: 0;

    h3 {
      font-size: 0.93rem;
      color: #26372d;
      line-height: 1.35;
    }

    .unitPrice {
      margin-top: 4px;
      color: #697d6f;
      font-size: 0.78rem;
    }
  }

  .quantityControls {
    display: inline-flex;
    align-items: center;
    gap: 0;
    margin-top: 11px;
    border: 1px solid #d6e8dc;
    border-radius: 9px;
    overflow: hidden;

    button {
      display: grid;
      place-items: center;
      width: 32px;
      height: 30px;
      background: #eef7f1;
      color: #277245;

      &:hover { background: #d7eee0; }
      &:focus-visible { outline: 2px solid #269b56; outline-offset: -2px; }
    }
    output {
      min-width: 30px;
      text-align: center;
      color: #223f2d;
      font-size: 0.86rem;
      font-weight: 700;
    }
  }

  .itemActions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    gap: 12px;

    .removeItem {
      display: grid;
      place-items: center;
      width: 28px;
      height: 28px;
      background: transparent;
      color: #7b8780;
      &:hover { color: #c83737; }
      &:focus-visible { outline: 2px solid #269b56; }
    }

    .lineSubtotal {
      font-size: 0.87rem;
      font-weight: 750;
      color: #23864b;
      white-space: nowrap;
    }
  }

  @media (max-width: 450px) {
    gap: 9px;
    .imageBox { flex-basis: 58px; width: 58px; height: 58px; }
    .contentBox { gap: 6px; }
    .itemActions .lineSubtotal { font-size: 0.82rem; }
  }
`;
