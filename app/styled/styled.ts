import styled from '@emotion/styled';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--offset-xl);
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--offset-xl);
`;

export const P = styled.p`
  color: var(--color-text);
  font-size: var(--font-size-xxl);
`;
