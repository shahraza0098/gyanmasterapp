import { useMemo } from "react";

import { useStudentContext } from "@/providers/StudentProvider";

export function useStudent() {
  const {
    student,
    loading,
    refreshStudent,
    setStudent,
  } = useStudentContext();

  const subscription = student?.subscription ?? null;

  const value = useMemo(
    () => ({
      student,

      subscription,

      loading,

      refreshStudent,

      setStudent,
    }),
    [
      student,
      subscription,
      loading,
      refreshStudent,
      setStudent,
    ]
  );

  return value;
}