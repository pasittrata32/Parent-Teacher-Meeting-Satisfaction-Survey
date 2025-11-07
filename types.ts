
export type Language = 'th' | 'en';

export interface SurveyFormData {
  role: string;
  gradeLevel: string;
  programme: string;
  ratings: { [key: string]: string | number };
  positiveFeedback: string;
  improvementFeedback: string;
  activitySuggestions: string;
  otherSuggestions: string;
}

export type SurveyFormErrors = Partial<Record<keyof SurveyFormData | string, string>>;

export interface FeedbackLabels {
  positiveFeedback: string;
  improvementFeedback: string;
  activitySuggestions?: string;
  otherSuggestions: string;
}

export interface TranslationContent {
  title: string;
  schoolName: string;
  meetingDate: string;
  role: string;
  roleOptions: { parent: string; teacher: string; student: string; staff: string; };
  gradeLevel: string;
  gradeLevelOptions: { kindergarten: string; elementary: string; secondary: string; };
  programme: string;
  programmeOptions: { thai: string; english: string; };
  evaluationHeader: string;
  kindergartenEvaluationInfo?: string;
  elementaryEvaluationInfo?: string;
  secondaryEvaluationInfo?: string;
  ratingScale: { 1: string; 2: string; 3: string; 4: string; 5: string; };
  questions: {
    default: string[];
    kindergarten: string[];
    elementary: string[];
    secondary: string[];
  };
  feedbackHeader: string;
  feedbackLabels: {
    default: FeedbackLabels;
    kindergarten: FeedbackLabels;
    elementary: FeedbackLabels;
    secondary: FeedbackLabels;
  };
  submitButton: string;
  validation: {
    required: string;
    role: string;
    gradeLevel: string;
    programme: string;
    rating: string;
  };
  alert: {
    successTitle: string;
    successText: string;
  };
  csvHeaders: {
    role: string;
    gradeLevel: string;
    programme: string;
    positiveFeedback: string;
    improvementFeedback: string;
    activitySuggestions: string;
    otherSuggestions: string;
  };
}