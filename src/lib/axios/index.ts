// not using; not necessary. TODO: delete file

// import { AxiosResponse } from "axios";

// import { axiosInstance } from "./axiosInstance";

// export async function fetchItems<Item>(route: string): Promise<Array<Item>> {
//   const { data } = await axiosInstance.get(route);
//   return data;
// }

// export async function addItem<Item, ItemPutData>({
//   route,
//   putData,
// }: {
//   route: string;
//   putData: ItemPutData;
// }): Promise<Item> {
//   const { data: returnData } = await axiosInstance.put<
//     { body: ItemPutData },
//     AxiosResponse<Item>
//   >(route, { body: putData });
//   return returnData;
// }

// export async function patchItem<Item, ItemPatchData>({
//   route,
//   id,
//   patchData,
// }: {
//   route: string;
//   id: number;
//   patchData: ItemPatchData;
// }): Promise<Item> {
//   const { data: returnData } = await axiosInstance.patch<
//     { body: ItemPatchData },
//     AxiosResponse<Item>
//   >(`${route}/${id}`, { body: patchData });
//   return returnData;
// }

// export async function deleteItem({
//   route,
//   id,
// }: {
//   route: string;
//   id: number;
// }): Promise<void> {
//   axiosInstance.delete(`${route}/${id}`);
// }
