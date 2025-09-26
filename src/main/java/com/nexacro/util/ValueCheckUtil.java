package com.nexacro.util;

public class ValueCheckUtil {
	private ValueCheckUtil() {
		// 인스턴스화 방지
	}

	// 넥사크로에서 edit 입력창에 아무것도 입력 안하고 넘기면 null 주는데 입력을
	// 한 번 이상 보낸 후, 다시 edit을 지우고 보내면 빈 문자열로 보내서 null로 변환하기 위함
	// 값이 null, 빈 문자열, 공백 문자열, 혹은 "입력 안 한 숫자"(0 같은 placeholder)라면 null로 변환 그렇지 않으면
	// 원래 값 반환
	@SuppressWarnings("unchecked")
	public static <T> T normalize(T value) {
		if (value == null) {
			return null;
		}

		// 문자열 처리
		if (value instanceof String str) {
			String trimmed = str.trim();
			return trimmed.isEmpty() ? null : (T) trimmed;
		}

		// 숫자 처리
		if (value instanceof Number num) {
			// 0을 "입력 안 함"으로 간주한다면 여기서 null 반환
			if (num.longValue() == 0L) {
				return null;
			}
			return value;
		}

		// Boolean 그대로 반환 (false를 null로 보고 싶으면 여기서 분기 추가)
		if (value instanceof Boolean) {
			return value;
		}

		// 날짜/시간은 null 여부만 판단
		if (value instanceof java.time.temporal.TemporalAccessor) {
			return value;
		}

		// 컬렉션, 맵은 비어 있으면 null
		if (value instanceof java.util.Collection<?> col) {
			return col.isEmpty() ? null : value;
		}

		if (value instanceof java.util.Map<?, ?> map) {
			return map.isEmpty() ? null : value;
		}

		// 기본적으로는 그대로 반환
		return value;
	}
}
