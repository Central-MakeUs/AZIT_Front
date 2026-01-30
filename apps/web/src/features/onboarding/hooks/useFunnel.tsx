import { useState, type ReactElement, type ReactNode } from 'react';

type StepProps<T extends string> = {
  name: T;
  children: ReactNode;
};

type FunnelProps<T extends string> = {
  children: ReactElement<StepProps<T>>[];
};

export const useFunnel = <T extends string>(initialStep: T) => {
  const [step, setStep] = useState<T>(initialStep);

  const Step = ({ children }: StepProps<T>) => {
    return <>{children}</>;
  };

  const Funnel = ({ children }: FunnelProps<T>) => {
    const currentStep = children.find((child) => child.props.name === step);
    return <>{currentStep}</>;
  };
  Funnel.Step = Step;

  return [Funnel, step, setStep] as const;
};
