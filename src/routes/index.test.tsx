import { render } from '@/tests/utils';
import { AppRoutes } from './index';

const renderComponent = () => render(<AppRoutes />);

it('Render', () => {
  renderComponent();
  expect(true);
});
