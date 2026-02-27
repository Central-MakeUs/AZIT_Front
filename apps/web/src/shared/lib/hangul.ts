const COMPLETE_HANGUL_START_CHARCODE = 0xac00;
const COMPLETE_HANGUL_END_CHARCODE = 0xd7a3;
const NUMBER_OF_JONGSEONG = 28;

export function hasFinalConsonant(str: string): boolean {
  if (!str) return false;

  const lastChar = [...str].at(-1)!;
  const charCode = lastChar.charCodeAt(0);

  const isCompleteHangul =
    COMPLETE_HANGUL_START_CHARCODE <= charCode &&
    charCode <= COMPLETE_HANGUL_END_CHARCODE;

  if (!isCompleteHangul) {
    return false;
  }

  const hangulCode = charCode - COMPLETE_HANGUL_START_CHARCODE;
  const jongseongIndex = hangulCode % NUMBER_OF_JONGSEONG;

  return jongseongIndex !== 0;
}
