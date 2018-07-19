
export type getListRes = Array<{
  done: boolean,
  text: string,
  item_id: number,
  list_id: string,
}>;

export type postListReq = Array<{
  text: string,
  done: boolean,
}>;

export type postListRes = {
  list_id: string,
};

export type patchListReq = Array<{
  text: string,
  done: boolean,
  item_id?: number,
}>;
