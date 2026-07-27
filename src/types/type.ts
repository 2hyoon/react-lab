export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export type FetchError = { type: "http"; status: number } | { type: "network" };
