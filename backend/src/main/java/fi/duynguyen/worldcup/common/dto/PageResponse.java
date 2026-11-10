package fi.duynguyen.worldcup.common.dto;

import java.util.List;

public record PageResponse<T>(
    List<T> data,
    int page,
    int size,
    long totalCounts,
    int totalPages) {
}
