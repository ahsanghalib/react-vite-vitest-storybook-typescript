import { render } from '@/tests/utils';
import App from './App';

const renderComponent = () => render(<App />, false);

test('app render', () => {
  renderComponent();
  expect(true);
});
