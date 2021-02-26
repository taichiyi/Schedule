import {Fiber} from './SchFiber';
import {Lane} from './SchFiberLane';

export type Update<State> = {
  eventTime: number;
  lane: Lane;

  tag: 0 | 1 | 2 | 3;
  payload: any;
  callback: (() => any) | null;

  next: Update<State> | null;
};

type SharedQueue<State> = {
  pending: Update<State> | null;
};

export type UpdateQueue<State> = {
  baseState: State;
  firstBaseUpdate: Update<State> | null;
  lastBaseUpdate: Update<State> | null;
  shared: SharedQueue<State>;
  effects: Array<Update<State>> | null;
};

export const initializeUpdateQueue = <State>(fiber: Fiber<State>): void => {
  const queue: UpdateQueue<State> = {
    baseState: fiber.memoizedState as State,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null,
    },
    effects: null,
  };
  fiber.updateQueue = queue;
};
