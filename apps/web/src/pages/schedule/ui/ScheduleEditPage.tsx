import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/schedule/styles/ScheduleEditPage.css';

import {
  initializeScheduleFormValues,
  buildUpdateSchedulePayload,
  isScheduleFormValid,
} from '@/widgets/schedule-form/model/scheduleForm';
import type { ScheduleFormValues } from '@/widgets/schedule-form/model/scheduleForm';
import { ScheduleForm } from '@/widgets/schedule-form/ui';

import { MEMBER_ROLE } from '@/shared/constants/member-role';
import { memberQueries, scheduleQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function ScheduleEditPage({ params }: { params: { id: number } }) {
  const { pop, replace } = useFlow();

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

  const [formValues, setFormValues] = useState<ScheduleFormValues | null>(null);

  useEffect(() => {
    if (!detailData?.ok) return;
    if (formValues !== null) return;
    setFormValues(initializeScheduleFormValues(detailData.data.result));
  }, [detailData]);

  useEffect(() => {
    if (!isLoading && detailData && !detailData.ok) {
      replace('NotFoundPage', {});
    }
  }, [isLoading, detailData, replace]);

  const updateMutation = useMutation(scheduleQueries.updateScheduleMutation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues || !isScheduleFormValid(formValues) || crewId <= 0) return;

    const payload = buildUpdateSchedulePayload(formValues);
    updateMutation.mutate(
      { crewId, scheduleId, payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: scheduleQueries.detail(scheduleId),
          });
          pop();
        },
      }
    );
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
