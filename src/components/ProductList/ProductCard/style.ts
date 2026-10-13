import styled from 'styled-components';

export const StyledProductCard = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e1ebe5;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(30, 65, 45, 0.035);
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;

  &:hover {
    border-color: #b8d7c2;
    box-shadow: 0 12px 28px rgba(30, 65, 45, 0.09);
    transform: translateY(-2px);
  }

  .imageBox {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 205px;
    padding: 0;
    background: #f1f6f3;

    img {
      display: block;
      width: 100%;
      height: 205px;
      object-fit: cover;
    }
  }

  .content {
    display: flex;
    align-items: stretch;
    flex-direction: column;
    flex: 1;
    gap: 9px;
    padding: 20px;

    h3 {
      color: #25392d;
      font-size: 1.08rem;
      line-height: 1.35;
    }

    .category {
      color: #718376;
      font-size: 0.83rem;
    }

    .price {
      margin-top: auto;
      padding-top: 13px;
      font-size: 1.15rem;
      font-weight: 750;
      color: #1c8348;
    }

    button {
      width: 100%;
      margin-top: 8px;
      height: 44px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover { transform: none; }
  }
`;
