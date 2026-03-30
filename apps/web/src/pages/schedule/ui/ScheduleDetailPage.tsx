import { AppScreen } from '@stackflow/plugin-basic-ui';
import { Suspense } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import { ScheduleDetailSkeleton } from '@/widgets/skeleton/ui';

import { useStack } from '@/shared/lib/stackflow/useStack';
import { BusinessErrorFallback, DomainErrorBoundary } from '@/shared/ui/error';
import { AppLayout } from '@/shared/ui/layout';

import {
  ScheduleDetailContent,
  ScheduleDetailHeader,
} from './ScheduleDetailContent';

interface ScheduleDetailPageProps {
  params: { id: number };
}

export function ScheduleDetailPage({ params }: ScheduleDetailPageProps) {
  const { push } = useFlow();
  const { pop } = useStack();

  const handleBack = () => pop('SchedulePage');
  const handleEdit = () => push('ScheduleEditPage', { id: params.id });
  const handleSeeMoreParticipants = () =>
    push('ScheduleMembersPage', { id: params.id });

  return (
    <AppScreen>
      <AppLayout>
        <DomainErrorBoundary
          fallback={({ error, reset }) => (
            <>
              <ScheduleDetailHeader onBack={handleBack} />
              <BusinessErrorFallback error={error} onReset={reset} />
            </>
          )}
        >
          <Suspense
            fallback={
              <>
                <ScheduleDetailHeader onBack={handleBack} />
                <ScheduleDetailSkeleton />
              </>
            }
          >
            <ScheduleDetailContent
              scheduleId={params.id}
              onBack={handleBack}
              onEdit={handleEdit}
              onSeeMoreParticipants={handleSeeMoreParticipants}
            />
          </Suspense>
        </DomainErrorBoundary>
      </AppLayout>
    </AppScreen>
  );
}
