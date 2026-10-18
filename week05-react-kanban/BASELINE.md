# Week 05 Kanban baseline

- 측정일: 2026-10-17 (Asia/Seoul)
- 프로젝트: `C:\Users\james\OneDrive\바탕 화면\tave\react-seungryeol\week05-react-kanban`
- 원본: 같은 저장소의 `week04-react-kanban` (복사 전후 소스/설정 파일 SHA-256 변경 0개)
- `src`, `public`, `.gitignore`, README, HTML, package/lockfile, Vite/ESLint 설정을 복사했다. node_modules, dist, Vite 캐시는 복사하지 않았다. 현재 node_modules와 dist는 새 설치/빌드로 생성된 파일이며 Git에서 제외된다.
- package.json 및 package-lock.json의 루트 name을 `week05-react-kanban`으로 변경했다. 나머지 기존 소스/설정 파일은 원본과 바이트 단위로 동일하다. 브라우저 탭 제목은 원본 index.html의 week04 제목을 유지한다.
- `npm ci --no-audit --no-fund`: 성공 (147 packages). `npm run lint`: 성공. `npm run build`: 성공. 최종 일반 개발 서버 및 브라우저 표시 확인.
- 빌드: JS 261.89 kB (gzip 83.25 kB), CSS 1.78 kB (gzip 0.81 kB), 33 modules. 별도 bundle analyzer는 이번 단계에서 추가하지 않았다.

## 측정 방법과 한계

현재 접근 가능한 내장 브라우저에는 React DevTools 확장 Profiler UI를 조작할 수 있는 기능이 없어 DevTools 녹화를 사용하지 못했다. React `<Profiler>` API를 임시 Vite 변환으로 각 대상 컴포넌트의 반환 트리에 연결했다. 각 컴포넌트 함수의 실행 여부는 별도의 임시 useLayoutEffect 기록으로 교차 확인했다. Profiler 콜백은 자손 업데이트에도 발생하므로, 콜백만으로 부모 함수의 재렌더를 판정하지 않았다.

원래 StrictMode를 유지했다. 표의 횟수는 commit에 반영된 컴포넌트 실행을 나타내며 개발 모드의 함수 중복 호출을 두 번으로 세지 않는다. 같은 render의 StrictMode effect 재실행도 중복 제거했다. 카드 4개의 초기 데이터를 사용했고 각 동작을 1회 측정했다. 통계적으로 유의한 속도 비교 또는 실제 사용자 환경의 성능 결론은 아니다.

Profiler는 컴포넌트 반환 트리 안에 있으므로 아래 시간에는 해당 경계 자신의 함수 실행 시간이 포함되지 않는다. 중첩 Profiler 시간은 합산하지 않았다. 개발 모드/StrictMode/임시 측정 오버헤드가 있으며, 향후 성능 비교는 같은 측정 조건에서 반복해야 한다.

공식 API 의미: https://react.dev/reference/react/Profiler

## 관찰 결과

| 동작 | commit된 함수 실행 | 마운트/언마운트 및 해석 | Provider 하위 트리 actualDuration |
|---|---|---|---|
| React 공부하기: todo → doing | BoardProvider 1, Board 1, Column 3, Card 4 | 이동한 Card는 다른 Column으로 옮겨지면서 새로 mount. 변경되지 않은 다른 3개 Card도 render. BoardPage/Settings/Modal 실행 없음 | 1.10 ms |
| 이동한 카드 Modal 열기 | 해당 Card 1, Modal 1 | Modal mount. Provider/Board/Column/다른 Card/BoardPage/Settings 실행 없음 | 1.10 ms |
| Modal 닫기 | 해당 Card 1 | Modal unmount. Modal 함수 재실행 없음. 나머지 대상 함수 실행 없음 | 0.20 ms |
| 제목 입력 (fill 1회) | 해당 Card 1, Modal 1 | 다른 카드와 보드 전체로 전파되지 않음 | 1.10 ms |
| 제목을 React 공부하기 baseline으로 저장 | BoardProvider 1, Board 1, Column 3, Card 4 | Modal unmount. 변경되지 않은 다른 3개 Card도 render. BoardPage/Settings/Modal 함수 실행 없음 | 1.60 ms |
| 설정 페이지 이동 | Settings 1 | Settings mount, BoardPage/Board/Column/Card unmount. BoardProvider 함수 실행 없음 | 0.80 ms |
| 보드로 복귀 | BoardPage 1, Board 1, Column 3, Card 4 | 보드 페이지와 자손이 새로 mount. Settings unmount. BoardProvider 함수 실행 없음. 수정한 제목과 doing 상태 유지 | 2.20 ms |

각 행은 서로 다른 1개 commit이다. 제목 수정 전 Modal 재열기는 별도 준비 단계로 기록했다 (해당 Card 1, Modal mount 1, 0.70 ms). 초기 mount는 표에서 제외했다 (Provider 하위 트리 13.70 ms).

## 원인 해석과 아직 적용하지 않은 후보

1. 상태 이동/제목 저장이 핵심 최적화 후보다. BoardProvider의 cards 상태 변경 후 Board가 세 Column과 카드 목록을 다시 만든다. Card도 useBoard로 같은 Context를 직접 구독하므로 Context 값 변경의 영향을 받는다. 매 Provider render마다 Context value와 moveCard/editCard 함수 참조도 새로 생성된다. 이는 소스와 측정 결과를 함께 해석한 원인 추정이며 DevTools의 why-did-this-render 기록은 아니다.
2. Context의 상태/액션 의존성을 분리하거나 Card를 props 중심으로 바꾸는 방안을 먼저 검토할 수 있다. 그 후 안정적인 액션 참조(useCallback)와 변경되지 않은 Card의 memo를 측정해서 적용할 수 있다. 현재 직접 Context 구독을 유지한 채 Card에 memo만 씌우는 방식의 효과는 제한될 수 있다.
3. Board의 상태별 filter 결과에 useMemo를 검토할 수 있다. 다만 이번 카드 4개 측정으로 필터 계산이 병목임을 입증하지 않았으므로 자동 적용 대상은 아니다. Column의 children은 매 Board render마다 새로 만들어지므로 memo만 추가해서 해결된다고 단정할 수 없다.
4. Modal 열기/닫기와 입력은 이미 해당 Card에 국한된다. 이 동작으로 BoardProvider나 BoardPage까지 함수가 재실행된 증거는 없다. 부모 Profiler 콜백 발생을 부모 재렌더로 오해하지 않아야 한다.
5. 설정 왕복에서 보드 전체 mount는 라우트 교체에 따른 정상 동작이다. Provider는 유지되며 카드 상태도 보존된다. 이를 불필요한 전체 업데이트와 구별해야 한다.
6. BoardPage/Settings는 현재 정적 import이다. 추후 lazy + Suspense 라우트 분리 및 bundle analyzer 비교 후보이다. 현재 검색 기능이 없으므로 useTransition은 검색/필터 기능 설계 이후 검토할 항목이다. 확인한 컴포넌트 import는 파일 직접 경로이며 barrel import를 추가하지 않았다.

memo/useMemo/useCallback/lazy/Suspense/useTransition 또는 Context 구조 변경은 적용하지 않았다. 임시 baseline runtime과 Vite 측정 설정은 측정 후 프로젝트에서 회수했다. 원시 로그는 함께 제공한 `week05-baseline.jsonl`에 보존했다. 커밋/푸시는 수행하지 않았다.
