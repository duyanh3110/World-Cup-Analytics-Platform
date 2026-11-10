package fi.duynguyen.worldcup.tournament.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import fi.duynguyen.worldcup.common.exception.NotFoundException;
import fi.duynguyen.worldcup.tournament.entity.Tournament;
import fi.duynguyen.worldcup.tournament.repository.TournamentRepository;

@Service
public class TournamentService {

  private final TournamentRepository tournamentRepository;

  public TournamentService(TournamentRepository tournamentRepository) {
    this.tournamentRepository = tournamentRepository;
  }

  public Page<Tournament> getAllTournaments(Pageable pageable) {
    return tournamentRepository.findAll(pageable);
  }

  public Tournament getByYear(Integer year) {
    return tournamentRepository.findByYear(year)
        .orElseThrow(() -> new NotFoundException("Tournament not found for year: " + year));
  }

}
