import styled from '@emotion/styled';

import { Form as RemixForm } from '@remix-run/react';

export const Form = styled(RemixForm)`
  display: flex;
  flex-direction: column;
  gap: var(--offset-xl);
  width: 45rem;
`;

export const Field = styled.p`
  display: flex;
  gap: var(--offset-xl);
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  flex: 1;
  font-weight: var(--font-size-bold);
  font-size: var(--font-size-m);
`;

export const Input = styled.input`
  flex: 2;
  padding: var(--offset-m);
  color: var(--color-text);
  font-size: var(--font-size-m);
  border: none;
  border-radius: var(--border-radius);
  outline: none;
  transition: box-shadow var(--transition-duration-normal) ease-in-out;

  &:focus {
    box-shadow: var(--box-shadow);
  }
`;
