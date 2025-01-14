import { sleep } from "@/lib/utils";
import { MinesResponseData } from "@/models/mines";
import axios from "axios";

export async function getMines() {
  const res = await axios.get<MinesResponseData>("mines");
  return res.data;
}
