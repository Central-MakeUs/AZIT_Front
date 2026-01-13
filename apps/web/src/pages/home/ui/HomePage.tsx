import { Button, vars } from '@azit/design-system';
import { useFlow } from '@/app/routes/stackflow';
import { AppScreen } from '@stackflow/plugin-basic-ui';

export function HomePage() {
  const { push } = useFlow();

  return (
    <AppScreen>
      <h2>Hello World</h2>
      <Button onClick={() => push('LoginPage', {}, { animate: false })}>
        로그인 페이지로 이동
      </Button>
      <p style={{ color: vars.colors.blue40 }}>
        Available to use design system in the web app.
      </p>
    </AppScreen>
  );
}
