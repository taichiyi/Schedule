export let SCH_ELEMENT_TYPE: symbol | number = 0xeac7;

if (typeof Symbol === 'function' && Symbol.for) {
  SCH_ELEMENT_TYPE = Symbol.for('react.element');
}
