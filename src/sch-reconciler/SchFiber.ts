import {WorkTag, HostRoot} from './SchWorkTags';
import {NoFlags} from './SchFiberFlags';
import {NoLanes} from './SchFiberLane';
import {UpdateQueue} from './SchUpdateQueue';
import {FiberRootNode} from './SchFiberRoot';

export type Fiber<State> = FiberNode<State>;

class FiberNode<State> {
  tag: number;
  key: string | null;
  elementType: null;
  type: null;
  stateNode: FiberRootNode<State> | Fiber<State> | null;
  return: Fiber<State> | null;
  child: Fiber<State> | null;
  sibling: Fiber<State> | null;
  index: number;
  ref: null;
  pendingProps: any;
  memoizedProps: null;
  updateQueue: UpdateQueue<State> | null;
  memoizedState: State | null;
  dependencies: null;
  flags: number;
  nextEffect: null;
  firstEffect: null;
  lastEffect: null;
  lanes: number;
  childLanes: number;
  alternate: null;
  constructor(tag: WorkTag, pendingProps: any, key: null | string) {
    // Instance
    this.tag = tag;
    this.key = key;
    this.elementType = null;
    this.type = null;
    this.stateNode = null;

    // Fiber
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.ref = null;

    this.pendingProps = pendingProps;
    this.memoizedProps = null;
    this.updateQueue = null;
    this.memoizedState = null;
    this.dependencies = null;

    // Effects
    this.flags = NoFlags;
    this.nextEffect = null;

    this.firstEffect = null;
    this.lastEffect = null;

    this.lanes = NoLanes;
    this.childLanes = NoLanes;

    this.alternate = null;
  }
}

export const createHostRootFiber = () => createFiber(HostRoot, null, null);

const createFiber = (
  tag: WorkTag,
  pendingProps: any,
  key: null | string,
): Fiber<any> => new FiberNode<any>(tag, pendingProps, key);
