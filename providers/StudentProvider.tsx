import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "@clerk/expo";

import { Student } from "@/types/Student";
import { getStudent } from "@/services/student.service";

interface StudentContextType {
  student: Student | null;

  loading: boolean;

  refreshStudent: () => Promise<void>;

  setStudent: React.Dispatch<
    React.SetStateAction<Student | null>
  >;
}

const StudentContext =
  createContext<StudentContextType | null>(null);

export function StudentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useAuth();

  const [student, setStudent] =
    useState<Student | null>(null);

  const [loading, setLoading] =
    useState(true);

  const fetchStudent = useCallback(async () => {
    if (!isSignedIn) {
      setStudent(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const user = await getStudent();

      setStudent(user);
    } catch (error) {
      console.log(
        "Failed to fetch student",
        error
      );

      setStudent(null);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn]);

  // useEffect(() => {
  //   if (!isLoaded) return;

  //   fetchStudent();
  // }, [isLoaded, fetchStudent]);


  useEffect(() => {
  if (!isLoaded) {
    return;
  }

  if (!isSignedIn) {
    setStudent(null);
    setLoading(false);
    return;
  }

  fetchStudent();
}, [
  isLoaded,
  isSignedIn,
  fetchStudent,
]);
  const value = useMemo(
    () => ({
      student,

      loading,

      refreshStudent: fetchStudent,

      setStudent,
    }),
    [
      student,
      loading,
      fetchStudent,
    ]
  );

  return (
    <StudentContext.Provider
      value={value}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudentContext() {
  const context =
    useContext(StudentContext);

  if (!context) {
    throw new Error(
      "useStudentContext must be used inside StudentProvider"
    );
  }

  return context;
}