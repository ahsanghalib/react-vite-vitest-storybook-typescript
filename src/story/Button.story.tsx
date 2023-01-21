import { Button as Component, ButtonProps } from '@/components';
import { toBoolean, toEnum, toStr } from './utils';
import { Story } from '@storybook/react';

export default {
  title: 'Components',
  argTypes: { onClick: { action: 'clicked' } },
};

const Template: Story<ButtonProps> = ({ ...props }) => <Component {...props}>Button</Component>;

export const Button = Template.bind({});

Button.argTypes = {
  color: toEnum(['blue', 'green', 'red', 'mp_green', 'gray', 'black']),
  disabled: toBoolean(),
  borderRadius: toStr(),
  fullWidth: toBoolean(),
  width: toStr(),
  p: toStr(),
  hoverColor: toStr(),
};

Button.args = {
  color: 'blue',
  fullWidth: false,
  disabled: false,
  borderRadius: 10,
};
