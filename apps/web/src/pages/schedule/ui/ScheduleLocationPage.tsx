import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { Input } from '@azit/design-system/input';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/schedule/styles/ScheduleLocationPage.css';

import { LocationSearchResultItem } from '@/features/schedule/ui/LocationSearchResultItem';

import type { LocationSearchResult } from '@/shared/mock/schedule-location';
import { mockLocationSearchResults } from '@/shared/mock/schedule-location';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import { Show } from '@/shared/ui/show';

type ViewState = 'search' | 'map';

export function ScheduleLocationPage() {
  const { pop } = useFlow();
  const [view, setView] = useState<ViewState>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [, setSelectedLocation] = useState<LocationSearchResult | null>(null);
  const [isLocationNameSheetOpen, setIsLocationNameSheetOpen] = useState(false);
  const [locationName, setLocationName] = useState('');

  const handleSelectLocation = (location: LocationSearchResult) => {
    setSelectedLocation(location);
    setSearchQuery(location.name);
    setView('map');
  };

  const handleOpenLocationNameSheet = () => {
    setIsLocationNameSheetOpen(true);
  };

  const handleRegisterLocation = () => {
    pop();
  };

  return (
    <AppScreen>
      <AppLayout>
        <div className={styles.headerWrapper}>
          <Header
            left={
              <BackButton
                onClick={view === 'map' ? () => setView('search') : undefined}
              />
            }
            center="집합 장소"
          />
        </div>
        <div className={styles.mainContainer}>
          <div
            className={styles.searchWrapper}
            onClick={view === 'map' ? () => setView('search') : undefined}
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="장소를 검색해주세요"
              readOnly={view === 'map'}
            />
          </div>
          <Show when={view === 'search'}>
            <div className={styles.searchResultList}>
              {mockLocationSearchResults.map((result) => (
                <LocationSearchResultItem
                  key={result.id}
                  name={result.name}
                  keyword={searchQuery}
                  category={result.category}
                  address={result.address}
                  onClick={() => handleSelectLocation(result)}
                />
              ))}
            </div>
          </Show>

          <Show when={view === 'map'}>
            <div className={styles.mapContainer}>
              <p className={styles.mapDescription}>
                {`지도를 움직여\n집합 장소를 지정해주세요`}
              </p>
              <div className={styles.mapArea} />
              <div className={styles.footerWrapper}>
                <Button
                  size="large"
                  state="active"
                  onClick={handleOpenLocationNameSheet}
                >
                  장소명 입력하기
                </Button>
              </div>
            </div>
          </Show>
        </div>
      </AppLayout>

      <BottomSheet
        isOpen={isLocationNameSheetOpen}
        onOutsideClick={() => setIsLocationNameSheetOpen(false)}
        contentClassName={styles.locationNameSheetContent}
      >
        <p className={styles.locationNameSheetTitle}>
          선택한 곳의 장소명을 입력해주세요
        </p>
        <div className={styles.locationNameInputWrapper}>
          <Input
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="예) 여의나루역 러너스스테이션"
          />
        </div>
        <div className={styles.locationNameSheetFooter}>
          <Button
            size="large"
            state={locationName ? 'active' : 'disabled'}
            onClick={handleRegisterLocation}
          >
            집합 장소 등록하기
          </Button>
        </div>
      </BottomSheet>
    </AppScreen>
  );
}
