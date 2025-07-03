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
};

export type Experience = {
    id: string;
    name: string;
    description: string;
    image?: string;
    images?: string[];
    icon: ReactNode;
  };
  
  export type ExperienceProps = {
    experiences: Experience[];
    customExperience?: Experience;
  };
  
  export type FormValues = Record<string, number>;