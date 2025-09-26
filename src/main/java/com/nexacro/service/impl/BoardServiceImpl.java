package com.nexacro.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nexacro.dto.BoardRequest;
import com.nexacro.dto.BoardResponse;
import com.nexacro.entity.BoardEntity;
import com.nexacro.mapper.BoardMapper;
import com.nexacro.service.BoardService;
import com.nexacro.util.ValueCheckUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BoardServiceImpl implements BoardService {
	private final BoardMapper boardMapper;

	// 조회
	@Override
	public List<BoardResponse> selectList(BoardEntity entity) {
		// 넥사크로에서 빈문자열로 들어오는 것을 null로 변환
		entity.setTitle(ValueCheckUtil.normalize(entity.getTitle()));
		entity.setContent(ValueCheckUtil.normalize(entity.getContent()));
		entity.setAuthor(ValueCheckUtil.normalize(entity.getAuthor()));
		entity.setAuthor(ValueCheckUtil.normalize(entity.getAuthor()));

		List<BoardEntity> results = boardMapper.selectList(entity);

		return results.stream().map(boardMapper::entityToResponse).toList();

	}

	@Override
	@Transactional
	public Map<String, String> processByStatus(List<BoardRequest> requests) {
		Map<String, String> summary = new HashMap<>();

		if (requests == null || requests.isEmpty()) {
			return result("BAD", "처리할 데이터가 없습니다.", 0, 0, 0, 0, 0);
		}

		// 1) 전처리/정규화
		for (BoardRequest r : requests) {
			if (r == null)
				continue;
			r.setTitle(ValueCheckUtil.normalize(r.getTitle()));
			r.setContent(ValueCheckUtil.normalize(r.getContent()));
			r.setAuthor(ValueCheckUtil.normalize(r.getAuthor()));
		}

		// 2) 분류
		// request의 status로 한 번에 모두 목록을 받기때문에
		// 추가,수정,삭제를 분리한다.
		List<BoardRequest> toInsert = new ArrayList<>(); // 추가
		List<BoardRequest> toUpdate = new ArrayList<>(); // 수정
		List<Long> toDeleteIds = new ArrayList<>(); // 삭제
		int skipped = 0; // 스킵 -> 리퀘스트 오류

		for (BoardRequest r : requests) {

			// 데이터가 없거나, status가 아니면 패스
			if (r == null || r.getStatus() == null) {
				skipped++;
				continue;
			}
			// 1:수정, 2: 추가, 3: 삭제
			switch (r.getStatus()) {
			
				case 1 -> { // update: id 필수ㅋ
					if (r.getId() == null) {
						skipped++;
					} else {
						toUpdate.add(r);
					}
				}
	
				case 2 -> { // insert
					toInsert.add(r);
				}
	
				case 3 -> { // delete: id 필수
					if (r.getId() == null) {
						skipped++;
					} else {
						toDeleteIds.add(r.getId());
					}
				}
				default -> skipped++;
			}
		}

		// 3) 일괄 처리
		int inserted = 0, updated = 0, deleted = 0, failed = 0;

		try {
			
			// 수정
			for (BoardRequest r : toUpdate) {
				updated += boardMapper.updateOne(r); 
			}
			
			// 추가
			for (BoardRequest r : toInsert) {
				inserted += boardMapper.insertOne(r);
			}
			
			// 삭제
			if (!toDeleteIds.isEmpty()) {
				deleted += boardMapper.deleteList(toDeleteIds); 
			}


			return result("OK", "처리 완료", inserted, updated, deleted, skipped, failed);

		} catch (Exception e) {
			log.error("processByStatus error", e);
			failed++;
			return result("BAD", "처리 중 오류", inserted, updated, deleted, skipped, failed);
		}

	}

	private Map<String, String> result(String status, String message, int inserted, int updated, int deleted,
			int skipped, int failed) {
		Map<String, String> m = new HashMap<>();
		m.put("status", status);
		m.put("message", message);
		m.put("inserted", String.valueOf(inserted));
		m.put("updated", String.valueOf(updated));
		m.put("deleted", String.valueOf(deleted));
		m.put("skipped", String.valueOf(skipped));
		m.put("failed", String.valueOf(failed));
		return m;
	}

}
