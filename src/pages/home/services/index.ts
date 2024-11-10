import { IResponseData } from "../../../@types/responseData";
import { api } from "../../../services/axios-config/api";
import { ISearchDataType } from "../../../services/searchMusic/type";

export class HomeServices {
  static async getTop(): Promise<IResponseData<ISearchDataType[]>> {
    const { data } = await api.get("/reviews/top");
    return data;
  }
}
