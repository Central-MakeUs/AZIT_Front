import { ChevronDownIcon, ChevronUpIcon } from '@azit/design-system/icon';
import { useState } from 'react';

import * as styles from '@/widgets/order-policy/styles/OrderPolicyDropdown.css';

export default function OrderPolicyDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.refundPolicyDropdown}>
      <button
        type="button"
        className={styles.refundPolicyDropdownTrigger}
        onClick={handleClick}
        aria-expanded={isOpen}
      >
        <span className={styles.refundPolicyDropdownLabel}>
          환불 및 교환 정책
        </span>
        {isOpen ? (
          <ChevronUpIcon size={20} color="secondary" />
        ) : (
          <ChevronDownIcon size={20} color="secondary" />
        )}
      </button>
      {isOpen && (
        <div
          id="refund-policy-dropdown-content"
          className={styles.refundPolicyDropdownContent}
        >
          <h3>[환불 및 교환 정책]</h3>
          <ol>
            <li>
              환불 신청 방법
              <ul>
                <li>
                  AZIT는 보다 빠르고 정확한 처리를 위해 카카오 비즈니스 채팅(1:1
                  문의)을 통해 환불 접수를 진행하고 있습니다.
                </li>
                <li>
                  마이페이지 또는 주문 상세의 ‘카카오톡 문의’ 버튼을 눌러
                  상담원에게 주문 번호와 환불 사유를 남겨주세요.
                </li>
              </ul>
            </li>

            <br />

            <li>
              무통장 입금 환불 안내
              <ul>
                <li>
                  무통장 입금 결제 건의 경우, 환불 접수 시 환불받으실 계좌번호,
                  은행명, 예금주 성함을 채팅창에 함께 남겨주셔야 합니다.
                </li>
                <li>
                  반품 상품 확인 후, 영업일 기준 2~3일 이내에 해당 계좌로 환불
                  금액이 입금됩니다.
                </li>
              </ul>
            </li>

            <br />

            <li>
              환불/교환 가능 기간
              <ul>
                <li>상품 수령 후 7일 이내에 신청해 주셔야 합니다.</li>
                <li>
                  단순 변심에 의한 환불의 경우 왕복 배송비는 고객 부담이며, 상품
                  불량 및 오배송의 경우 AZIT가 배송비를 부담합니다.
                </li>
              </ul>
            </li>

            <br />

            <li>
              환불/교환 불가 사유
              <ul>
                <li>
                  사용 흔적이 있거나 상품 가치(택 제거, 포장 훼손 등)가 현저히
                  감소한 경우.
                </li>
                <li>복제가 가능한 상품의 포장을 훼손한 경우.</li>
              </ul>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
