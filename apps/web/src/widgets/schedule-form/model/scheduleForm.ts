import { z } from 'zod';

import type {
  CreateScheduleRequest,
  CrewScheduleDetailResponse,
  UpdateScheduleRequest,
} from '@/entities/schedule/model/schedule.model';

export interface ScheduleFormValues {
  runType: CreateScheduleRequest['runType'];
  title: string;
  date: string;
  amPm: 'AM' | 'PM';
  hour: number;
  minute: number;
  locationName: string;
  address: string;
  detailedLocation: string;
  latitude: number;
  longitude: number;
  distance: number | null;
  pace: number | null;
  maxParticipants: number | null;
  description: string;
  supplies: string[];
}

export const TITLE_MAX_LENGTH = 15;
export const SUPPLY_MAX_LENGTH = 15;
export const MAX_SUPPLIES = 5;

export const scheduleFormSchema = z.object({
  runType: z.enum(['REGULAR', 'LIGHTNING']),
  title: z
    .string()
    .trim()
    .min(1, '제목을 입력해주세요')
    .max(TITLE_MAX_LENGTH, `제목은 ${TITLE_MAX_LENGTH}자 이내로 입력해주세요`),
  date: z.string().min(1, '날짜를 선택해주세요'),
  amPm: z.enum(['AM', 'PM']),
  hour: z.number().min(1, '시간을 선택해주세요').max(12),
  minute: z.number().min(0).max(59),
  locationName: z.string().trim().min(1, '장소명을 입력해주세요'),
  address: z.string().trim().min(1, '주소를 입력해주세요'),
  detailedLocation: z.string().trim().min(1, '세부 장소를 입력해주세요'),
  latitude: z.number(),
  longitude: z.number(),
  distance: z.number().min(0, '거리는 0 이상이어야 합니다').nullable(),
  pace: z.number().min(0, '페이스는 0 이상이어야 합니다').nullable(),
  maxParticipants: z
    .number()
    .int('최대 인원은 정수여야 합니다')
    .min(1, '최대 인원은 1명 이상이어야 합니다')
    .nullable(),
  description: z.string().trim(),
  supplies: z
    .array(z.string())
    .max(MAX_SUPPLIES, `준비물은 최대 ${MAX_SUPPLIES}개까지 입력 가능합니다`)
    .refine(
      (arr: string[]) =>
        arr.every((s: string) => s.length <= SUPPLY_MAX_LENGTH),
      `각 준비물은 ${SUPPLY_MAX_LENGTH}자 이내로 입력해주세요`
    ),
});

export type ScheduleFormSchema = z.infer<typeof scheduleFormSchema>;

const defaultScheduleFormValues: ScheduleFormValues = {
  runType: 'REGULAR',
  title: '',
  date: '',
  amPm: 'AM',
  hour: 9,
  minute: 30,
  locationName: '테스트 러닝 장소',
  address: '서울특별시 강남구 테헤란로 123',
  detailedLocation: '1층 로비 앞',
  latitude: 37.5665,
  longitude: 126.978,
  distance: null,
  pace: null,
  maxParticipants: null,
  description: '',
  supplies: [''],
};

const formatMeetingAt = (
  date: string,
  amPm: ScheduleFormValues['amPm'],
  hour: number,
  minute: number
): string => {
  const hour24 =
    amPm === 'AM' ? (hour === 12 ? 0 : hour) : hour === 12 ? 12 : hour + 12;
  const h = String(hour24).padStart(2, '0');
  const m = String(minute).padStart(2, '0');
  const s = '00';
  return `${date} ${h}:${m}:${s}`;
};

const buildSchedulePayload = (values: ScheduleFormValues) => {
  return {
    title: values.title.trim(),
    runType: values.runType,
    meetingAt: formatMeetingAt(
      values.date,
      values.amPm,
      values.hour,
      values.minute
    ),
    locationName: values.locationName.trim(),
    address: values.address || values.locationName.trim(),
    detailedLocation: values.detailedLocation.trim(),
    latitude: values.latitude,
    longitude: values.longitude,
    distance: values.distance ?? undefined,
    pace: values.pace ?? undefined,
    maxParticipants: values.maxParticipants ?? undefined,
    description: values.description.trim() || undefined,
    supplies:
      values.supplies.filter((s) => s.trim()).length > 0
        ? values.supplies.map((s) => s.trim()).filter(Boolean)
        : undefined,
  };
};

export const buildCreateSchedulePayload = (
  values: ScheduleFormValues
): CreateScheduleRequest => buildSchedulePayload(values);

export const buildUpdateSchedulePayload = (
  values: ScheduleFormValues
): UpdateScheduleRequest => buildSchedulePayload(values);

export const isScheduleFormValid = (values: ScheduleFormValues): boolean => {
  return scheduleFormSchema.safeParse(values).success;
};

const parseMeetingAt = (meetingAt: string) => {
  const d = new Date(meetingAt);
  const hour24 = d.getHours();
  const minute = d.getMinutes();

  const amPm: 'AM' | 'PM' = hour24 < 12 ? 'AM' : 'PM';
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');

  return {
    date: `${yyyy}-${mm}-${dd}`,
    amPm,
    hour: hour12,
    minute,
  };
};

export const initializeScheduleFormValues = (
  detail?: CrewScheduleDetailResponse
): ScheduleFormValues => {
  if (!detail) return { ...defaultScheduleFormValues };

  const { date, amPm, hour, minute } = parseMeetingAt(detail.meetingAt);

  return {
    runType: detail.runType,
    title: detail.title,
    date,
    amPm,
    hour,
    minute,
    locationName: detail.locationInfo.placeName,
    address: detail.locationInfo.address,
    detailedLocation: detail.locationInfo.meetingSpot,
    latitude: detail.locationInfo.latitude,
    longitude: detail.locationInfo.longitude,
    distance: detail.distance ?? null,
    pace: detail.pace ?? null,
    maxParticipants: detail.maxParticipants ?? null,
    description: detail.description ?? '',
    supplies: detail.supplies?.length ? detail.supplies : [''],
  };
};
