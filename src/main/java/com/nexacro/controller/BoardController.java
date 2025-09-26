package com.nexacro.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.nexacro.dto.BoardRequest;
import com.nexacro.dto.BoardResponse;
import com.nexacro.entity.BoardEntity;
import com.nexacro.service.BoardService;
import com.nexacro.uiadapter.spring.core.annotation.ParamDataSet;
import com.nexacro.uiadapter.spring.core.data.NexacroResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/board")
@Slf4j
public class BoardController {
	private final BoardService boardService;

	// 목록 조회
	@PostMapping("/list")
	public NexacroResult selectList(@ParamDataSet(name = "ds_request") BoardRequest request) {

		BoardEntity entity = BoardEntity.builder().title(request.getTitle()).content(request.getContent())
				.author(request.getAuthor()).build();

		List<BoardResponse> boardList = boardService.selectList(entity);

		NexacroResult result = new NexacroResult();

		result.addDataSet("ds_response", boardList);

		return result;
	}

	// 목록 저장 (수정, 추가, 삭제)
	// requset.setStatus = 1 > 수정 > updateList
	// requset.setStatus = 2 > 추가 > insertList
	// requset.setStatus = 3 > 삭제 > deleteList
	@PostMapping("/list/update")
	public NexacroResult updateList(@ParamDataSet(name = "ds_request") List<BoardRequest> requests) {
		
		log.info("requests ============================ {}" , requests);

		Map<String, String> summary = boardService.processByStatus(requests);

		NexacroResult result = new NexacroResult();
		result.addDataSet("ds_response", summary);
		
		log.info("requests ============================ {}" , summary.toString());
		return result;
	}
}
