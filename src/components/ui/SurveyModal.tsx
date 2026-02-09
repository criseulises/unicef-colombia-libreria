'use client';

import { useState } from 'react';
import { BookOpen, Download, Sparkles, User, Users, GraduationCap, School, CircleUser, UserRound, Rainbow, ShieldQuestion } from 'lucide-react';
import Modal from './Modal';
import { Book, SurveyResponse } from '@/types';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
  action: 'leer' | 'descargar';
}

export default function SurveyModal({ isOpen, onClose, book, action }: SurveyModalProps) {
  const [role, setRole] = useState<SurveyResponse['role'] | ''>('');
  const [gender, setGender] = useState<SurveyResponse['gender'] | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!role || !gender) return;

    setIsSubmitting(true);

    const response: SurveyResponse = {
      bookId: book.id,
      bookTitle: book.title,
      role,
      gender,
      action,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(response),
      });
    } catch {
      // Save locally as fallback
      const stored = JSON.parse(localStorage.getItem('survey_responses') || '[]');
      stored.push(response);
      localStorage.setItem('survey_responses', JSON.stringify(stored));
    }

    // Redirect based on action
    if (action === 'leer') {
      window.open(book.readingUrl, '_blank');
    } else {
      window.open(book.downloadUrl, '_blank');
    }

    setIsSubmitting(false);
    setRole('');
    setGender('');
    onClose();
  };

  const roleOptions = [
    { value: 'estudiante' as const, label: 'Estudiante', icon: GraduationCap, iconColor: 'text-blue-600' },
    { value: 'docente' as const, label: 'Docente', icon: School, iconColor: 'text-green-600' },
    { value: 'otro' as const, label: 'Otro', icon: CircleUser, iconColor: 'text-purple-600' },
  ];

  const genderOptions = [
    { value: 'femenino' as const, label: 'Femenino', icon: UserRound, iconColor: 'text-pink-500' },
    { value: 'masculino' as const, label: 'Masculino', icon: User, iconColor: 'text-blue-500' },
    { value: 'otro' as const, label: 'Otro', icon: Rainbow, iconColor: 'text-purple-500' },
    { value: 'prefiero_no_decir' as const, label: 'Prefiero no decir', icon: ShieldQuestion, iconColor: 'text-gray-500' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center pt-4 pb-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-unicef-light mb-3">
          {action === 'leer' ? (
            <BookOpen size={28} className="text-unicef" />
          ) : (
            <Download size={28} className="text-unicef" />
          )}
        </div>
        <h2 className="font-heading text-2xl font-bold text-gray-800">
          {action === 'leer' ? '¡Vamos a leer!' : '¡Descarga tu libro!'}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Cuéntanos un poco sobre ti antes de continuar
        </p>
      </div>

      <div className="space-y-5 mt-4">
        {/* Role */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2.5">
            <User size={16} className="text-unicef" />
            ¿Cuál es tu rol?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {roleOptions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={role === option.value}
                  onChange={() => setRole(option.value)}
                  className="peer sr-only"
                />
                <div className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
                  role === option.value
                    ? 'border-unicef bg-unicef-light shadow-md scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}>
                  <option.icon size={24} className={option.iconColor} />
                  <span className="text-xs font-bold">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2.5">
            <Users size={16} className="text-unicef" />
            ¿Cuál es tu género?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {genderOptions.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={gender === option.value}
                  onChange={() => setGender(option.value)}
                  className="peer sr-only"
                />
                <div className={`flex items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
                  gender === option.value
                    ? 'border-unicef bg-unicef-light shadow-md scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}>
                  <option.icon size={18} className={option.iconColor} />
                  <span className="text-xs font-bold">{option.label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!role || !gender || isSubmitting}
          className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-base transition-all duration-300 ${
            role && gender && !isSubmitting
              ? 'bg-unicef hover:bg-unicef-dark shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <>
              <Sparkles size={18} />
              {action === 'leer' ? 'Leer ahora' : 'Descargar ahora'}
            </>
          )}
        </button>
      </div>
    </Modal>
  );
}
