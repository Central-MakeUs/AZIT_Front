import { Button } from '@azit/design-system/button';
import { Header } from '@azit/design-system/header';
import { Input } from '@azit/design-system/input';
import { AppScreen } from '@stackflow/plugin-basic-ui';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useFlow } from '@/app/routes/stackflow';

import * as styles from '@/pages/schedule/styles/ScheduleLocationPage.css';

import { MeetingSpotPicker } from '@/widgets/schedule/ui/MeetingSpotPicker';

import { LocationSearchResultItem } from '@/features/schedule/ui/LocationSearchResultItem';

import { useDebounce } from '@/shared/lib/useDebounce';
import { locationQueries } from '@/shared/queries/location';
import { useScheduleLocationSelectionStore } from '@/shared/store/scheduleLocationSelection';
import { BottomSheet } from '@/shared/ui/bottom-sheet';
import { BackButton } from '@/shared/ui/button';
import { AppLayout } from '@/shared/ui/layout';
import type { LatLng } from '@/shared/ui/naver-map/NaverMap';
import { Show } from '@/shared/ui/show';

import type { LocationSearchResponse } from '@/entities/location/model/location.model';

type ViewState = 'search' | 'map';

export function ScheduleLocationPage() {
  const { pop } = useFlow();
  const setSelectedScheduleLocation = useScheduleLocationSelectionStore(
    (state) => state.setSelectedLocation
  );
  const [view, setView] = useState<ViewState>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] =
    useState<LocationSearchResponse | null>(null);
  const [adjustedCoords, setAdjustedCoords] = useState<LatLng | null>(null);
  const [isLocationNameSheetOpen, setIsLocationNameSheetOpen] = useState(false);
  const [locationName, setLocationName] = useState('');

  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data } = useQuery(locationQueries.searchQuery(debouncedQuery));

  const handleSelectLocation = (location: LocationSearchResponse) => {
    setSelectedLocation(location);
    setSearchQuery(location.placeName ?? '');
    setView('map');
  };

  const handleOpenLocationNameSheet = () => {
    setIsLocationNameSheetOpen(true);
  };

  const handleRegisterLocation = () => {
    if (!selectedLocation) return;
    setSelectedScheduleLocation({
      address: selectedLocation.address ?? '',
      locationName: selectedLocation.placeName ?? '',
      detailedLocation: locationName,
      latitude: adjustedCoords?.lat ?? selectedLocation.latitude ?? 0,
      longitude: adjustedCoords?.lng ?? selectedLocation.longitude ?? 0,
    });
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
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="장소, 주소 검색"
              readOnly={view === 'map'}
            />
          </div>
          <Show when={view === 'search'}>
            <div className={styles.searchResultList}>
              {(data ?? []).map((result, index) => (
                <LocationSearchResultItem
                  key={`${result.placeName}-${index}`}
                  name={result.placeName ?? ''}
                  keyword={searchQuery}
                  address={result.address ?? ''}
                  onClick={() => handleSelectLocation(result)}
                />
              ))}
            </div>
          </Show>
          <Show when={view === 'map'}>
            <MeetingSpotPicker
              coords={{
                lat: selectedLocation?.latitude ?? 37.52964580905185,
                lng: selectedLocation?.longitude ?? 126.93366366931356,
              }}
              onOpenLocationNameSheet={handleOpenLocationNameSheet}
              onCoordsChange={setAdjustedCoords}
            />
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
