import { successResponse, errorResponse } from "@/utils/response-utils";
import { getAtendeePercentage } from "@/lib/models/student-model";

export default async function handler(req, res) {
  try {
    if (req.method == "GET") {
      const percentageData = await getAtendeePercentage();
      return successResponse(req, res, percentageData);
    }
    return errorResponse(req, res, "method not allowed", 405);
  } catch (error) {
    return errorResponse(req, res, error.message, 400, error.name);
  }
}
