import { screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, vi } from 'vitest';

import { server } from '@/shared/mock/server';
import { renderWithProviders } from '@/shared/test/renderWithProviders';

import { ScheduleDetailContent } from './ScheduleDetailContent';

describe('ScheduleDetailContent', () => {
  it('SCHEDULE_NOT_FOUND 에러 시 "일정을 찾을 수 없어요" 메시지를 렌더링한다', async () => {
    server.use(
      http.get('*/crews/:crewId/schedules/:scheduleId', () =>
        HttpResponse.json(
          { code: 'SCHEDULE_NOT_FOUND', message: '일정을 찾을 수 없어요' },
          { status: 404 }
        )
      )
    );

    renderWithProviders(
      <ScheduleDetailContent
        scheduleId={1}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSeeMoreParticipants={vi.fn()}
      />
    );

    await screen.findByText('일정을 찾을 수 없어요');
  });

  it('FORBIDDEN_ERROR 에러 시 "접근 권한이 없어요" 메시지를 렌더링한다', async () => {
    server.use(
      http.get('*/crews/:crewId/schedules/:scheduleId', () =>
        HttpResponse.json(
          { code: 'FORBIDDEN_ERROR', message: '접근 권한이 없어요' },
          { status: 403 }
        )
      )
    );

    renderWithProviders(
      <ScheduleDetailContent
        scheduleId={1}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSeeMoreParticipants={vi.fn()}
      />
    );

    await screen.findByText('접근 권한이 없어요');
  });

  it('알 수 없는 에러 코드 시 기본 메시지 "페이지를 찾을 수 없어요"를 렌더링한다', async () => {
    server.use(
      http.get('*/crews/:crewId/schedules/:scheduleId', () =>
        HttpResponse.json(
          { code: 'UNKNOWN_ERROR', message: '알 수 없는 오류' },
          { status: 400 }
        )
      )
    );

    renderWithProviders(
      <ScheduleDetailContent
        scheduleId={1}
        onBack={vi.fn()}
        onEdit={vi.fn()}
        onSeeMoreParticipants={vi.fn()}
      />
    );

    await screen.findByText('페이지를 찾을 수 없어요');
  });
});
