import styled from 'styled-components';

export const StyledSearchForm = styled.form`
  width: 100%;
  max-width: 280px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  padding: 8px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.gray100};
  transition: 0.4s;

  background: ${({ theme }) => theme.colors.white};

  input {
    width: 100%;
    font-family: ${({ theme }) => theme.fonts.primary};
    height: 40px;
  }

  input:focus {
    outline: none;
  }

  :has(input:focus) {
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  max-width: 375px;
  min-width: 0;
  gap: 8px;
  padding: 5px;
  border: 1px solid #d8e5dc;
  border-radius: 12px;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &:focus-within {
    border-color: #27ae60;
    box-shadow: 0 0 0 3px rgba(39,174,96,.12);
  }

  input {
    flex: 1;
    min-width: 0;
    height: 38px;
    padding: 0 10px;
    font-size: 0.9rem;
    color: #263b2c;
    background: transparent;
    &::placeholder { color: #788d7f; }
  }

  button {
    width: 43px;
    height: 40px;
    flex-shrink: 0;
    padding: 0;
    border-radius: 9px;
  }
`;
