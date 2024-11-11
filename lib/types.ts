import { Key, ReactNode } from "react";

export interface Product {
  description: ReactNode;
  id: Key | null | undefined;
  _id: string;
  name: string;
  Desk: string;
  link: string;
  logo: { url: string }[];
  url: string; 
}

interface MicrogenResponse<T> {
  data: T[];
  error?: { message: string };
}

interface MicrogenCollection<T> {
  find: () => Promise<MicrogenResponse<T>>;
}

interface MicrogenClient {
  service(arg0: string): unknown;
  collection: (name: string) => MicrogenCollection<Product>;
}

declare const microgen: MicrogenClient;

export { microgen };
export type { MicrogenClient };
