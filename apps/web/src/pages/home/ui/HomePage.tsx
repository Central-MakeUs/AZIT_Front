import { Button, vars } from '@azit/design-system';
import '@/app/styles/App.css';
import { useFlow } from '@/app/routes/stackflow';
import { AppScreen } from '@stackflow/plugin-basic-ui';

export function HomePage() {
  const { push } = useFlow();

  return (
    <AppScreen>
      <h2>Hello World</h2>
      <Button
        label={'로그인 페이지로 이동'}
        onClick={() => push('LoginPage', {}, { animate: false })}
      />
      <p style={{ color: vars.colors.blue40 }}>
        Available to use design system in the web app.
      </p>
    </AppScreen>
  );
}
