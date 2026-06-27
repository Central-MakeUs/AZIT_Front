import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import {
  initializeScheduleFormValues,
  buildUpdateSchedulePayload,
  isScheduleFormValid,
} from '@/widgets/schedule-form/model/scheduleForm';
import { useScheduleFormState } from '@/widgets/schedule-form/model/useScheduleFormState';
import { ScheduleForm } from '@/widgets/schedule-form/ui';

import { scheduleQueries } from '@/features/Schedule/api/queries';

import { MEMBER_ROLE } from '@/shared/constants/member-role';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

import * as styles from './index.css';

import { userQueries } from '@/entities/User/api/queries';

export function ScheduleEditPage({ params }: { params: { id: number } }) {
  const { pop, push } = useFlow();

  const { id: scheduleId } = params;

  const queryClient = useQueryClient();

  const { data: myCrewsData } = useQuery(userQueries.myCrewsQuery());
  const joinedCrew =
    myCrewsData?.find((c) => c.memberStatus === 'JOINED') ?? null;
  const crewId = joinedCrew?.crewId ?? 0;
  const isLeader = joinedCrew?.memberRole === MEMBER_ROLE.LEADER;

  const { data: detailData, isLoading } = useQuery({
    ...scheduleQueries.scheduleDetailQuery(crewId, scheduleId),
    enabled: crewId > 0,
  });

  const { formValues, setFormValues, validateForm } = useScheduleFormState(
    initializeScheduleFormValues({
      initialValues: detailData?.result,
    })
  );
  const initializedScheduleIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!detailData?.result) return;
    if (initializedScheduleIdRef.current === scheduleId) return;

    setFormValues(
      initializeScheduleFormValues({ initialValues: detailData.result })
    );
    initializedScheduleIdRef.current = scheduleId;
  }, [detailData, scheduleId, setFormValues]);

  const updateMutation = useMutation({
    ...scheduleQueries.updateScheduleMutation,
    meta: {
      errorMessages: {
        SCHEDULE_INTERVAL_TOO_CLOSE: '이전 일정과 시작 시간이 너무 가깝습니다',
      },
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleQueries.all });
      pop();
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
      <AppScreen backgroundColor={vars.colors.white}>
        <AppLayout>
          <div className={styles.headerWrapper}>
            <Header sticky left={<BackButton />} center="일정 수정하기" />
          </div>
        </AppLayout>
      </AppScreen>
    );
  }

  return (
    <AppScreen backgroundColor={vars.colors.white}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header sticky left={<BackButton />} center="일정 수정하기" />
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
