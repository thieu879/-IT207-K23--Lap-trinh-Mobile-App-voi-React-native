export const PositionStatuses = ["ACTIVE","INACTIVE"] as const;

export type PositionStatus = (typeof PositionStatuses)[number];

export interface Position {
  id: string;
  positionName: string;
  description: number;
  positionStatus: PositionStatus,
  createdAt: Date
}
