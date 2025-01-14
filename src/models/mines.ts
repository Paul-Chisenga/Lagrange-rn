import { Pagination } from "@/lib/types";

/* mine status */
export enum MineStatus {
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
  PENDING = "PENDING",
  REMOVED = "REMOVED",
}

/* mine model */
export interface Mine {
  id: string;
  title: string;
  image: string;
  status: MineStatus;
  // county: County;
  // _count: MineCount;
  // projects: Project[];
  createdAt: string;
}

/* mine response data */
export interface MinesResponseData extends Pagination {
  mines: Mine[];
}
