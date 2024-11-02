import { apiGemini } from "../../../services/axios-config/api";
import { Question } from "../types";

export class LearningPageServices {
  static async getAnswers(lyric: string): Promise<Question[]> {
    const { data } = await apiGemini.post("generate-test", { lyric });
    return data;
  }
}
