export type AuthMode = "login" | "signup";

export type User = {
  id: number;
  email: string;
  username: string | null;
  role: "ADMIN" | "STUDENT" | string;
  profileCompleted: boolean;
  schoolLevel: number | null;
};

export type Subject = {
  id: number;
  name: string;
  schoolLevel: number;
  progress: number;
};

export type PlacementQuestion = {
  id: number;
  text: string;
  options: string[];
  correctAnswer?: string;
};

export type PlacementTest = {
  id: number;
  subjectId: number;
  subject?: Subject;
  questions: PlacementQuestion[];
};

export type AnswerOption = "A" | "B" | "C" | "D";

export type QuizQuestion = {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer?: AnswerOption;
};

export type Lesson = {
  id: number;
  title: string;
  description?: string | null;
  youtubeUrl?: string | null;
  order: number;
  passingScore?: number;
  subjectId: number;
  subject?: Subject;
  status: "completed" | "unlocked" | "locked";
  quiz: QuizQuestion[];
  questions?: QuizQuestion[];
};

export type QuizResult = {
  score: number;
  passed: boolean;
  correct: number;
  total: number;
};

export type PlacementDraftQuestion = {
  text: string;
  optionsText: string;
  correctAnswer: string;
};

export type AdminTab = "subjects" | "lessons" | "placement";

export type Status = "idle" | "loading";
