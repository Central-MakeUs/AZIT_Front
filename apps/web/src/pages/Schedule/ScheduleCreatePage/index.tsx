import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import {
  initializeScheduleFormValues,
  buildCreateSchedulePayload,
  isScheduleFormValid,
} from '@/widgets/ScheduleForm/model/scheduleForm';
import { useScheduleFormState } from '@/widgets/ScheduleForm/model/useScheduleFormState';
import { ScheduleForm } from '@/widgets/ScheduleForm/ui';

import { scheduleQueries } from '@/features/Schedule/api/queries';

import { userQueries } from '@/entities/User/api/queries';

import { MEMBER_ROLE } from '@/shared/constants/member-role';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { toastError } from '@/shared/ui/toast';

import * as styles from './index.css';


export function ScheduleCreatePage({ params }: { params?: { date?: Date } }) {
  const { pop, push } = useFlow();

  const { data: myCrewsData } = useQuery(userQueries.myCrewsQuery());
  const joinedCrew =
    myCrewsData?.find((c) => c.memberStatus === 'JOINED') ?? null;
  const crewId = joinedCrew?.crewId ?? 0;
  const isLeader = joinedCrew?.memberRole === MEMBER_ROLE.LEADER;

  const { formValues, setFormValues, validateForm } = useScheduleFormState(
    initializeScheduleFormValues({ params })
  );

  useEffect(() => {
    if (joinedCrew && !isLeader) {
      setFormValues((prev) => ({ ...prev, runType: 'LIGHTNING' }));
    }
  }, [joinedCrew, isLeader]);

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    ...scheduleQueries.createScheduleMutation,
    meta: {
      errorMessages: {
        SCHEDULE_INTERVAL_TOO_CLOSE: '이전 일정과 시작 시간이 너무 가깝습니다',
      },
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: scheduleQueries.all,
        refetchType: 'all',
      });
      pop();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (crewId <= 0) {
      toastError('크루 정보를 불러오지 못했습니다. 다시 시도해주세요.');
      return;
    }
    const payload = buildCreateSchedulePayload(formValues);
    if (!payload) return;
    createMutation.mutate({ crewId, payload });
  };

  return (
    <AppScreen backgroundColor={vars.colors.white}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header sticky left={<BackButton />} center="일정 등록하기" />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.formWrapper}>
            <ScheduleForm
              formId="schedule-create-form"
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
              form="schedule-create-form"
              size="large"
              disabled={!isScheduleFormValid(formValues)}
              state={isScheduleFormValid(formValues) ? 'active' : 'disabled'}
            >
              등록하기
            </Button>
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
