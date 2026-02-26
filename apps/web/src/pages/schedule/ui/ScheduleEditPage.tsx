import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/schedule/styles/ScheduleCreateEditPage.css';

import {
  initializeScheduleFormValues,
  buildUpdateSchedulePayload,
  isScheduleFormValid,
} from '@/widgets/schedule-form/model/scheduleForm';
import { useScheduleFormState } from '@/widgets/schedule-form/model/useScheduleFormState';
import { ScheduleForm } from '@/widgets/schedule-form/ui';

import { ApiError } from '@/shared/api/apiHandler';
import { MEMBER_ROLE } from '@/shared/constants/member-role';
import { memberQueries, scheduleQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { toastError } from '@/shared/ui/toast';

export function ScheduleEditPage({ params }: { params: { id: number } }) {
  const { pop, replace, push } = useFlow();

  const { id: scheduleId } = params;

  const queryClient = useQueryClient();

  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const crewId = myInfoData?.ok ? myInfoData.data.result.crewId : 0;
  const isLeader =
    myInfoData?.ok &&
    myInfoData.data.result.crewMemberRole === MEMBER_ROLE.LEADER;

  const { data: detailData, isLoading } = useQuery({
    ...scheduleQueries.scheduleDetailQuery(crewId, scheduleId),
    enabled: crewId > 0,
  });

  const { formValues, setFormValues, validateForm } = useScheduleFormState(
    initializeScheduleFormValues(
      detailData?.ok ? detailData.data.result : undefined
    )
  );
  const initializedScheduleIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isLoading && detailData && !detailData.ok) {
      replace('NotFoundPage', {});
    }
  }, [isLoading, detailData, replace]);

  useEffect(() => {
    if (!detailData?.ok) return;
    if (initializedScheduleIdRef.current === scheduleId) return;

    setFormValues(initializeScheduleFormValues(detailData.data.result));
    initializedScheduleIdRef.current = scheduleId;
  }, [detailData, scheduleId, setFormValues]);

  const updateMutation = useMutation({
    ...scheduleQueries.updateScheduleMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleQueries.all });
      pop();
    },
    onError: (error) => {
      if (
        error instanceof ApiError &&
        error.code === 'SCHEDULE_INTERVAL_TOO_CLOSE'
      ) {
        toastError('이전 일정과 시작 시간이 너무 가깝습니다');
        return;
      }
      toastError('일정 수정에 실패했습니다.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || crewId <= 0) return;

    const payload = buildUpdateSchedulePayload(formValues);
    updateMutation.mutate({ crewId, scheduleId, payload });
  };

  if (isLoading || formValues === null) {
    return (
      <AppScreen backgroundColor={vars.colors.background_sub}>
        <AppLayout>
          <div className={styles.headerWrapper}>
            <Header
              color="sub"
              sticky
              left={<BackButton />}
              center="일정 수정하기"
            />
          </div>
        </AppLayout>
      </AppScreen>
    );
  }

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            color="sub"
            sticky
            left={<BackButton />}
            center="일정 수정하기"
          />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.formWrapper}>
            <ScheduleForm
              formId="schedule-edit-form"
              values={formValues}
              onValuesChange={setFormValues}
              onSubmit={handleSubmit}
              isLeader={isLeader}
              onMapSearchClick={() => push('ScheduleLocationPage', {})}
            />
          </div>
          <div className={styles.footerWrapper}>
            <Button
              type="submit"
              form="schedule-edit-form"
              size="large"
              disabled={!isScheduleFormValid(formValues)}
              state={isScheduleFormValid(formValues) ? 'active' : 'disabled'}
            >
              수정하기
            </Button>
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
