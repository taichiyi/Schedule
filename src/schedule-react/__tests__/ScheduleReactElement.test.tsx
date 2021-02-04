/** @jsx ScheduleReact.createElement */

let ScheduleReact:any
let originalSymbol:any
let ComponentClass:any

beforeEach(()=>{
  originalSymbol = global.Symbol;
  (global as any).Symbol = undefined;

  ScheduleReact=require('../ScheduleReact')

  ComponentClass = class extends ScheduleReact.Component {
    render() {
      return ScheduleReact.createElement('div');
    }
  };
})

afterEach(()=>{
  global.Symbol=originalSymbol
})

test('uses the fallback value when in an environment without Symbol', () => {
  expect((<div /> as any).$$typeof).toBe(0xeac7);
});

test('returns a complete element according to spec', () => {
  const element = ScheduleReact.createElement(ComponentClass);
  expect(element.type).toBe(ComponentClass);
  expect(element.key).toBe(null);
  expect(element.ref).toBe(null);
  expect(element.props).toEqual({});
});

// test('should warn when `key` is being accessed on composite element', () => {
//   const container = document.createElement('div');
//   class Child extends ScheduleReact.Component {
//     render() {
//       return <div> {this.props.key} </div>;
//     }
//   }
//   class Parent extends ScheduleReact.Component {
//     render() {
//       return (
//         <div>
//           <Child key="0" />
//           <Child key="1" />
//           <Child key="2" />
//         </div>
//       );
//     }
//   }
//   expect(() => ReactDOM.render(<Parent />, container)).toErrorDev(
//     'Child: `key` is not a prop. Trying to access it will result ' +
//       'in `undefined` being returned. If you need to access the same ' +
//       'value within the child component, you should pass it as a different ' +
//       'prop. (https://reactjs.org/link/special-props)',
//   );
// });

test('should warn when `key` is being accessed on a host element', () => {
  const element = <div key="3" />;
  expect(element.props).not.toHaveProperty('key')
  expect(element).toHaveProperty('key')
});

// test('should warn when `ref` is being accessed', () => {
//   const container = document.createElement('div');
//   class Child extends ScheduleReact.Component {
//     render() {
//       return <div> {this.props.ref} </div>;
//     }
//   }
//   class Parent extends ScheduleReact.Component {
//     render() {
//       return (
//         <div>
//           <Child ref="childElement" />
//         </div>
//       );
//     }
//   }
//   expect(() => ReactDOM.render(<Parent />, container)).toErrorDev(
//     'Child: `ref` is not a prop. Trying to access it will result ' +
//       'in `undefined` being returned. If you need to access the same ' +
//       'value within the child component, you should pass it as a different ' +
//       'prop. (https://reactjs.org/link/special-props)',
//   );
// });

test('allows a string to be passed as the type', () => {
  const element = <div />;
  expect(element.type).toBe('div');
  expect(element.key).toBe(null);
  expect(element.props).toEqual({});
});


test('returns an immutable element', () => {
  const element = ScheduleReact.createElement(ComponentClass);
  expect(() => (element.type = 'div')).not.toThrow();
});

test('does not reuse the original config object', () => {
  const config = {foo: 1};
  const element = ScheduleReact.createElement(ComponentClass, config);
  expect(element.props.foo).toBe(1);
  config.foo = 2;
  expect(element.props.foo).toBe(1);
});

test('does not fail if config has no prototype', () => {
  const config = Object.create(null, {foo: {value: 1, enumerable: true}});
  const element = ScheduleReact.createElement(ComponentClass, config);
  expect(element.props.foo).toBe(1);
});

test('extracts key and ref from the config', () => {
  const element = ScheduleReact.createElement(ComponentClass, {
    key: '12',
    ref: '34',
    foo: '56',
  });
  expect(element.type).toBe(ComponentClass);
  expect(element.key).toBe('12');
  expect(element.ref).toBe('34');
  expect(element.props).toEqual({foo: '56'});
});

test('extracts null key and ref', () => {
  const element = ScheduleReact.createElement(ComponentClass, {
    key: null,
    ref: null,
    foo: '12',
  });
  expect(element.type).toBe(ComponentClass);
  expect(element.key).toBe('null');
  expect(element.ref).toBe(null);
  expect(element.props).toEqual({foo: '12'});
});

test('ignores undefined key and ref', () => {
  const props = {
    foo: '56',
    key: undefined,
    ref: undefined,
  };
  const element = ScheduleReact.createElement(ComponentClass, props);
  expect(element.type).toBe(ComponentClass);
  expect(element.key).toBe(null);
  expect(element.ref).toBe(null);
  expect(element.props).toEqual({foo: '56'});
});

test('ignores key and ref warning getters', () => {
  const elementA = ScheduleReact.createElement('div');
  const elementB = ScheduleReact.createElement('div', elementA.props);
  expect(elementB.key).toBe(null);
  expect(elementB.ref).toBe(null);
});

test('coerces the key to a string', () => {
  const element = ScheduleReact.createElement(ComponentClass, {
    key: 12,
    foo: '56',
  });
  expect(element.type).toBe(ComponentClass);
  expect(element.key).toBe('12');
  expect(element.ref).toBe(null);
  expect(element.props).toEqual({foo: '56'});
});

// test('preserves the owner on the element', () => {
//   let element;

//   class Wrapper extends ScheduleReact.Component {
//     render() {
//       element = ScheduleReact.createElement(ComponentClass);
//       return element;
//     }
//   }

//   const instance = ReactTestUtils.renderIntoDocument(
//     ScheduleReact.createElement(Wrapper),
//   );
//   expect(element._owner.stateNode).toBe(instance);
// });

test('merges an additional argument onto the children prop', () => {
  const a = 1;
  const element = ScheduleReact.createElement(
    ComponentClass,
    {
      children: 'text',
    },
    a,
  );
  expect(element.props.children).toBe(a);
});

test('does not override children if no rest args are provided', () => {
  const element = ScheduleReact.createElement(ComponentClass, {
    children: 'text',
  });
  expect(element.props.children).toBe('text');
});

test('overrides children if null is provided as an argument', () => {
  const element = ScheduleReact.createElement(
    ComponentClass,
    {
      children: 'text',
    },
    null,
  );
  expect(element.props.children).toBe(null);
});

test('merges rest arguments onto the children prop in an array', () => {
  const a = 1;
  const b = 2;
  const c = 3;
  const element = ScheduleReact.createElement(ComponentClass, null, a, b, c);
  expect(element.props.children).toEqual([1, 2, 3]);
});

// NOTE: We're explicitly not using JSX here. This is intended to test
// classic JS without JSX.
test('allows static methods to be called using the type property', () => {
  class StaticMethodComponentClass extends ScheduleReact.Component {
    static someStaticMethod: () => string;
    render() {
      return ScheduleReact.createElement('div');
    }
  }
  StaticMethodComponentClass.someStaticMethod = () => 'someReturnValue';

  const element = ScheduleReact.createElement(StaticMethodComponentClass);
  expect(element.type.someStaticMethod()).toBe('someReturnValue');
});

// NOTE: We're explicitly not using JSX here. This is intended to test
// classic JS without JSX.
test('identifies valid elements', () => {
  class Component extends ScheduleReact.Component {
    render() {
      return ScheduleReact.createElement('div');
    }
  }

  expect(ScheduleReact.isValidElement(ScheduleReact.createElement('div'))).toEqual(true);
  expect(ScheduleReact.isValidElement(ScheduleReact.createElement(Component))).toEqual(true);

  expect(ScheduleReact.isValidElement(null)).toEqual(false);
  expect(ScheduleReact.isValidElement(true)).toEqual(false);
  expect(ScheduleReact.isValidElement({})).toEqual(false);
  expect(ScheduleReact.isValidElement('string')).toEqual(false);
  expect(ScheduleReact.isValidElement(Component)).toEqual(false);
  expect(ScheduleReact.isValidElement({type: 'div', props: {}})).toEqual(false);

  const jsonElement = JSON.stringify(ScheduleReact.createElement('div'));
  expect(ScheduleReact.isValidElement(JSON.parse(jsonElement))).toBe(true);
});

// NOTE: We're explicitly not using JSX here. This is intended to test
// classic JS without JSX.
test('is indistinguishable from a plain object', () => {
  const element = ScheduleReact.createElement('div', {className: 'foo'});
  const object = {};
  expect(element.constructor).toBe(object.constructor);
});

// NOTE: We're explicitly not using JSX here. This is intended to test
// classic JS without JSX.
// test('should use default prop value when removing a prop', () => {
//   class Component extends ScheduleReact.Component {
//     static defaultProps: { fruit: string; };
//     render() {
//       return ScheduleReact.createElement('span');
//     }
//   }
//   Component.defaultProps = {fruit: 'persimmon'};

//   const container = document.createElement('div');
//   const instance = ReactDOM.render(
//     ScheduleReact.createElement(Component, {fruit: 'mango'}),
//     container,
//   );
//   expect(instance.props.fruit).toBe('mango');

//   ReactDOM.render(ScheduleReact.createElement(Component), container);
//   expect(instance.props.fruit).toBe('persimmon');
// });

// NOTE: We're explicitly not using JSX here. This is intended to test
// classic JS without JSX.
// test('should normalize props with default values', () => {
//   class Component extends ScheduleReact.Component {
//     static defaultProps: { prop: string; };
//     render() {
//       return ScheduleReact.createElement('span', null, this.props.prop);
//     }
//   }
//   Component.defaultProps = {prop: 'testKey'};

//   const instance = ReactTestUtils.renderIntoDocument(
//     ScheduleReact.createElement(Component),
//   );
//   expect(instance.props.prop).toBe('testKey');

//   const inst2 = ReactTestUtils.renderIntoDocument(
//     ScheduleReact.createElement(Component, {prop: null}),
//   );
//   expect(inst2.props.prop).toBe(null);
// });

// test('throws when changing a prop (in dev) after element creation', () => {
//   class Outer extends ScheduleReact.Component {
//     render() {
//       const el = <div className="moo" />;

//       {
//         el.props.className = 'quack';
//         expect(el.props.className).toBe('quack');
//       }

//       return el;
//     }
//   }
//   const outer = ReactTestUtils.renderIntoDocument(<Outer color="orange" />);
//   if (__DEV__) {
//     expect(ReactDOM.findDOMNode(outer).className).toBe('moo');
//   } else {
//     expect(ReactDOM.findDOMNode(outer).className).toBe('quack');
//   }
// });

// test('throws when adding a prop (in dev) after element creation', () => {
//   const container = document.createElement('div');
//   class Outer extends ScheduleReact.Component {
//     render() {
//       const el = <div>{this.props.sound}</div>;

//       {
//         el.props.className = 'quack';
//         expect(el.props.className).toBe('quack');
//       }

//       return el;
//     }
//   }
//   Outer.defaultProps = {sound: 'meow'};
//   const outer = ReactDOM.render(<Outer />, container);
//   expect(ReactDOM.findDOMNode(outer).textContent).toBe('meow');
//   if (__DEV__) {
//     expect(ReactDOM.findDOMNode(outer).className).toBe('');
//   } else {
//     expect(ReactDOM.findDOMNode(outer).className).toBe('quack');
//   }
// });

// test('does not warn for NaN props', () => {
//   class Test extends ScheduleReact.Component {
//     render() {
//       return <div />;
//     }
//   }
//   const test = ReactTestUtils.renderIntoDocument(<Test value={+undefined} />);
//   expect(test.props.value).toBeNaN();
// });

// NOTE: We're explicitly not using JSX here. This is intended to test
// classic JS without JSX.
// test('identifies elements, but not JSON, if Symbols are supported', () => {
//   // Rudimentary polyfill
//   // Once all jest engines support Symbols natively we can swap this to test
//   // WITH native Symbols by default.
//   const REACT_ELEMENT_TYPE = function() {}; // fake Symbol
//   const OTHER_SYMBOL = function() {}; // another fake Symbol
//   global.Symbol = function(name) {
//     return OTHER_SYMBOL;
//   };
//   global.Symbol.for = function(key) {
//     if (key === 'react.element') {
//       return REACT_ELEMENT_TYPE;
//     }
//     return OTHER_SYMBOL;
//   };

//   jest.resetModules();

//   React = require('react');

//   class Component extends ScheduleReact.Component {
//     render() {
//       return ScheduleReact.createElement('div');
//     }
//   }

//   expect(ScheduleReact.isValidElement(ScheduleReact.createElement('div'))).toEqual(true);
//   expect(ScheduleReact.isValidElement(ScheduleReact.createElement(Component))).toEqual(true);

//   expect(ScheduleReact.isValidElement(null)).toEqual(false);
//   expect(ScheduleReact.isValidElement(true)).toEqual(false);
//   expect(ScheduleReact.isValidElement({})).toEqual(false);
//   expect(ScheduleReact.isValidElement('string')).toEqual(false);
//   expect(ScheduleReact.isValidElement(Component)).toEqual(false);
//   expect(ScheduleReact.isValidElement({type: 'div', props: {}})).toEqual(false);

//   const jsonElement = JSON.stringify(ScheduleReact.createElement('div'));
//   expect(ScheduleReact.isValidElement(JSON.parse(jsonElement))).toBe(false);
// });