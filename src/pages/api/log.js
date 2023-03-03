import { successResponse, errorResponse } from "@/utils/response-utils";
import { logStudent } from "@/lib/models/time-log-model";

export default async function handler(req, res) {
  try {
    if (req.method == "PATCH") {
      const { studentId } = req.body;
      const logResult = await logStudent(studentId);
      return successResponse(req, res, logResult);
    }
    return errorResponse(req, res, "method not allowed", 405);
  } catch (error) {
    return errorResponse(req, res, error.message, 400, error.name);
  }
}
