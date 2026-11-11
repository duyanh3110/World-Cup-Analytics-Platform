package fi.duynguyen.worldcup.tournament.dto;

public record TournamentTeamResponse(
    Long id,
    Long tournamentId,
    Long teamId,
    String teamName,
    String fifaCode,
    String confederation,
    String groupLetter,
    Integer fifaRankingPreTournament) {
}
