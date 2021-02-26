export type Flags = number;

export const NoFlags = /*                      */ 0b000000000000000000;
export const PerformedWork = /*                */ 0b000000000000000001;

export const Placement = /*                    */ 0b000000000000000010;
export const Update = /*                       */ 0b000000000000000100;
export const PlacementAndUpdate = /*           */ 0b000000000000000110;
export const Deletion = /*                     */ 0b000000000000001000;
export const ContentReset = /*                 */ 0b000000000000010000;
export const Callback = /*                     */ 0b000000000000100000;
export const DidCapture = /*                   */ 0b000000000001000000;
export const Ref = /*                          */ 0b000000000010000000;
export const Snapshot = /*                     */ 0b000000000100000000;
export const Passive = /*                      */ 0b000000001000000000;
export const PassiveUnmountPendingDev = /*     */ 0b000010000000000000;
export const Hydrating = /*                    */ 0b000000010000000000;
export const HydratingAndUpdate = /*           */ 0b000000010000000100;

export const LifecycleEffectMask = /*          */ 0b000000001110100100;

export const HostEffectMask = /*               */ 0b000000011111111111;

export const Incomplete = /*                   */ 0b000000100000000000;
export const ShouldCapture = /*                */ 0b000001000000000000;
export const ForceUpdateForLegacySuspense = /* */ 0b000100000000000000;

export const PassiveStatic = /*                */ 0b001000000000000000;

export const BeforeMutationMask = /*           */ 0b000000001100001010;
export const MutationMask = /*                 */ 0b000000010010011110;
export const LayoutMask = /*                   */ 0b000000000010100100;
export const PassiveMask = /*                  */ 0b000000001000001000;

export const StaticMask = /*                   */ 0b001000000000000000;

export const MountLayoutDev = /*               */ 0b010000000000000000;
export const MountPassiveDev = /*              */ 0b100000000000000000;
