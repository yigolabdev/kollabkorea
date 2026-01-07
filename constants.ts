/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingCart, Share2, Atom, MonitorPlay, Network } from 'lucide-react';
import { StageData } from './types';

/**
 * KOLLAB KOREA 브랜드 입점 로드맵 데이터
 * Seoul × LA 콘셉트 기반 5단계 브랜드 여정
 */
export const ROADMAP_DATA: StageData[] = [
  {
    id: 1,
    title: "브랜드 액티베이션",
    subtitle: "Brand Activation",
    description: [
      "ZONE 별 오프라인 체험중심",
      "브랜드 제품 판매",
      "팝업 및 인플루언서 마케팅",
      "판매 데이터 공유"
    ],
    Icon: ShoppingCart,
    color: "from-kollab-red to-red-600",
    position: { top: 60 }
  },
  {
    id: 2,
    title: "콘텐츠 제작",
    subtitle: "Content Creation",
    description: [
      "브랜드 제품 콘텐츠",
      "릴스 중심 숏폼",
      "실사용 기반 스토리 발행"
    ],
    Icon: Share2,
    color: "from-zinc-700 to-kollab-dark",
    position: { top: 25 }
  },
  {
    id: 3,
    title: "인플루언서 마케팅",
    subtitle: "Influencer Marketing",
    description: [
      "인플루언서 마케팅",
      "브랜드 협업",
      "자발적 UGC 생성"
    ],
    Icon: Atom,
    color: "from-kollab-black to-zinc-900",
    position: { top: 5 }
  },
  {
    id: 4,
    title: "PR",
    subtitle: "Public Relations",
    description: [
      "오프라인 PR 자산확보",
      "미디어/리테일 연계 레퍼런스"
    ],
    Icon: MonitorPlay,
    color: "from-zinc-800 to-kollab-dark",
    position: { top: 25 }
  },
  {
    id: 5,
    title: "미국 수출 연결 기회",
    subtitle: "US Export Opportunity",
    description: [
      "미국 수출 연결 기회",
      "LA 팝업스토어 연계",
      "LA 리테일 샵 입점",
      "메이저 리테일 연결기회",
      "(Ulta, Sephora 등)"
    ],
    Icon: Network,
    color: "from-kollab-red to-red-700",
    position: { top: 60 }
  }
];

