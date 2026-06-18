import { ReactNode } from "react";

export type BarChartProps = {
  scores: {
    name: string;
    score: number;
  }[];
};

export type FormData = Record<string, number | string | undefined>;

export interface PrincipleItem {
  key: string;
  text: string;
}

export interface Principle {
  key: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: PrincipleItem[];
}

export type ResultsProps = {
  formData: FormData;
  onTryAnother?: () => void;
  selectedExperience: string;
  stakeholder: string;
};

export type Experience = {
    id: string;
    name: string;
    description: string;
    image?: string;
    images?: string[];
    icon: ReactNode;
    stakeholder?: string;
  };
  
  export type ExperienceProps = {
    experiences: Experience[];
    customExperience?: Experience;
  };
  
export interface FormValues {
  [key: string]: number | string;
}

export type FormSubmission = FormValues & {
  stakeholder: string;
  experienceId: string;
  experienceName: string;
};


  export type GroupedBarChartProps = {
  scores: {
    stakeholder: string;
    values: {
      name: string; // 'Utility', 'Satisfaction', etc.
      score: number;
    }[];
  }[];
};
