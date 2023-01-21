import { lighten, mpGetter } from '@/styles';
import styled from 'styled-components';

export type ButtonProps = {
  htmlType?: string;
  disabled?: boolean;
  borderRadius?: number;
  fullWidth?: boolean;
  width?: number;
  height?: number;
  color?: 'blue' | 'green' | 'mp_green' | 'gray' | 'red' | 'black' | string;
  p?: number;
  px?: number;
  py?: number;
  m?: number;
  disabledColor?: string;
  hoverColor?: string;
  same?: boolean;
};

export const Button = styled.button.attrs<ButtonProps>((props) => ({
  type: props.htmlType || 'button',
  disabled: props.disabled,
}))<ButtonProps>`
  border: none;
  outline: none;
  box-sizing: border-box;
  text-align: center;
  font-family: inherit;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ borderRadius = '10' }) => (borderRadius ? `${borderRadius}rem` : '')};
  width: ${({ fullWidth = false, width }) => (fullWidth ? '100%' : width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  padding: ${({ p }) => (p ? `${p}rem ${p * 4.5}rem` : `0.25rem ${0.25 * 4.5}rem`)};
  padding-left: ${({ px }) => (px ? `${px}rem` : '')};
  padding-right: ${({ px }) => (px ? `${px}rem` : '')};
  padding-top: ${({ py }) => (py ? `${py}rem` : '')};
  padding-bottom: ${({ py }) => (py ? `${py}rem` : '')};
  margin: ${({ m }) => (m ? mpGetter(m) : '')};
  cursor: ${({ disabled }) => (disabled ? 'initial' : 'pointer')};
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ color, theme }) =>
    color === 'blue'
      ? theme.color.blue
      : color === 'green'
      ? theme.color.green
      : color === 'gray'
      ? theme.color.gray
      : color === 'red'
      ? theme.color.red
      : color === 'black'
      ? theme.color.black
      : color || theme.color.blue};

  &:disabled {
    background-color: ${({ disabledColor = '#151515' }) => disabledColor};
    border: 1px solid #707070;
  }

  &:hover {
    ${({ disabled, hoverColor, color, same }) =>
      disabled
        ? 'background-color: #505050'
        : hoverColor
        ? `background-color: ${hoverColor}`
        : same
        ? `background-color: ${color}`
        : ''};
    ${lighten(0.2)}
  }
`;
