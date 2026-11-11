package fi.duynguyen.worldcup.tournament.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fi.duynguyen.worldcup.common.exception.NotFoundException;
import fi.duynguyen.worldcup.tournament.entity.Tournament;
import fi.duynguyen.worldcup.tournament.entity.TournamentTeam;
import fi.duynguyen.worldcup.tournament.repository.TournamentRepository;
import fi.duynguyen.worldcup.tournament.repository.TournamentTeamRepository;

@Service
public class TournamentService {

  private final TournamentRepository tournamentRepository;
  private final TournamentTeamRepository tournamentTeamRepository;

  public TournamentService(TournamentRepository tournamentRepository,
      TournamentTeamRepository tournamentTeamRepository) {
    this.tournamentRepository = tournamentRepository;
    this.tournamentTeamRepository = tournamentTeamRepository;
  }

  private void validateTournamentExists(Long tournamentId) {
    if (!tournamentRepository.existsById(tournamentId)) {
      throw new NotFoundException("Tournament not found with id: " + tournamentId);
    }
  }

  public Page<Tournament> getAllTournaments(Pageable pageable) {
    return tournamentRepository.findAll(pageable);
  }

  public Tournament getTournamentById(Long id) {
    return tournamentRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Tournament not found with id: " + id));
  }

  public long getTeamCountByTournamentId(Long tournamentId) {
    validateTournamentExists(tournamentId);
    return tournamentTeamRepository.countByTournamentId(tournamentId);
  }

  @Transactional(readOnly = true)
  public Page<TournamentTeam> getTournamentTeamsByTournamentId(Long tournamentId, Pageable pageable) {
    validateTournamentExists(tournamentId);
    return tournamentTeamRepository.findByTournamentId(tournamentId, pageable);
  }

  public Tournament getByYear(Integer year) {
    return tournamentRepository.findByYear(year)
        .orElseThrow(() -> new NotFoundException("Tournament not found for year: " + year));
  }

}
