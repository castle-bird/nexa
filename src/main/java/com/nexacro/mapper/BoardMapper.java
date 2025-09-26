package com.nexacro.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.nexacro.dto.BoardRequest;
import com.nexacro.dto.BoardResponse;
import com.nexacro.entity.BoardEntity;

@Mapper
public interface BoardMapper {
    // 조회
    List<BoardEntity> selectList(BoardEntity entity);

    // 저장/수정/삭제
    int insertOne(BoardRequest req);
    int updateOne(BoardRequest req);
    int deleteList(@Param("ids") List<Long> ids);

    // (선택) 일괄
    // int insertList(@Param("list") List<BoardRequest> list);
    // int updateList(@Param("list") List<BoardRequest> list);

    // 매핑 유틸(이미 존재)
    default BoardResponse entityToResponse(BoardEntity entity) {
        return BoardResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .author(entity.getAuthor())
                .build();
    }

    default BoardEntity responseToEntity(BoardResponse response) {
        return BoardEntity.builder()
                .id(response.getId())
                .title(response.getTitle())
                .content(response.getContent())
                .author(response.getAuthor())
                .build();
    }
}
