import type { GoogleClickIdUrlParams } from '../../types';
import { getGoogleClickId } from './getGoogleClickId';
import { storeGoogleClickId } from './storeGoogleClickId';

const STORAGE_KEY = 'google_click_id';

export const GoogleClickIdStorage = {
  getId: (): ReturnType<typeof getGoogleClickId> => getGoogleClickId(STORAGE_KEY),
  storeId: (urlParams: GoogleClickIdUrlParams): ReturnType<typeof storeGoogleClickId> =>
    storeGoogleClickId(STORAGE_KEY, urlParams),
};
