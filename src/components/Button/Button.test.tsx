import { Button, ButtonProps } from '@/components/Button/Button';
import { theme } from '@/styles';
import { render, screen } from '@/tests/utils';

const renderComponent = ({ label, props }: { props?: ButtonProps; label?: string } = {}) =>
  render(
    <Button {...props} data-testid='button'>
      {label}
    </Button>,
  );

describe('Components - Button', () => {
  test('render', () => {
    renderComponent();
    expect(screen.getByTestId('button')).toBeInTheDocument();
    expect(screen.getByTestId('button')).not.toHaveAttribute('disabled');
    expect(screen.getByTestId('button')).toHaveStyle(`cursor: pointer`);
  });

  test('color blue', () => {
    renderComponent();
    expect(screen.getByTestId('button')).toHaveStyle(`background-color: ${theme.color.blue}`);
  });

  test('color green', () => {
    renderComponent({ props: { color: 'green' } });
    expect(screen.getByTestId('button')).toHaveStyle(`background-color: ${theme.color.green}`);
  });

  test('color red', () => {
    renderComponent({ props: { color: 'red' } });
    expect(screen.getByTestId('button')).toHaveStyle(`background-color: ${theme.color.red}`);
  });

  test('color gray', () => {
    renderComponent({ props: { color: 'gray' } });
    expect(screen.getByTestId('button')).toHaveStyle(`background-color: ${theme.color.gray}`);
  });

  test('color black', () => {
    renderComponent({ props: { color: 'black' } });
    expect(screen.getByTestId('button')).toHaveStyle(`background-color: ${theme.color.black}`);
  });

  test('disabled', () => {
    renderComponent({ props: { disabled: true } });
    expect(screen.getByTestId('button')).toHaveAttribute('disabled');
    expect(screen.getByTestId('button')).toHaveStyle(`cursor: initial`);
  });
});
