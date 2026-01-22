import { Button } from '@azit/design-system';
import { postCreateCrew } from '@/features/onboarding/api/postCreateCrew';
import { useFlow } from '@/app/routes/stackflow';

export function OnboardingPage() {
  const { replace } = useFlow();

  const handleCreateCrew = async () => {
    try {
      await postCreateCrew({
        name: 'test',
        category: 'RUNNING',
        region: 'SEOUL',
      });

      // TODO: 크루 초대 코드 발급 화면의 버튼에서 처리, 현재는 테스트용
      replace('HomePage', {}, { animate: false });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>OnboardingPage</h1>
      <Button onClick={handleCreateCrew}>크루 생성하기</Button>
    </div>
  );
}
