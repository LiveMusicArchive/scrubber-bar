export default function promisedSleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
