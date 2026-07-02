export function mockDelay(ms = 200): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
