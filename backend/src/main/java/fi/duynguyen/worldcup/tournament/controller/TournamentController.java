package fi.duynguyen.worldcup.tournament.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import fi.duynguyen.worldcup.tournament.dto.TournamentResponse;
import fi.duynguyen.worldcup.tournament.entity.Tournament;
import fi.duynguyen.worldcup.tournament.service.TournamentService;

@RestController
@RequestMapping("/api/tournaments")
public class TournamentController {

  private final TournamentService tournamentService;

  public TournamentController(TournamentService tournamentService) {
    this.tournamentService = tournamentService;
  }

  @GetMapping("/year/{year}")
  public TournamentResponse getTournamentByYear(@PathVariable Integer year) {
    Tournament tournament = tournamentService.getByYear(year);
    return toResponse(tournament);
  }

  private TournamentResponse toResponse(Tournament tournament) {
    return new TournamentResponse(
        tournament.getId(),
        tournament.getTournamentName(),
        tournament.getYear(),
        tournament.getHostCountry(),
        tournament.getStartDate(),
        tournament.getEndDate());
  }
}
