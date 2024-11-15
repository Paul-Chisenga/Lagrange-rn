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
export function parseMutationError(error: unknown) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ?? error.message ?? "Something went wrong"
    );
  }
  return "Something went wrong";
}
