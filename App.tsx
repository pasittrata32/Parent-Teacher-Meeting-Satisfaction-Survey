

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { translations } from './constants/translations';
import type { Language, SurveyFormData, SurveyFormErrors, TranslationContent } from './types';

// SweetAlert2 is loaded from CDN, so we declare it globally for TypeScript
declare const Swal: any;

// --- IMPORTANT ---
// Paste the Web App URL from your deployed Google Apps Script here.
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwIOgrVuRcC_Jpb8_e2vjq5zy-6lg7ydRdGwDkBlmDL9ToOKwWhq1IgIwp3DzP12vDQ/exec'; // IMPORTANT: Replace with your actual deployed Google Apps Script URL


const initialFormData: SurveyFormData = {
  role: '',
  gradeLevel: '',
  programme: '',
  ratings: {},
  positiveFeedback: '',
  improvementFeedback: '',
  activitySuggestions: '',
  otherSuggestions: '',
};

// --- Helper UI Components (Defined outside App to prevent re-creation on re-renders) ---

interface HeaderProps {
  t: TranslationContent;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const Header: React.FC<HeaderProps> = ({ t, language, setLanguage }) => (
  <header className="bg-[#0B3D91] shadow-lg rounded-xl p-4 sm:p-6 mb-6 flex justify-between items-start">
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-white">{t.title}</h1>
      <div className="mt-2">
        <p className="font-semibold text-base text-gray-100">{t.schoolName}</p>
        <p className="text-sm text-gray-300">{t.meetingDate}</p>
      </div>
    </div>
    <div className="flex items-center space-x-2 border border-white/30 rounded-full flex-shrink-0 ml-4">
      <button
        onClick={() => setLanguage('th')}
        className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
          language === 'th' ? 'bg-white text-[#0B3D91]' : 'text-white/90 hover:bg-white/10'
        }`}
      >
        TH
      </button>
      <div className="h-4 border-l border-white/30"></div>
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${
          language === 'en' ? 'bg-white text-[#0B3D91]' : 'text-white/90 hover:bg-white/10'
        }`}
      >
        EN
      </button>
    </div>
  </header>
);

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <fieldset className="bg-white shadow-md rounded-xl p-6 sm:p-8 mb-6">
    <legend className="text-lg font-bold text-[#0B3D91] mb-4 px-2">{title}</legend>
    <div className="space-y-6">{children}</div>
  </fieldset>
);


interface LikertScaleQuestionProps {
  question: string;
  questionIndex: number;
  ratingScale: { [key: string]: string };
  value: string | number;
  error?: string;
  onChange: (index: number, value: string) => void;
}

const LikertScaleQuestion: React.FC<LikertScaleQuestionProps> = ({ question, questionIndex, ratingScale, value, error, onChange }) => (
  <div className={`p-4 rounded-lg transition-all ${error ? 'bg-red-50 ring-2 ring-red-200' : 'bg-gray-50'}`}>
    <p className="font-semibold text-gray-700 mb-3">{`${questionIndex + 1}. ${question}`}</p>
    <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 text-center text-sm">
      {Object.keys(ratingScale).reverse().map((level) => (
        <label key={level} className="flex flex-col items-center space-y-1 cursor-pointer">
          <input
            type="radio"
            name={`question-${questionIndex}`}
            value={level}
            checked={String(value) === String(level)}
            onChange={(e) => onChange(questionIndex, e.target.value)}
            className="form-radio h-5 w-5 text-[#0B3D91] focus:ring-[#08306B]"
            aria-label={`${ratingScale[level]}`}
          />
          <span className="text-gray-600">{ratingScale[level]}</span>
        </label>
      ))}
    </div>
    {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
  </div>
);


// --- Main App Component ---

function App() {
  const [language, setLanguage] = useState<Language>('th');
  const [formData, setFormData] = useState<SurveyFormData>(initialFormData);
  const [errors, setErrors] = useState<SurveyFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const t = translations[language];

  const { currentQuestions, currentFeedbackLabels, currentEvaluationInfo } = useMemo(() => {
    const kindergartenSelected = formData.gradeLevel === t.gradeLevelOptions.kindergarten;
    const elementarySelected = formData.gradeLevel === t.gradeLevelOptions.elementary;
    const secondarySelected = formData.gradeLevel === t.gradeLevelOptions.secondary;
    
    if (kindergartenSelected) {
      return {
        currentQuestions: t.questions.kindergarten,
        currentFeedbackLabels: t.feedbackLabels.kindergarten,
        currentEvaluationInfo: t.kindergartenEvaluationInfo
      };
    }

    if (elementarySelected) {
      return {
        currentQuestions: t.questions.elementary,
        currentFeedbackLabels: t.feedbackLabels.elementary,
        currentEvaluationInfo: t.elementaryEvaluationInfo
      };
    }
    
    if (secondarySelected) {
      return {
        currentQuestions: t.questions.secondary,
        currentFeedbackLabels: t.feedbackLabels.secondary,
        currentEvaluationInfo: t.secondaryEvaluationInfo
      };
    }

    return {
      currentQuestions: t.questions.default,
      currentFeedbackLabels: t.feedbackLabels.default,
      currentEvaluationInfo: undefined,
    };
  }, [formData.gradeLevel, t]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.className = language === 'th' ? 'font-sarabun' : 'font-inter';
  }, [language]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'gradeLevel') {
        setFormData({
            ...formData,
            gradeLevel: value,
            ratings: {},
            positiveFeedback: '',
            improvementFeedback: '',
            activitySuggestions: '',
            otherSuggestions: '',
        });
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            Object.keys(newErrors).forEach(key => {
                if (key.startsWith('q')) delete newErrors[key];
            });
            delete newErrors.gradeLevel;
            return newErrors;
        });
    } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name as keyof SurveyFormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    }
  };
  
  const handleRadioChange = (name: keyof SurveyFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
     if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRatingChange = (index: number, value: string) => {
    const questionKey = `q${index}`;
    setFormData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [questionKey]: value },
    }));
    if (errors[questionKey]) {
      setErrors((prev) => ({ ...prev, [questionKey]: undefined }));
    }
  };

  const validateForm = useCallback((): boolean => {
    const newErrors: SurveyFormErrors = {};
    if (!formData.role) newErrors.role = t.validation.role;
    if (!formData.gradeLevel) newErrors.gradeLevel = t.validation.gradeLevel;
    if (!formData.programme) newErrors.programme = t.validation.programme;

    currentQuestions.forEach((_, index) => {
      if (!formData.ratings[`q${index}`]) {
        newErrors[`q${index}`] = t.validation.rating;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, t, currentQuestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      // Map rating keys (q0, q1...) to actual question text for Google Sheets
      const ratingsWithTextKeys = Object.entries(formData.ratings).reduce((acc, [key, value]) => {
          const index = parseInt(key.replace('q', ''), 10);
          const questionText = currentQuestions[index];
          if (questionText) {
              acc[questionText] = value as string | number;
          }
          return acc;
      }, {} as Record<string, string | number>);

      const dataToSend = {
          ...formData,
          ratings: ratingsWithTextKeys, // Replace ratings object with the new one
      };

      try {
        // Fix: Changed the strict equality check to `includes` to avoid a TypeScript error
        // for comparing two distinct string literals, while preserving the validation's intent.
        if (SCRIPT_URL.includes('your-deployment-id')) {
          throw new Error("Google Apps Script URL is not set. Please update SCRIPT_URL in App.tsx.");
        }
        
        const response = await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Use 'no-cors' to avoid CORS issues with simple Apps Script deployments
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend)
        });
        
        // With 'no-cors', we can't inspect the response, but we assume success if no network error
        Swal.fire({
          title: t.alert.successTitle,
          text: t.alert.successText,
          icon: 'success',
          confirmButtonColor: '#0B3D91',
        });
        setFormData(initialFormData);
        setErrors({});

      } catch (error) {
        console.error('Submission error:', error);
        Swal.fire({
          title: 'Submission Error',
          text: error instanceof Error ? error.message : 'There was a problem submitting your feedback. Please try again.',
          icon: 'error',
          confirmButtonColor: '#D33',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header t={t} language={language} setLanguage={setLanguage} />
        
        <form onSubmit={handleSubmit} noValidate>
          <FormSection title={t.role}>
            <div className="space-y-4">
              {/* Role */}
              <div>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {Object.entries(t.roleOptions).map(([key, label]) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="role" value={label} checked={formData.role === label} onChange={(e) => handleRadioChange('role', e.target.value)} className="form-radio h-4 w-4 text-[#0B3D91] focus:ring-[#08306B]"/>
                      <span className="text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
                {errors.role && <p className="text-red-500 text-sm mt-2">{errors.role}</p>}
              </div>

              {/* Grade Level */}
              <div>
                <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700 mb-1">{t.gradeLevel}</label>
                <select id="gradeLevel" name="gradeLevel" value={formData.gradeLevel} onChange={handleInputChange} className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#08306B] focus:border-[#08306B] sm:text-sm rounded-md ${errors.gradeLevel ? 'border-red-500' : ''}`}>
                  <option value="" disabled>{`-- ${language === 'th' ? 'เลือก' : 'Select'} --`}</option>
                  {Object.values(t.gradeLevelOptions).map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                {errors.gradeLevel && <p className="text-red-500 text-sm mt-1">{errors.gradeLevel}</p>}
              </div>

              {/* Programme */}
              <div>
                <h3 className="text-sm font-medium text-gray-700">{t.programme}</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                  {Object.values(t.programmeOptions).map(option => (
                     <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="programme" value={option} checked={formData.programme === option} onChange={(e) => handleRadioChange('programme', e.target.value)} className="form-radio h-4 w-4 text-[#0B3D91] focus:ring-[#08306B]"/>
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.programme && <p className="text-red-500 text-sm mt-2">{errors.programme}</p>}
              </div>
            </div>
          </FormSection>

          {formData.gradeLevel && (
            <>
              <FormSection title={t.evaluationHeader}>
                {currentEvaluationInfo && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-md mb-4 whitespace-pre-wrap">
                    {currentEvaluationInfo}
                  </div>
                )}
                <div className="space-y-4">
                  {currentQuestions.map((q, i) => (
                    <LikertScaleQuestion
                      key={i}
                      question={q}
                      questionIndex={i}
                      ratingScale={t.ratingScale}
                      value={formData.ratings[`q${i}`] || ''}
                      error={errors[`q${i}`]}
                      onChange={handleRatingChange}
                    />
                  ))}
                </div>
              </FormSection>

              <FormSection title={t.feedbackHeader}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="positiveFeedback" className="block text-sm font-medium text-gray-700">{currentFeedbackLabels.positiveFeedback}</label>
                    <textarea id="positiveFeedback" name="positiveFeedback" rows={3} value={formData.positiveFeedback} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-[#08306B] focus:border-[#08306B]"></textarea>
                  </div>
                  <div>
                    <label htmlFor="improvementFeedback" className="block text-sm font-medium text-gray-700">{currentFeedbackLabels.improvementFeedback}</label>
                    <textarea id="improvementFeedback" name="improvementFeedback" rows={3} value={formData.improvementFeedback} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-[#08306B] focus:border-[#08306B]"></textarea>
                  </div>
                  {currentFeedbackLabels.activitySuggestions && (
                    <div>
                      <label htmlFor="activitySuggestions" className="block text-sm font-medium text-gray-700">{currentFeedbackLabels.activitySuggestions}</label>
                      <textarea id="activitySuggestions" name="activitySuggestions" rows={3} value={formData.activitySuggestions} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-[#08306B] focus:border-[#08306B]"></textarea>
                    </div>
                  )}
                  <div>
                    <label htmlFor="otherSuggestions" className="block text-sm font-medium text-gray-700">{currentFeedbackLabels.otherSuggestions}</label>
                    <textarea id="otherSuggestions" name="otherSuggestions" rows={3} value={formData.otherSuggestions} onChange={handleInputChange} className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-[#08306B] focus:border-[#08306B]"></textarea>
                  </div>
                </div>
              </FormSection>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-[#0B3D91] hover:bg-[#08306B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B3D91] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (language === 'th' ? 'กำลังส่ง...' : 'Submitting...') : t.submitButton}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;