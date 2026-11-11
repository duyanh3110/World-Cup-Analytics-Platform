package fi.duynguyen.worldcup.tournament.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import fi.duynguyen.worldcup.tournament.entity.TournamentTeam;

public interface TournamentTeamRepository extends JpaRepository<TournamentTeam, Long> {

  long countByTournamentId(Long tournamentId);

  @EntityGraph(attributePaths = { "team" })
  Page<TournamentTeam> findByTournamentId(Long tournamentId, Pageable pageable);
}
