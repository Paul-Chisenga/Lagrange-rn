import { Pagination } from "@/lib/types";

/* sequest model */
export interface Sequest {
  id: string;
  trees: number;
  carbon: number;
  tCO2: number;
  cash: { ksh: number; usd: number };
  project: { id: string; title: string };
  createdAt: string;
}

/* sequests overview response */
export interface SequestsOverViewResponse
  extends Pick<Sequest, "tCO2" | "cash"> {}
/* sequests response */
export interface SequestsResponse extends Pagination {
  sequests: Sequest[];
}
/* sequest response */
export interface SequestResponse extends Sequest {}
/* latest sequest response */
export interface LatestSequestResponse extends Sequest {}
