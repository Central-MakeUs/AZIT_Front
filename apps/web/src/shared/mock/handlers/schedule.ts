import { http, HttpResponse } from 'msw';

export const scheduleHandlers = [
  http.get('*/crews/:crewId/schedules/:scheduleId', () =>
    HttpResponse.json(
      { code: 'SCHEDULE_NOT_FOUND', message: '일정을 찾을 수 없어요' },
      { status: 404 }
    )
  ),
];
