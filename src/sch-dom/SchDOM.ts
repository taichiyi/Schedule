import {createElement} from '../sch/SchElement';
import {Container} from './SchDOMHostConfig';
import {FiberRootNode} from '../sch-reconciler/SchFiberRoot';
import {HostRoot} from '../sch-reconciler/SchWorkTags';
import {createHostRootFiber} from '../sch-reconciler/SchFiber';
import {initializeUpdateQueue} from '../sch-reconciler/SchUpdateQueue';

export const render = (
  element: ReturnType<typeof createElement>,
  container: Container,
  callback?: Function,
) => {
  const root = createRootFromDOMContainer(container);
  const fiberRoot = root._internalRoot;
  if (callback) {
    callback = callback.bind(
      null,
      fiberRoot.current?.child ? fiberRoot.current.child.stateNode : null,
    );
  }

  unbatchedUpdates(() => {});
};

const createRootFromDOMContainer = (container: Container) => {
  // Empty the container
  while (container.firstChild) {
    container.removeChild(container.lastChild as ChildNode);
  }
  return createRoot(container);
};

const createRoot = (container: Container) => {
  return {
    _internalRoot: createFiberRoot(container),
  };
};

const createFiberRoot = (container: Container) => {
  const root = new FiberRootNode(container);
  const uninitializedFiber = createHostRootFiber();
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;
  initializeUpdateQueue(uninitializedFiber);
  return root;
};
