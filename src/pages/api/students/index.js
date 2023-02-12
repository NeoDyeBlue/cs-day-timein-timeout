import { successResponse, errorResponse } from "@/utils/response-utils";
import {
  findStudent,
  getAllStudentLogs,
} from "@/lib/controllers/student-controller";

export default async function handler(req, res) {
  try {
    if (req.method == "POST") {
      const { studentId } = req.body;
      const studentData = await findStudent(studentId);
      return successResponse(req, res, studentData);
    }
    if (req.method == "GET") {
      const studentLogs = await getAllStudentLogs();
      return successResponse(req, res, studentLogs);
    }
    return errorResponse(req, res, "method not allowed", 405);
  } catch (error) {
    return errorResponse(req, res, error.message, 400, error.name);
  }
}
