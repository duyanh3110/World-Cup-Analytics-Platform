package fi.duynguyen.worldcup.team.dto;

public record TeamResponse(
    Long id,
    String teamName,
    String fifaCode,
    String confederation) {
}
