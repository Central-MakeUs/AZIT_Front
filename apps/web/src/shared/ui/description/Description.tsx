import * as styles from './Description.css';
import clsx from 'clsx';

interface DescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface DescriptionLabelProps {
  children: React.ReactNode;
  className: string;
}

interface DescriptionValueProps {
  children: React.ReactNode;
  className: string;
}

function Description({ children, className }: DescriptionProps) {
  return (
    <div className={clsx(className, styles.DescriptionRow)}>{children}</div>
  );
}

function DescriptionLabel({ children, className }: DescriptionLabelProps) {
  return <span className={className}>{children}</span>;
}

function DescriptionValue({ children, className }: DescriptionValueProps) {
  return <span className={className}>{children}</span>;
}

Description.Label = DescriptionLabel;
Description.Value = DescriptionValue;
export { Description };
