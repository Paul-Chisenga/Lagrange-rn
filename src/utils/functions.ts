export async function sleep(duration: number) {
  await new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, duration);
  });
}
