import styled from 'styled-components';

export const StyledShopPage = styled.div`
  min-height: 100vh;
  background: #f8faf9;

  main {
    padding: 26px 0 70px;
  }

  .demoNotice {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    margin: 0 0 30px;
    padding: 14px 16px;
    background: #edf7f0;
    border: 1px solid #d1ead8;
    border-radius: 12px;
    color: #205b38;
    font-size: 0.85rem;
    line-height: 1.55;

    svg {
      flex-shrink: 0;
      margin-top: 1px;
    }
  }

  .catalogIntro {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    margin-bottom: 28px;

    .eyebrow {
      display: block;
      margin-bottom: 8px;
      color: #217849;
      font-size: 0.72rem;
      font-weight: 750;
      letter-spacing: 0.12em;
    }

    h1 {
      color: #26342d;
      font-size: clamp(1.55rem, 3vw, 2.2rem);
      font-weight: 750;
      line-height: 1.2;
      letter-spacing: -0.035em;
    }

    p {
      margin-top: 9px;
      color: #67786e;
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .productCount {
      flex-shrink: 0;
      padding: 9px 12px;
      border: 1px solid #dce9e0;
      border-radius: 99px;
      background: white;
      color: #42634d;
      font-size: 0.8rem;
      font-weight: 600;
    }
  }

  @media (max-width: 620px) {
    main { padding: 18px 0 40px; }
    .demoNotice { font-size: 0.8rem; margin-bottom: 24px; }
    .catalogIntro {
      display: block;
      margin-bottom: 22px;
      .productCount { display: inline-block; margin-top: 16px; }
    }
  }
`;
