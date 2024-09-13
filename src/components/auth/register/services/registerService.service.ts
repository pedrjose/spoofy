import { api } from "../../../../services/axios-config/api";
import { IRegisterRequest, IRegisterResponse } from "./types";

export class RegisterService {
  static async register(values: IRegisterRequest): Promise<IRegisterResponse> {
    const { data } = await api.post<IRegisterResponse>("register", values);
    return data;
  }
}
