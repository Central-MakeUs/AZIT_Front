import { useEffect, useState, type ReactElement, type ReactNode } from 'react';

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
  const [step, setStep] = useState<T>(() => {
    const saved = sessionStorage.getItem('funnel-step');
    return saved ? (JSON.parse(saved) as T) : initialStep;
  });

  const [history, setHistory] = useState<T[]>(() => {
    const saved = sessionStorage.getItem('funnel-history');
    return saved ? JSON.parse(saved) : [];
  });

  // 상태 변경 시 sessionStorage에 저장
  useEffect(() => {
    sessionStorage.setItem('funnel-step', JSON.stringify(step));
  }, [step]);

  useEffect(() => {
    sessionStorage.setItem('funnel-history', JSON.stringify(history));
  }, [history]);

  const onNext = (name: T, ctx?: unknown) => {
    const next = flow[name];

    if (next == null) {
      // 마지막 스텝에서 sessionStorage 제거
      sessionStorage.removeItem('funnel-step');
      sessionStorage.removeItem('funnel-history');
      sessionStorage.removeItem('onboarding-state');
      return;
    }

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
