import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:3000';
  } else {
    return process.env.NEXT_PUBLIC_PRODUCTION_URL!;
  }
}