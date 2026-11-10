package fi.duynguyen.worldcup.tournament.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import fi.duynguyen.worldcup.tournament.entity.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {
  Optional<Tournament> findByYear(Integer year);

  boolean existsByYear(Integer year);
}
