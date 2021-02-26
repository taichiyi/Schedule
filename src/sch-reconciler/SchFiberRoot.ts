import {Container} from '../sch-dom/SchDOMHostConfig';
import {LaneMap, NoLanes, createLaneMap} from './SchFiberLane';
import {Fiber} from './SchFiber';

export class FiberRootNode<State> {
  tag: string;
  containerInfo: Container;
  current: Fiber<State> | null;
  context: null;
  pendingLanes: any;
  suspendedLanes: any;
  pingedLanes: any;
  expiredLanes: any;
  mutableReadLanes: any;
  finishedLanes: any;
  entangledLanes: any;
  entanglements: LaneMap;
  constructor(container: Container) {
    this.tag = 'not support';
    this.containerInfo = container;
    this.current = null;
    this.context = null;

    this.pendingLanes = NoLanes;
    this.suspendedLanes = NoLanes;
    this.pingedLanes = NoLanes;
    this.expiredLanes = NoLanes;
    this.mutableReadLanes = NoLanes;
    this.finishedLanes = NoLanes;

    this.entangledLanes = NoLanes;
    this.entanglements = createLaneMap(NoLanes);
  }
}
