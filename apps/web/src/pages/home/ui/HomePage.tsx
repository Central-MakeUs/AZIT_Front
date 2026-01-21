import { vars } from '@azit/design-system';
import { AppScreen } from '@stackflow/plugin-basic-ui';

export function HomePage() {
  return (
    <AppScreen>
      <p style={{ color: vars.colors.blue40 }}>
        Available to use design system in the web app.
      </p>
    </AppScreen>
  );
}
