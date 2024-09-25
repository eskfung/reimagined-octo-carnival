import { useMatches } from "@remix-run/react";
import { RootLoaderData } from "~/types/rootLoaderData";

export function useRootLoaderData(): RootLoaderData {
  const matches = useMatches();
  if (matches.length === 0) throw new Error('No root loader data found');

  const [{ data }] = matches;
  return data as RootLoaderData;
}
