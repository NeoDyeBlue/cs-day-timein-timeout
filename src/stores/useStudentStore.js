import { create } from "zustand";

const useStudentStore = create((set) => ({
  studentData: null,
  setStudentData: (payload) =>
    set(() => ({
      studentData: payload,
    })),
}));

export default useStudentStore;
