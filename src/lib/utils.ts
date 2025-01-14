import axios from "axios";

export async function sleep(duration: number) {
  await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, duration);
  });
}

/**
 *
 * @param error
 * @returns
 * parses error from the server
 */
export function parseMutationError(error: unknown): {
  status: number;
  message: string;
} {
  if (axios.isAxiosError(error)) {
    if (error.status === 404)
      return { status: 404, message: "Connection error" };
    return {
      status: error.status ?? 500,
      message:
        error.response?.data?.message ??
        error.message ??
        "Something went wrong",
    };
  }
  return { status: 500, message: "Something went wrong" };
}
