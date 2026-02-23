import type { CreateScheduleRequest } from '@/entities/schedule/model/schedule.model';

export interface ScheduleCreateFormValues {
  runType: CreateScheduleRequest['runType'];
  title: string;
  date: string;
  amPm: CreateScheduleRequest['amPm'];
  hour: number;
  minute: number;
  locationName: string;
  address: string;
  detailedLocation: string;
  latitude: number;
  longitude: number;
  distance: number;
  pace: number;
  maxParticipants: number;
  description: string;
  supplies: string[];
}

export const TITLE_MAX_LENGTH = 15;
export const SUPPLY_MAX_LENGTH = 15;
export const MAX_SUPPLIES = 5;

export const defaultScheduleCreateFormValues: ScheduleCreateFormValues = {
  runType: 'REGULAR',
  title: '',
  date: '',
  amPm: 'AM',
  hour: 9,
  minute: 30,
  locationName: '',
  address: '',
  detailedLocation: '',
  latitude: 0,
  longitude: 0,
  distance: 0,
  pace: 0,
  maxParticipants: 0,
  description: '',
  supplies: [''],
};

export function buildCreateSchedulePayload(
  values: ScheduleCreateFormValues
): CreateScheduleRequest {
  return {
    title: values.title.trim(),
    runType: values.runType,
    date: values.date,
    amPm: values.amPm,
    hour: values.hour,
    minute: values.minute,
    locationName: values.locationName.trim(),
    address: values.address || values.locationName.trim(),
    detailedLocation: values.detailedLocation.trim(),
    latitude: values.latitude,
    longitude: values.longitude,
    distance: values.distance || undefined,
    pace: values.pace || undefined,
    maxParticipants: values.maxParticipants || undefined,
    description: values.description.trim() || undefined,
    supplies:
      values.supplies.filter((s) => s.trim()).length > 0
        ? values.supplies.map((s) => s.trim()).filter(Boolean)
        : undefined,
  };
}

export function isScheduleCreateFormValid(
  values: ScheduleCreateFormValues
): boolean {
  return (
    values.title.trim().length > 0 &&
    values.date.length > 0 &&
    values.locationName.trim().length > 0
  );
}
