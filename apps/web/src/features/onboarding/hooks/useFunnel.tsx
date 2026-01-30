import { useState, type ReactElement, type ReactNode } from 'react';

type StepProps<T extends string> = {
  name: T;
  render: (actions: {
    onNext: (context?: unknown) => void;
    onPrev: () => void;
  }) => ReactNode;
};

type FunnelProps<T extends string> = {
  children: ReactElement<StepProps<T>>[];
};

export const useFunnel = <T extends string>(
  initialStep: T,
  flow: Record<T, ((ctx: unknown) => T) | T | null>
) => {
  const [step, setStep] = useState<T>(initialStep);
  const [history, setHistory] = useState<T[]>([]);

  const onNext = (name: T, ctx?: unknown) => {
    const next = flow[name];
    if (next == null) return;

    const nextStep = typeof next === 'function' ? next(ctx) : next;

    setHistory((prev) => [...prev, name]);
    setStep(nextStep);
  };

  const onPrev = () => {
    if (history.length === 0) return;

    setStep(history[history.length - 1]);
    setHistory((prev) => prev.slice(0, -1));
  };

  const Step = ({ name, render }: StepProps<T>) => {
    return (
      <>
        {render({
          onNext: (ctx?: unknown) => onNext(name, ctx),
          onPrev,
        })}
      </>
    );
  };

  const Funnel = ({ children }: FunnelProps<T>) => {
    const currentStep = children.find((child) => child.props.name === step);
    return <>{currentStep}</>;
  };
  Funnel.Step = Step;

  return { Funnel };
};
