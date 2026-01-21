import { useFlow } from '@/app/routes/stackflow';
import { postTermAgree } from '@/pages/auth/api/postTermAgree';
import { Button } from '@azit/design-system';

export function TermAgreePage() {
  const { replace } = useFlow();
  const handleTermAgree = async () => {
    try {
      await postTermAgree();
      replace('OnboardingPage', {}, { animate: false });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>TermAgreePage</h1>
      <Button onClick={handleTermAgree}>다음</Button>
    </div>
  );
}
