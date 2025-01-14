import {
  LatestSequestResponse,
  SequestsOverViewResponse,
} from "@/models/sequests";
import axios from "axios";

export async function getSequestsOverview() {
  const res = await axios.get<SequestsOverViewResponse>("sequests/overview");
  return res.data;
}

export async function getLatestSequest() {
  const res = await axios.get<LatestSequestResponse>("sequests/latest");
  return res.data;
}
