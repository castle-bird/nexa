package com.nexacro.service;

import java.util.List;
import java.util.Map;

import com.nexacro.dto.BoardRequest;
import com.nexacro.dto.BoardResponse;
import com.nexacro.entity.BoardEntity;

public interface BoardService {
	// 조회
	List<BoardResponse> selectList(BoardEntity entity);
	
	// 추가,수정,삭제
	Map<String, String> processByStatus(List<BoardRequest> requests);
}
