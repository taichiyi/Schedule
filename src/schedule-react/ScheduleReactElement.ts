import {SCHEDULEREACT_ELEMENT_TYPE} from './ScheduleReactSymbols';

const createReactElement = (type: any, key: any, ref: any, props: any) => ({
  $$typeof: SCHEDULEREACT_ELEMENT_TYPE,
  type,
  key,
  ref,
  props,
});

export const createElement = (type: any, config?: any, ...children: any) => {
  let key = null;
  let ref = null;

  const RESERVED_PROPS: any = {
    key: true,
    ref: true,
  };

  let props: any = {};
  if (config != null) {
    if (config.key !== undefined) {
      key = '' + config.key;
    }
    if (config.ref !== undefined) {
      ref = config.ref;
    }

    let propName;
    for (propName in config) {
      if (
        Object.prototype.hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS[propName]
      ) {
        props[propName] = config[propName];
      }
    }
  }
  if (children.length === 1) {
    props.children = children[0];
  } else if (children.length > 1) {
    props.children = children;
  }

  return createReactElement(type, key, ref, props);
};

export const isValidElement = (object: any) =>
  typeof object === 'object' &&
  object !== null &&
  object.$$typeof === SCHEDULEREACT_ELEMENT_TYPE;
