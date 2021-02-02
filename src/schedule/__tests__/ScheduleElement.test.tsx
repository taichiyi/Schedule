/** @jsx ScheduleReact.createElement */
import ScheduleReact from '../index'
import { SCHEDULEREACT_ELEMENT_TYPE } from '../ScheduleReactSymbols';

test('allows a string to be passed as the type', () => {
  const element = <div />;
  expect(element.type).toBe('div');
  expect(element.key).toBe(null);
  expect(element.props).toEqual({});
});

it('uses the fallback value when in an environment without Symbol', () => {
  expect((<div /> as any).$$typeof).toBe(SCHEDULEREACT_ELEMENT_TYPE);
});
