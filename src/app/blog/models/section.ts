import { File } from './file';

export interface Section {
  text: string | null;
  files: File[] | null;
  order: number;
}
