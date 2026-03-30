import { memberHandlers } from './member';
import { scheduleHandlers } from './schedule';

export const handlers = [...memberHandlers, ...scheduleHandlers];
