import { http, HttpResponse } from 'msw';

export const memberHandlers = [
  http.get('*/members/me', () =>
    HttpResponse.json({
      result: {
        id: 1,
        nickname: '테스트유저',
        status: 'ACTIVE',
        crewId: 1,
        crewName: '테스트크루',
        invitationCode: null,
      },
    })
  ),
];
