import styled from 'styled-components';

export const StyledProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;

  .emptyState {
    grid-column: 1 / -1;
    text-align: center;
    padding: 55px 24px;
    background: #fff;
    border: 1px dashed #c8ddce;
    border-radius: 16px;
    color: #35473d;

    h2 { font-size: 1.15rem; margin-bottom: 8px; }
    p { color: #6e8175; font-size: 0.9rem; }
  }

  @media (max-width: 940px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  @media (max-width: 580px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
`;
