import * as styles from './Description.css';
import clsx from 'clsx';

type DescriptionBaseProps = {
  children: React.ReactNode;
  className?: string;
};

type DescriptionProps = DescriptionBaseProps & {};
type DescriptionLabelProps = DescriptionBaseProps & {};
type DescriptionValueProps = DescriptionBaseProps & {};

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
