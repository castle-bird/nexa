package com.nexacro.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardResponse {
	private Long id;
	private String title;
	private String content;
	private String author;

	@Builder.Default
	private Integer status = 0;
}
