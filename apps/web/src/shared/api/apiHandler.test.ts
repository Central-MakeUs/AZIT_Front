import ky from 'ky';
import { describe, it, expect, vi } from 'vitest';

import {
  apiHandler,
  BusinessError,
  ServerError,
} from '@/shared/api/apiHandler';

const client = ky.create({ prefixUrl: 'https://test.com' });

describe('apiHandler', () => {
  it('JSON body의 message/code로 BusinessError를 던진다 (4xx + code 있음)', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ message: 'Invalid token', code: 'INVALID_TOKEN' }),
          { status: 400 }
        )
      ) as any;

    await expect(apiHandler(client, 'test')).rejects.toThrow(BusinessError);
    await expect(apiHandler(client, 'test')).rejects.toMatchObject({
      message: 'Invalid token',
      code: 'INVALID_TOKEN',
      status: 400,
    });
  });

  it('JSON body에 code가 없으면 ServerError를 던진다', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({ message: '서버 오류' }), { status: 500 })
      ) as any;

    await expect(apiHandler(client, 'test')).rejects.toThrow(ServerError);
    await expect(apiHandler(client, 'test')).rejects.toMatchObject({
      message: '서버 오류',
      status: 500,
    });
  });

  it('JSON body에 message가 없으면 기본 메시지로 ServerError를 던진다', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify({}), { status: 500 })
      ) as any;

    await expect(apiHandler(client, 'test')).rejects.toMatchObject({
      message: '요청에 실패했습니다',
    });
  });

  it('body가 JSON이 아니면 원래 HTTPError를 던진다', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(
        new Response('plain text error', { status: 400 })
      ) as any;

    const { HTTPError } = await import('ky');
    await expect(apiHandler(client, 'test')).rejects.toThrow(HTTPError);
  });
});
