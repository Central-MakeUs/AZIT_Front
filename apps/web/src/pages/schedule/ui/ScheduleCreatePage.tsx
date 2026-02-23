import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/schedule/styles/ScheduleCreatePage.css';

import {
  defaultScheduleCreateFormValues,
  buildCreateSchedulePayload,
  isScheduleCreateFormValid,
} from '@/widgets/schedule-form/model/scheduleCreateForm';
import { ScheduleForm } from '@/widgets/schedule-form/ui';

import { memberQueries, scheduleQueries } from '@/shared/queries';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function ScheduleCreatePage() {
  const { pop } = useFlow();
  const [formValues, setFormValues] = useState(defaultScheduleCreateFormValues);

  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const crewId = myInfoData?.ok ? myInfoData.data.result.crewId : 0;
  const createMutation = useMutation(scheduleQueries.createScheduleMutation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isScheduleCreateFormValid(formValues) || crewId <= 0) return;
    const payload = buildCreateSchedulePayload(formValues);
    createMutation.mutate({ crewId, payload }, { onSuccess: () => pop() });
  };

  return (
    <AppScreen backgroundColor={vars.colors.background_sub}>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            color="sub"
            sticky
            left={<BackButton />}
            center="일정 등록하기"
          />
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.formWrapper}>
            <ScheduleForm
              formId="schedule-create-form"
              values={formValues}
              onValuesChange={setFormValues}
              onSubmit={handleSubmit}
            />
          </div>
          <div className={styles.footerWrapper}>
            <Button
              type="submit"
              form="schedule-create-form"
              size="large"
              disabled={!isScheduleCreateFormValid(formValues)}
              state={
                isScheduleCreateFormValid(formValues) ? 'active' : 'disabled'
              }
            >
              등록하기
            </Button>
          </div>
        </div>
      </AppLayout>
    </AppScreen>
  );
}
