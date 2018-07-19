export enum SaveStatus {
  Saved,
  Modified,
  Created,
}

export type Todo = {
  readonly id: number,
  readonly text: string,
  readonly done: boolean,
  readonly saveStatus: SaveStatus;
};
