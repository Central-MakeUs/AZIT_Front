import { vars } from '@azit/design-system';
import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/schedule/styles/ScheduleCreateEditPage.css';

import {
  initializeScheduleFormValues,
  buildCreateSchedulePayload,
  isScheduleFormValid,
} from '@/widgets/schedule-form/model/scheduleForm';
import { ScheduleForm } from '@/widgets/schedule-form/ui';

import { MEMBER_ROLE } from '@/shared/constants/member-role';
import { memberQueries, scheduleQueries } from '@/shared/queries';
import { useScheduleLocationSelectionStore } from '@/shared/store/scheduleLocationSelection';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';

export function ScheduleCreatePage() {
  const { pop, push } = useFlow();

  const { data: myInfoData } = useQuery(memberQueries.myInfoQuery());
  const crewId = myInfoData?.ok ? myInfoData.data.result.crewId : 0;
  const isLeader =
    myInfoData?.ok &&
    myInfoData.data.result.crewMemberRole === MEMBER_ROLE.LEADER;

  const selectedLocation = useScheduleLocationSelectionStore(
    (state) => state.selectedLocation
  );
  const clearLocation = useScheduleLocationSelectionStore(
    (state) => state.clearLocation
  );

  const [formValues, setFormValues] = useState(() =>
    initializeScheduleFormValues()
  );

  useEffect(() => {
    if (myInfoData?.ok && !isLeader) {
      setFormValues((prev) => ({ ...prev, runType: 'LIGHTNING' }));
    }
  }, [myInfoData, isLeader]);

  useEffect(() => {
    if (selectedLocation) {
      setFormValues((prev) => ({
        ...prev,
        address: selectedLocation.address,
        locationName: selectedLocation.locationName,
        detailedLocation: selectedLocation.detailedLocation,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      }));
      clearLocation();
    }
  }, [selectedLocation, clearLocation]);

  const createMutation = useMutation(scheduleQueries.createScheduleMutation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isScheduleFormValid(formValues) || crewId <= 0) return;
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
