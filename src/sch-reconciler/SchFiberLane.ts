export type LaneMap = number[];
export type Lane = number;
export type Lanes = number;

const TotalLane = 31;

export const NoLanes: Lanes = 0b0000000000000000000000000000000;

export const createLaneMap = (initial: number): LaneMap => {
  const laneMap = [];
  for (let i = 0; i < TotalLane; i++) {
    laneMap.push(initial);
  }
  return laneMap;
};
