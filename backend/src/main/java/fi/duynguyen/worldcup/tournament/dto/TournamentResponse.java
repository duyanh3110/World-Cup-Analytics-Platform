package fi.duynguyen.worldcup.tournament.dto;

import java.time.LocalDate;

public record TournamentResponse(
    Long id,
    String tournamentName,
    Integer year,
    String hostCountry,
    LocalDate startDate,
    LocalDate endDate) {
}
