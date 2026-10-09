import type { Locale } from "../config";
import { en, type Dictionary } from "./en";
import { sr } from "./sr";

export type { Dictionary, Segment } from "./en";

export const DICTIONARIES: Record<Locale, Dictionary> = { en, sr };
