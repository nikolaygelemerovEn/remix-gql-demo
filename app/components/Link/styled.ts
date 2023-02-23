import styled from '@emotion/styled';

import { Link as RemixLink } from '@remix-run/react';

import type { LinkProps } from './types';

export const Link = styled(RemixLink)<LinkProps>`
  display: flex;
  gap: var(--offset-xl);
  align-items: center;
  justify-content: center;
  padding: var(--offset-xl);
  color: var(--color-text);
  font-size: var(--font-size-xxl);
  text-decoration: none;
  background-color: ${(props) => `var(--color-${props.variant})`};
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
`;
